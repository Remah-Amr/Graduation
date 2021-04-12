const $baseCtrl = require("../$baseCtrl");
const { APIResponse } = require("../../utils");
const axios = require("axios");
const parser = require("xml2json");
module.exports = $baseCtrl(async (req, res) => {
  console.log("remah");
});

/*
const $baseCtrl = require("../$baseCtrl");
const { APIResponse } = require("../../utils");
const axios = require("axios");
const parser = require("xml2json");
module.exports = $baseCtrl(async (req, res) => {
  const payload =
    '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"><soap12:Body><FahrenheitToCelsius xmlns="https://www.w3schools.com/xml/"><Fahrenheit>75</Fahrenheit></FahrenheitToCelsius></soap12:Body></soap12:Envelope>';
  try {
    const response = await axios.post(
      "https://www.w3schools.com/xml/tempconvert.asmx",
      payload,
      { headers: { "content-type": "text/xml" } }
    );
    // console.log(response.data);
    let result = parser.toJson(response.data);
    result = JSON.parse(result);
    return APIResponse.Ok(res, result);
  } catch (err) {
    console.log(err);
  }

  return APIResponse.Ok(res, "OK");
});

*/

/*
const $baseCtrl = require("../$baseCtrl");
const { APIResponse } = require("../../utils");
const axios = require("axios");
const parser = require("xml2json");
module.exports = $baseCtrl(async (req, res) => {
  const payload = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <addShipment xmlns="http://track.smsaexpress.com/secom/SMSAWebserviceIntl">
                <passKey>string</passKey>
                <refNo>string</refNo>
                <sentDate>string</sentDate>
                <idNo>string</idNo>
                <cName>string</cName>
                <cntry>string</cntry>
                <cCity>string</cCity>
                <cZip>string</cZip>
                <cPOBox>string</cPOBox>
                <cMobile>string</cMobile>
                <cTel1>string</cTel1>
                <cTel2>string</cTel2>
                <cAddr1>string</cAddr1>
                <cAddr2>string</cAddr2>
                <shipType>string</shipType>
                <PCs>int</PCs>
                <cEmail>string</cEmail>
                <carrValue>string</carrValue>
                <carrCurr>string</carrCurr>
                <codAmt>string</codAmt>
                <weight>string</weight>
                <custVal>string</custVal>
                <custCurr>string</custCurr>
                <insrAmt>string</insrAmt>
                <insrCurr>string</insrCurr>
                <itemDesc>string</itemDesc>
                <vatValue>string</vatValue>
                <harmCode>string</harmCode>
            </addShipment>
        </soap:Body>
    </soap:Envelope>`;
  try {
    const response = await axios.post(
      "http://track.smsaexpress.com/secom/SMSAWebserviceIntl/addShipment",
      payload,
      { headers: { "content-type": "text/xml" } }
    );
    // console.log(response.data);
    let result = parser.toJson(response.data);
    result = JSON.parse(result);
    return APIResponse.Ok(res, result);
  } catch (err) {
    // console.log(err.response.data);
    let result = parser.toJson(err.response.data);
    result = JSON.parse(result);
    return APIResponse.Ok(res, result);
  }

  return APIResponse.Ok(res, "OK");
});
*/
