const { model, Schema } = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const { sign, verify } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
	full_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: isEmail,
			message: `{VALUE} is not a valid email`,
		},
	},
	email_verified: {
		type: Boolean,
		default: false
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: "user",
		enum: ["user", "manager", "admin"],
	},
	company: {
		type: Schema.Types.ObjectId,
		ref: "Company",
		default: null,
	},
	phone: {
		type: String,
	},
	logged_in: {
		type: Boolean,
		default: false,
	},
	avatar: {
		type: String,
		default: null,
	},
	address: String,
	bio: String,
	skills: [String],
	applied_jobs: [{
		type: Schema.Types.ObjectId,
		ref: "Job",
		unique: true,
	}
	],
});

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	delete userObject.tokens;
	return userObject;
};

UserSchema.methods.comparePassword = function (password) {
	const user = this;
	return bcrypt.compare(password, user.password).then((isMatch) => {
		if (!isMatch) {
			return Promise.reject();
		}
		return user;
	});
};

UserSchema.methods.generateToken = function () {
	const user = this;
	const role = user.role;
	const token = sign(
		{ _id: user._id.toHexString(), role },
		process.env.JWT_SECRET,
		{ expiresIn: "1d" }
	).toString();
	return token;
};

UserSchema.statics.findByToken = async function (token) {
	let User = this;
	let decoded;
	try {
		decoded = verify(token, process.env.JWT_SECRET);
	} catch (e) {
		if (e.name === "TokenExpiredError") {
			throw e;
		}
		return Promise.reject();
	}
	return User.findOne({
		_id: decoded._id,
		role: decoded.role
	});
};


UserSchema.pre("save", function (next) {
	let user = this;
	if (user.isModified("password")) {
		bcrypt.genSalt(10).then((salt, err) => {
			if (err) throw err;
			bcrypt.hash(user.password, salt, (er, hash) => {
				if (er) throw er;
				user.password = hash;
				return next();
			});
		});
	} else return next();
});

module.exports = model("User", UserSchema);