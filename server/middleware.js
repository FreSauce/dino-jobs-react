const { User } = require("./models");

const getLogin = async (req, res, next) => {
	// const cookie = req.cookies.login;
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies?.auth) {
		token = req.cookies?.auth;
	}
	console.log(token);
	if (!token) return next({ status: 401, message: 'Not Authorized' });
	const user = await User.findByToken(token)
	try {
		if (user) {
			if (user.email_verified) {
				if (user.logged_in) {
					req.user = user.toJSON();
					next();
				} else {
					res.clearCookie('login').status(401).json({ message: 'User not authorized' });
				}
			} else {
				next({ message: "Email not verified", status: 401 });
			}
		} else {
			next({ message: "User not found", status: 400 });
		}
	}
	catch (err) {
		console.log(err);
		if (err === 'Email not verified') {
			res.redirect('/');
		} else if (err.name === 'MongooseError') {
			next({ message: "Server Error", status: 500 });
		}
	};
};

const checkMan = (req, res, next) => {
	if (req.user.type === 'manager') {
		next();
	} else {
		next('Unauthorized Request');
	}
}


const loginFlag = (req, res, next) => {
	const cookie = req.cookies.login;
	if (cookie) {
		res.redirect("/home");
	} else {
		next();
	}
};

const checkAdmin = (req, res, next) => {
	if (req.user.type === 'admin') {
		next();
	} else {
		res.status(403).redirect('/admin/login');
	}
}

const errorHandler = (req, res, next, err) => {
	console.log(err);
	res.status(err.status).json({ message: err.message });
};

module.exports = { getLogin, loginFlag, errorHandler, checkMan, checkAdmin };
