module.exports = {
  _user: require("./users/_user.model"),
  admin: require("./users/admin.model"),
  deiver: require("./users/driver.model"),
  owner: require("./users/owner.model"),
  employee: require("./users/employee.model"),
  car: require("./cars/car.model"),
  public: require("./cars/public.model"),
  travel: require("./cars/travel.model"),
  notification: require('./notifications/_notification.model'),
};
