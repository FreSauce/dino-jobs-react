require("dotenv").config();
const { expect } = require("chai");
const mongoose = require("mongoose");

const { User } = require("../models");
const controller = require("../controllers/userController");

const TEST_USER = {
	full_name: 'hehe',
	email: "test@test.com",
	password: "Password@1234",
};


describe("Auth Controller", function () {
	before(function (done) {
		mongoose
			.connect(process.env.MONGO_URI)
			.then((result) => {
				console.info("Connected to database");
				const user = new User(TEST_USER);
				return user.save();
			})
			.then((user) => {
				TEST_USER._id = user._id;
				console.info("Created test user");
				done();
			});
	});

	beforeEach(function (done) {
		done();
	});

	it("should throw a 401 error if user is not found", function (done) {
		const req = {
			body: {
				email: "test@gmail.com",
				password: "tester",
			},
			params: {
				role: 'user'
			}
		};

		let res;

		const next = ({ ...resp }) => {
			res = resp
		}

		controller.login(req, res, next).then((result) => {
			expect(res).to.have.property("status", 401);
			expect(res).to.have.property("message", "User not found");
			done();
		})
	});

	it("should throw a 401 error if password is incorrect", function (done) {
		const req = {
			body: {
				email: TEST_USER.email,
				password: "tester",
			},
			params: {
				role: 'user'
			}
		};

		let res;
		const next = ({ ...resp }) => {
			res = resp
		}

		controller.login(req, res, next).then((result) => {
			expect(res).to.have.property("status", 400);
			expect(res).to.have.property("message", "User credentials are incorrect");
			done();
		})
	});

	it("should return a valid user status for an existing user", function (done) {

		const req = {
			body: {
				email: TEST_USER.email,
				password: TEST_USER.password,
			},
			params: {
				role: 'user'
			}
		};

		let result = {};

		let res = {
			cookie: function (cook, val) {
				result[cook] = val;
				return this;
			},
			status: function (status) {
				result['status'] = status;
				return this;
			},
			json: function ({ ...json }) {
				result = { ...result, ...json };
			}
		}
		const next = ({ ...resp }) => {
			res = resp
		}

		controller.login(req, res, next).then((_) => {
			expect(result.status).to.be.equal(200);
			expect(result).to.have.property("token");
			expect(result).to.have.property("message", "Login Successful");
			expect(result.user.email).to.be.equal(TEST_USER.email);
			done();
		}).catch((err) => {
			console.log(err)
		});
	});

	after(function (done) {
		User.findOneAndDelete({ email: TEST_USER.email })
			.then(() => {
				return mongoose.disconnect();
			})
			.then(() => {
				done();
			});
	});

	afterEach(function (done) {
		done();
	});


});