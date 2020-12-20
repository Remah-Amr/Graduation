module.exports = {
  _user: require("./users/_user.model"),
  admin: require("./users/admin.model"),
  driver: require("./users/driver.model"),
  owner: require("./users/owner.model"),
  employee: require("./users/employee.model"),
  client: require("./users/client.model"),
  _car: require("./cars/_car.model"),
  public: require("./cars/public.model"),
  travel: require("./cars/travel.model"),
  center: require("./centers.model"),
  journey: require("./journey.model"),
  transaction: require("./transaction.model"),
  notification: require('./notifications/_notification.model'),
  balanceTransfer: require('./balanceTransfer.model'),
  exchangeTransaction: require('./exchangeTransaction.model'),
  rate: require('./rate.model')
};
