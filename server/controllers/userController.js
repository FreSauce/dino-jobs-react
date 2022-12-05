const { User, Job, Company, Invites } = require("../models");
const nodemailer = require("nodemailer");
const multer = require("multer");
const { uuid } = require("uuidv4");
const path = require("path");

const multerStorage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new Error("The file is not an image. Please upload a image", 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const resizeUserPhoto = async (req, res, next) => {
  try {
    if (!req.file) return next();
    req.file.filename = `${uuid()}.jpeg`;
    console.log(req.file);

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`./public/uploads/${req.file.filename}`);
    next();
  } catch (err) { }
};

const uploadUserPhoto = upload.single("avatar");

const mailServer = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function login(req, flag, res) {
  const { email, password, is_checked } = req.body;
  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: "User not found" });
      }
      return user.comparePassword(password);
    })
    .then((user) => {
      if (user && user.role === flag) {
        return User.findByIdAndUpdate(user._id, { logged_in: true }).then(res => {
          return { user, token: user.generateToken() };
        });
      } else res.status(401).send("User doesnt have permissions");
    })
    .catch((err) => {
      console.log(err);
      throw 'User credentials are incorrect';
    });
}

async function signup(user, res) {
  const new_user = new User(user);
  try {
    const svu = new_user.save();
    res.status(200).json({ result: "Mail Sent" });
    const token = new_user.generateToken();
    const html = "<h2>Please click the link below to verify your email</h2>" +
      '<a href="http://localhost:8080/auth/verify/' +
      token +
      '">Verify Here</a>';
    await sendEmail(user.email, html, 'Please confirm your Email account');
  } catch (err) {
    console.log(err);
    res.status(400).json({ result: Object.keys(err.errors).map(e => err.errors[e].message).pop() });
  }
}

async function manSignup(user, company, res) {
  const new_user = new User(user);
  const new_company = new Company(company);
  console.log(new_user);
  try {
    const svc = await new_company.save();
    new_user.company = svc._id;
    const svu = new_user.save();
    res.status(200).json({ result: "Mail Sent" });
    const token = new_user.generateToken();
    const html = "<h2>Please click the link below to verify your email</h2>" +
      '<a href="http://localhost:8080/auth/verify/' +
      token +
      '">Verify Here</a>';
    await sendEmail(user.email, html, 'Please confirm your Email account');
  } catch (err) {
    console.log(err);
    res.status(400).json({ result: Object.keys(err.errors).map(e => err.errors[e].message).pop() });
  }
}

async function fetchUser(req, res, next) {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    req.err = err;
    next({ message: err, status: 500 });
  }
}

async function updateUser(req, res, next) {
  req.body.avatar = req.file.filename;
  console.log(req.body);
  try {
    let doc = await User.findOneAndUpdate({ _id: req.user.key }, req.body, {
      new: false,
    });
    console.log(doc);
  } catch (err) {
    req.err = err;
    next();
  }
}

async function sendEmail(email, html, sub) {
  const mailOptions = {
    from: "rookievesper@gmail.com",
    to: email,
    subject: sub,
    html: html,
  };
  mailServer.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info)
    }
  });
}

async function verifyEmail(token) {
  console.log(token);
  return User.findByToken(token).then((user) => {
    if (!user) {
      throw new Error("User not found");
    }
    user.email_verified = true;
    return user
      .save()
      .then(async (user) => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  });
}

async function applyJob(req, res, next) {
  try {
    const { jobId, msg } = req.body;
    console.log(jobId, msg);
    const user = req.user;
    const job = await Job.findById(jobId).populate('company');
    const us = await User.updateOne({ _id: user.key.toString() }, { $push: { applied_jobs: job._id } });
    res.status(200).json({ result: "Job Applied" });
    let html = `<h1>${user.full_name} has applied for ${job.company.name}</h1><p>${msg}</p>`
    const cmpMan = await User.findOne({ company: job.company._id });
    sendEmail(cmpMan.email, html, `A New Application for ${job.role} position`)
  } catch (err) {
    next({ message: 'Internal Server Error', status: 500 });
  }
}

const createJob = async (req, res, next) => {
  const job = req.body;
  const user_id = req.user;
  try {
    job.remote = job.remote === "True" ? true : false;
    const user = await User.findOne({ _id: user_id.key }).populate("company");
    const new_job = new Job(job);
    if (user.company) {
      new_job.company = user.company;
      await new_job.save((err, docs) => {
        if (err) next("Internal Server Error");
        res.status(200).json({ result: "Job Created" });
      });
    } else {
      next("User doesnt have a company");
    }
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  console.log(req.user);
  try {
    const user = await User.findOne({ _id: req.user.key });
    user.removeToken(req.cookies.login);
    res.clearCookie("login").redirect("/");
  } catch (err) {
    req.err = err;
    next();
  }
};

const deleteUser = async (req, res, next) => {
  const { role, user } = req.params;
  try {
    if (role === "user") {
      await User.findOneAndDelete({ _id: user });
      res.status(200).redirect("/admin");
    } else if (role === "job") {
      await Job.findOneAndDelete({ _id: user });
      res.status(200).redirect("/admin");
    } else if (role === "company") {
      await Company.findOneAndDelete({ _id: user });
      res.status(200).redirect("/admin");
    } else {
      res.status(400).json({ result: "Unauthorized" });
    }
  } catch (err) { }
};

const getJobs = async (req, res, next) => {
  const user = req.user;
  try {
    if (user.role === 'manager') {
      const jobs = await Job.find({ company: user.company }).populate('company');
      res.status(200).json(jobs);
    } else {
      const jobs = await Job.find({}).populate('company');
      res.status(200).json(jobs);
    }
  } catch (err) {
    req.err = err;
    next();
  }
};
const getAllInvites = async (req, res, next) => {
  const user = req.user;
  console.log(user);
  try {
    const invites = await Invites.find({ user: user.key }).populate({ path: 'job', populate: { path: 'company' } });
    console.log(invites);
    res.status(200).json(invites);
  } catch (err) {
    console.log(err);
    next({ message: err, status: 500 });
  }
}

const getJobApplicants = async (req, res, next) => {
  const { jobId } = req.body;
  try {
    const users = await User.find({ "applied_jobs": jobId });
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    req.err = err;
    next();
  }
};

const inviteApplicant = async (req, res, next) => {
  const { userEmail, jobId } = req.body;
  const link = uuid()
  const user = await User.findOne({ email: userEmail });
  const inv = new Invites({ user: user._id, job: jobId, link });
  try {
    const ud = inv.save();
    console.log(ud);
    res.status(200).json({ message: 'hehe', link });
    // sendEmail()
  } catch (err) {
    next({ message: err, status: 500 })
  }
}

const getProfile = async (req, res, next) => {
  const { email } = req.body;
  try {
    const us = await User.findOne({ email });
    //console.log(us)
    res.status(200).json(us);
  } catch (err) {
    console.log(err)
  }

}

const managerProfile = async (req, res, next) => {
  try {
    if (req.body.website) {
      delete req.body.nam;
      delete req.body.avatar;
      delete req.body.phone;
      delete req.body.bio;
      req.body.logo = "";
    }
    const comp = new Company(req.body);
    const user = await User.updateOne({ _id: req.user.key }, { company: comp });
    comp.save((err, docs) => {
      if (err) console.log(err);
      console.log(docs);
    });
  } catch (err) {
    req.err = err;
    next();
  }
};
module.exports = {
  login,
  signup,
  verifyEmail,
  updateUser,
  fetchUser,
  applyJob,
  createJob,
  resizeUserPhoto,
  uploadUserPhoto,
  getAllInvites,
  logout,
  manSignup,
  deleteUser,
  getJobApplicants,
  managerProfile,
  getJobs,
  inviteApplicant,
  getProfile
};
