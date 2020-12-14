module.exports = {
  _user: require("./users/_user.model"),
  admin: require("./users/admin.model"),
  driver: require("./users/driver.model"),
  owner: require("./users/owner.model"),
  employee: require("./users/employee.model"),
  car: require("./cars/car.model"),
  public: require("./cars/public.model"),
  travel: require("./cars/travel.model"),
  center: require("./ShippingCenters/centers.model"),
  journy: require("./Journy/journy.model"),
  transaction: require("./transactions/transaction.model"),
  notification: require('./notifications/_notification.model'),
};
