const express = require("express");
const policies = require("../policies");
const ctrls = require("../controllers");
const resources = require("./resources");
const passport = require("passport");
// require("../services/passport");

let apiRouter = express.Router();

// apiRouter.post("/friend/trustable", ctrls.FriendCtrl.addtrustable);
apiRouter.post("/verify-reset", ctrls.AuthCtrl.resetPasswordByPhone);
apiRouter.post("/forget", ctrls.AuthCtrl.sendForgetSMSPhone);
apiRouter.post("/signup-phone", ctrls.AuthCtrl.signupPhone);
apiRouter.post("/verify", ctrls.AuthCtrl.verifyAccountByPhoneCode);
apiRouter.post("/login-phone", ctrls.AuthCtrl.loginPhone);
apiRouter.post("/signup", ctrls.AuthCtrl.signupEmail);
apiRouter.post("/resend", ctrls.AuthCtrl.SendForgetCodeEmail);
apiRouter.post("/reset-password", ctrls.AuthCtrl.resetPasswordByEmail);
apiRouter.post(
  "/login-google",
  passport.authenticate("googleToken1", { session: false }),
  ctrls.AuthCtrl.loginGoogle
);
apiRouter.post("/login-facebook", ctrls.AuthCtrl.loginFacebook);

apiRouter.post("/test", ctrls.AuthCtrl.test);

apiRouter.post("/lazooz", ctrls.TestCtrl.createOne);
apiRouter.get("/lazooz", ctrls.TestCtrl.fetchAll);
apiRouter.get("/lazooz/:id", ctrls.TestCtrl.fetchOne);
apiRouter.put("/lazooz/:id", ctrls.TestCtrl.updateOne);
apiRouter.delete("/lazooz/:id", ctrls.TestCtrl.deleteOne);

apiRouter.post("/weather", ctrls.WeatherCtrl.add);
apiRouter.get("/weather", ctrls.WeatherCtrl.fetchAll);
// private
apiRouter.use(policies.isAuthenticated);

// populate all resources
for (let key of Object.keys(resources)) {
  let resource = resources[key];
  apiRouter.use(resource);
}

module.exports = apiRouter;
