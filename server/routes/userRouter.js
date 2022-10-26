const { Router } = require('express');
const {
	updateUser,
	applyJob,
	createJob,
	uploadUserPhoto,
	logout,
	deleteUser,
	getJobApplicants,
	managerProfile
} = require("../controllers/userController");
const { getLogin, checkMan, checkAdmin } = require("../middleware");


const userRouter = Router();

userRouter.use(getLogin)


userRouter.post("/update-user", uploadUserPhoto, updateUser);

userRouter.post('/apply-job', applyJob);

userRouter.post('/create-job', checkMan, createJob);

userRouter.get('/:type/logout', logout);

userRouter.get('/admin/delete/:type/:user', checkAdmin, deleteUser);

userRouter.post('/job/:job', checkMan, getJobApplicants);

userRouter.post('/manager/home', checkMan, managerProfile);


module.exports = userRouter;