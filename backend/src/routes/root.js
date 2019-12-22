const express = require("express");
const router = express.Router();

//Status Service of API
router.get("/status", (_pReq, pRes) => {
  pRes.send({ data: "API Runnig " + process.env.npm_package_version });
});

module.exports = router;
