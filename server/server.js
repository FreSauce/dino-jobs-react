require("dotenv").config();
const redis = require('redis');

if (process.env.NODE_ENV !== 'production') {
  const client = redis.createClient(process.env.REDIS_URL);
  client.get('SERVER_PORT').then(port => process.env.PORT = port)
  client.get('MONGO_URI').then(uri => process.env.MONGO_URI = uri)
  client.get('JWT_SECRET').then(secret => process.env.JWT_SECRET = secret)
  client.get('EMAIL').then(email => process.env.EMAIL = email)
  client.get('EMAIL_PASSWORD').then(password => process.env.EMAIL_PASSWORD = password)
}
const { connect } = require('mongoose');
const cors = require("cors");
const morgan = require("morgan");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const { apiDoc } = require('./docs');
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
  },
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie());
// app.use("/peerjs", peerServer);
const { errorHandler } = require("./middleware");

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc))
app.use(express.static("public"));


app.use("/interview", require("./routes/interviewRouter"));
app.use("/auth", require("./routes/authRouter"));
app.use("/", require("./routes/userRouter"));

// app.all('*', errorHandler);

app.use((err, req, res, next) => {
  console.log(err);
  errorHandler(req, res, next, err);
});

const socketInfo = {};
io.on("connection", (socket) => {
  try {
    socket.on("join-room", ({ roomId, userId }) => {
      if (roomId != null && userId != null) {
        socketInfo[roomId] = socketInfo[roomId] || {};
        if (Object.keys(socketInfo[roomId]).length === 2) {
          if (socketInfo[roomId][userId] !== undefined) {
            socketInfo[roomId][userId].socketId = socket.id;
            socket.join(roomId);
            io.to(roomId).emit("user-connected", socketInfo[roomId]);
            io.to(roomId).emit("connect-peer", {
              userList: socketInfo[roomId],
            });
          }
          else {
            socket.emit("room-full");
          }
        }
        else {
          socket.join(roomId);
          socketInfo[roomId][userId] = {
            userId,
            socketId: socket.id,
          };
          io.to(roomId).emit("user-connected", socketInfo[roomId]);
          if (Object.keys(socketInfo[roomId]).length === 2) {
            io.to(roomId).emit("connect-peer", {
              userList: socketInfo[roomId],
            });
          }
        }
        console.log(socketInfo);
        socket.on("disconnect", () => {
          delete socketInfo[roomId][userId];
          io.to(roomId).emit("user-disconnected", userId);
          if (Object.keys(socketInfo[roomId]).length === 0) {
            delete socketInfo[roomId];
          }
          console.log(socketInfo);
        });
      }
    })

    socket.on("offer", (payload) => {
      console.log(payload, 'off');
      io.to(socketInfo[payload.roomId][payload.targetId].socketId).emit("offer", payload);
    });

    socket.on("answer", (payload) => {
      console.log(payload);
      io.to(socketInfo[payload.roomId][payload.targetId].socketId).emit("answer", payload);
    });
  } catch (err) {
    console.log(err);
  }
})

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected');
  server.listen(3002, () => console.log("listening to 3002"));
});