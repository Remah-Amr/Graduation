const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  let all = ["Thunderstorm", "Drizzle", "Rain", "Snow", "Clear", "Clouds"];
  let countOfRainStatus = 0;
  let countOfClearStatus = 0;
  let countOfCloudsStatus = 0;
  const daily = req.body.daily;
  let circumstance = [];
  for (let i = 0; i < daily.length; i++) {
    let weather = daily[i].weather[0].main;
    if (all.indexOf(weather) === -1) {
      countOfCloudsStatus++;
      circumstance.push("Clouds");
    } else if (["Thunderstorm", "Drizzle", "Snow"].indexOf(weather) !== -1) {
      countOfRainStatus++;
      circumstance.push("Rain");
    } else {
      circumstance.push(weather);
      weather === "Rain"
        ? countOfRainStatus++
        : weather === "Clouds"
        ? countOfCloudsStatus++
        : countOfClearStatus++;
    }
  }
  for (let i = 0; i < circumstance.length; i++) {}
  req.body.circumstance = circumstance;
  req.body.countOfClearStatus = countOfClearStatus;
  req.body.countOfRainStatus = countOfRainStatus;
  req.body.countOfCloudsStatus = countOfCloudsStatus;

  if (
    countOfClearStatus >= countOfRainStatus &&
    countOfClearStatus >= countOfCloudsStatus
  ) {
    req.body.status = "good";
  } else if (
    countOfCloudsStatus >= countOfClearStatus &&
    countOfCloudsStatus >= countOfRainStatus
  ) {
    req.body.status = "middle";
  } else {
    req.body.status = "danger";
  }

  let newWeather = await models.weather.findOne({
    timezone: req.body.timezone,
  });
  if (newWeather) {
    await newWeather.set(req.body).save();
  } else {
    newWeather = await new models.weather(req.body).save();
  }
  return APIResponse.Ok(res, newWeather);
});
