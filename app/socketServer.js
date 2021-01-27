const socketIO = require("socket.io");
const socketIOJwt = require("socketio-jwt");
const models = require("./models");
const _ = require("lodash");
const mdq = require("mongo-date-query");
const moment = require("moment");

module.exports = {
  up: function (server) {
    const io = socketIO(server);

    // follow
    const followNamespace = io.of("/follow");
    followNamespace.on(
      "connection",
      socketIOJwt.authorize({
        secret: process.env.JWT_SECRET,
      })
    );

    followNamespace.on("authenticated", async function (socket) {
      const { userId, userRole } = socket.decoded_token;
      // console.log(userId, userRole);
      // join room
      socket.join(`user ${userId}`);

      // on follow
      socket.on("follow", async function (data) {
        if (!data.coordinates) return;
        const { userId, userRole } = socket.decoded_token;
        const orders = await models.follow.find({
          sender: userId,
          createdAt: {
            $gte: moment().utc().subtract(5, "hour").toDate(),
          },
        });
        console.log("orders", orders);
        for (let i = 0; i < orders.length; i++) {
          // emit follow
          followNamespace.to(`user ${orders[i].receiver}`).emit("new follow", {
            coordinates: data.coordinates,
          });
        }
        const user = await models._user.findById(userId);
        await user
          .set({
            lastSeen: {
              coordinates: data.coordinates,
              time: new Date(new Date().toUTCString()),
            },
          })
          .save();
        followNamespace.to(`user ${userId}`).emit("new seen", {
          lastSeen: user.lastSeen,
        });
      });
    });

    return io;
  },
};

/*
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
        // save message to db
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
*/
