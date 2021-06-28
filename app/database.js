const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

module.exports = {
  connect: (cb) => {
    return mongoose
      .connect(
        "mongodb+srv://Admin:Admin123456@indzone.qv991.mongodb.net/hellohello?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        }
      )
      .then(function () {
        cb();
      })
      .catch(function (err) {
        console.error(err.message.red);
        process.exit(1);
      });
  },
};
