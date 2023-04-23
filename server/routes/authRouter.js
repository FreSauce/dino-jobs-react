const { Router } = require("express");
const { login, signup, verifyEmail, manSignup } = require("../controllers/userController");

const authRouter = Router();

authRouter.post("/:role/login", login);

authRouter.post("/:role/register", async (req, res, next) => {
  const { email, password, full_name, company_name, description, website, employees } = req.body;
  if (req.params.role === 'user') {
    await signup(
      {
        email,
        password,
        full_name,
        role: req.params.role,
        email_verified: false,
        applied_jobs: [],
      },
      res
    );
  } else {
    await manSignup(
      {
        email,
        password,
        full_name,
        role: req.params.role,
        email_verified: false,
        applied_jobs: [],
      },
      {
        name: company_name,
        description, website, employees
      },
      res
    )
  }
});

authRouter.get("/verify/:token", (req, res, next) => {
  const token = req.params.token;
  if (verifyEmail(token)) {
    res.status(200).json({ message: "Email Verified" });
  } else {
    res.send("No page exists");
  }
});

module.exports = authRouter;
