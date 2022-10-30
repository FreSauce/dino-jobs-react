// exports.initSockets = (io) => {
//   io.on("connection", (socket) => {
//     socket.on("join-room", (roomId, userId) => {
//       socket.join(roomId);
//       socket.to(roomId).broadcast.emit("user-connected", userId);
//       socket.on("message", (message) => {
//         io.to(roomId).emit("createMessage", message);
//       });
//     });
//   });
// };
