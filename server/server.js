require("dotenv").config({ path: './config.env' });


const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const server = require("http").Server(app);
// const io = require("socket.io")(server);
// const { ExpressPeerServer } = require("peer");
// const peerServer = ExpressPeerServer(server, { debug: true });
// const authRouter = require('./routes/authRouter')
// const userRouter = require("./routes/userRouter");
// const interviewRouter = require("./routes/interviewRouter");
// const { initSockets } = require("./controllers/interviewHandler");

// initSockets(io);

// io.on('connection', () => {
// 	console.log("connected")
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie());
// app.use("/peerjs", peerServer);
const { errorHandler } = require("./middleware");

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(cors());

app.use('/auth', require('./routes/authRouter'))
app.use("/", require("./routes/userRouter"));
// app.use("/", interviewRouter);

app.all('*', errorHandler);

app.use((err, req, res, next) => {
	console.log(err);
	errorHandler(err, req, res, next);
});

app.listen(8080, () => console.log('listening to 8080'));