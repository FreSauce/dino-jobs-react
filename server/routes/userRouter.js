const { Router } = require("express");
const {
  fetchUser,
  updateUser,
  applyJob,
  createJob,
  uploadUserPhoto,
  logout,
  deleteUser,
  getJobApplicants,
  managerProfile,
  getAllInvites,
  getJobs,
  getProfile,
  inviteApplicant
} = require("../controllers/userController");
const { getLogin, checkMan, checkAdmin } = require("../middleware");

const userRouter = Router();

userRouter.use(getLogin);

userRouter.get("/profile", fetchUser);

userRouter.post('/get-applicant-profile', checkMan, getProfile)

userRouter.post("/update-user", uploadUserPhoto, updateUser);

userRouter.post("/apply-job", applyJob);

userRouter.post("/create-job", checkMan, createJob);

userRouter.get("/:type/logout", logout);

userRouter.get("/admin/delete/:type/:user", checkAdmin, deleteUser);

userRouter.post("/getApplicants", checkMan, getJobApplicants);

userRouter.post('/invite-applicant', checkMan, inviteApplicant);

userRouter.get('/get-all-invites', getAllInvites);

userRouter.post("/manager/home", checkMan, managerProfile);

userRouter.get("/jobs", getJobs);

module.exports = userRouter;
