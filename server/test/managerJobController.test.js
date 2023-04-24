require("dotenv").config();
const { expect } = require("chai");
const mongoose = require("mongoose");

const { Job } = require("../models");
const controller = require("../controllers/userController");
const { getLogin } = require('../middleware')


const TEST_MANAGER = {
	email: "nithishbanda2021@gmail.com",
	password: "qwerty123",
};



const TEST_JOB = {
	role: "Software Developer",
	remote: true,
	description: "I am Testing hehe",
	company: "Googal",
	location: "Hyderabad",
	salary: 70000,
	type: "Internship",
	req_skills: ["C++", "Java"],
	req_experience: 2,
};

let token = "";

describe("Manager Job Controller", function () {
	before(function (done) {
		mongoose
			.connect(process.env.MONGO_URI)
			.then((result) => {
				console.info("Connected to database");
				done();
			})
	});

	beforeEach(function (done) {
		done();
	});

	it("should give a 200 on successful login", function (done) {
		const req = {
			body: TEST_MANAGER,
			params: {
				role: "manager"
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
			token = result.token;
			expect(result.status).to.be.equal(200);
			expect(result).to.have.property("token");
			expect(result).to.have.property("message", "Login Successful");
			expect(result.user.email).to.be.equal(TEST_MANAGER.email);
			done();
		}).catch((err) => {
			console.log(err)
		});
	});

})




describe("Job Controller", function () {
	before(function (done) {
		mongoose
			.connect(process.env.MONGO_URI)
			.then((result) => {
				console.info("Connected to database");
				done();
			})
	});

	beforeEach(function (done) {
		done();
	});

	let userId = ''

	it('should get profile of manager with status 200', function (done) {
		const req = {
			cookies: {
				login: null
			},
			headers: {
				authorization: `Bearer ${token}`
			}
		}


		getLogin(req, {}, () => { }).then(_ => {
			userId = req.user.key
			done();
		})
	})

	it("should get a 200 if new job is created", function (done) {
		const req = {
			body: TEST_JOB,
			user: {
				key: userId
			}
		};

		let result = {};
		const res = {
			status: function (status) {
				result['status'] = status;
				return this;
			},
			json: function ({ ...json }) {
				result = { ...result, ...json };
			}
		}
		const next = ({ ...resp }) => {
			result = resp
		}

		controller.createJob(req, res, next).then((_) => {
			console.log(result)
			expect(result).to.have.property("status", 200);
			expect(result).to.have.property("result", "Job Created");
			done();
		}).catch((err) => {
			done();
		});
	});



	after(function (done) {
		Job.findOneAndDelete({ description: TEST_JOB.description })
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