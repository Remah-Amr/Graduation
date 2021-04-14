const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {
  connect: cb => {

    return mongoose
      .connect(
        "mongodb://localhost:27017/exampleDb",
        // "mongodb+srv://Admin:Admin123456@ptos.77jsw.mongodb.net/PTOS?retryWrites=true&w=majority",
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
      )
      .then(function () {
        cb();
      })
      .catch(function (err) {
        console.error(err.message.red);
        process.exit(1);
      });
  }
};
