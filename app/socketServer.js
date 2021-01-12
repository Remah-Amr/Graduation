const socketIO = require("socket.io");
const socketIOJwt = require("socketio-jwt");
const models = require("./models");
const _ = require("lodash");

module.exports = {
  up: function (server) {
    const io = socketIO(server);

    // Chat
    const chatNamespace = io.of("/chat");
    chatNamespace.on(
      "connection",
      socketIOJwt.authorize({
        secret: process.env.JWT_SECRET,
      })
    );

    chatNamespace.on("authenticated", async function (socket) {
      const { userId, userRole } = socket.decoded_token;
      // console.log(userId, userRole);
      // join room
      socket.join(`user ${userId}`);

      socket.on("private-connected", async function (data) {
        const { userId, userRole } = socket.decoded_token;
        console.log("HERE", userId, userRole);
      });

      // on message
      socket.on("message", async function (data) {
        if (!data.content && !data.attachment) return;
        const { userId, userRole } = socket.decoded_token;
        // console.log("From", userId);
        // console.log("To", data.to);

        // find prev conversation
        let conversation = await models.conversation.findOne({
          $or: [{ users: [userId, data.to] }, { users: [data.to, userId] }],
        });
        // if not create one
        if (!conversation) {
          conversation = await new models.conversation({
            users: [userId, data.to],
            meta: [
              { user: userId, countOfUnseenMessages: 0 },
              { user: data.to, countOfUnseenMessages: 0 },
            ],
          }).save();
        }
        // // save message to db
        const createdMessage = await new models.message({
          user: userId,
          content: data.content,
          attachment: data.attachment,
          conversation: conversation.id,
        }).save();

        conversation.lastMessage = createdMessage.id;
        conversation.meta.forEach((info) => {
          if (info.user === userId) info.countOfUnseenMessages = 0;
          else info.countOfUnseenMessages++;
        });
        await conversation.save();
        // emit message
        chatNamespace.to(`user ${data.to}`).emit("new message", {
          conversation,
          message: data,
        });
        chatNamespace.to(`user ${userId}`).emit("new message", {
          conversation,
          test: "from me",
          message: data,
        });
      });
    });

    return io;
  },
};

/*
// GROUP
const groupNameSpace = io.of("/group");
    groupNameSpace.on(
      "connection",
      socketIOJwt.authorize({
        secret: process.env.JWT_SECRET,
      })
    );

    groupNameSpace.on("authenticated", async function (socket) {
      const { userId, userRole } = socket.decoded_token;
      console.log("ROOM", userId, userRole);
      // join room
      socket.join(`Room`);

      // on message
      socket.on("message", async function (data) {
        if (!data.content && !data.attachment) return;
        const { userId, userRole } = socket.decoded_token;
        console.log("userId", userId);
        console.log("userRole", userRole);
        // emit message
        groupNameSpace.to(`Room`).emit("new message", {
          message: data,
        });
      });
    });
*/
