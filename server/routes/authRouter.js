const { Router } = require('express')
const {
	login,
	signup,
	verifyEmail,
} = require("../controllers/userController");

const authRouter = Router();


authRouter.post("/:title/login", (req, res, next) => {
	login(req, req.params.title, res).then((token) => {
		if (token) {
			res
				.cookie("login", token)
				.status(200)
				.json({ message: "Login Successful" });
		} else {
			req.err = "Invalid Credentials";
			next();
		}
	}).catch(err => {
		// req.err = err;
		next({ message: err, status: 500 });
	})
});

authRouter.post("/:title/register", async (req, res, next) => {
	const { email, password, full_name } = req.body;
	await signup({ email, password, full_name, type: req.params.title, email_verified: false, applied_jobs: [] }, res);
});

authRouter.get("/verify/:token", (req, res, next) => {
	const token = req.params.token;
	if (verifyEmail(token)) {
		res.status(200).json({ message: 'Email Verified' });
	} else {
		res.send("No page exists");
	}
});




module.exports = authRouter;