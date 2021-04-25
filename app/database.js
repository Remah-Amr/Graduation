const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {
  connect: cb => {

    return mongoose
      .connect(
        process.env.LOCALMONGO,
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
