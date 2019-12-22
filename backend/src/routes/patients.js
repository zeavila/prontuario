const express = require("express");
const router = express.Router();
const dao = require("../daos/patientDAO");

/**
 * List of Patients
 */
router.get("/", (pReq, pRes) => {
  return dao
    .read()
    .then(rResult => {
      return pRes.send({ data: rResult });
    })
    .catch(rErr => {
      console.log(rErr);
      return pRes.status(400).send({
        data: {
          message: rErr.message,
          status: 400
        }
      });
    });
});

module.exports = router;
