const express = require("express");
const router = express.Router();
const dao = require("../daos/patientDAO");

/**
 * Read One Patient by ID
 */
router.get("/:id", (pReq, pRes) => {
  return dao
    .read({ patient_id: pReq.params.id })
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

/**
 * List of All Patients
 */
router.get("/", (_pReq, pRes) => {
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

/**
 * Create one Patient
 */
router.post("/", (pReq, pRes) => {
  return dao
    .create(pReq.body)
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

/**
 * Update one Patient
 */
router.put("/:id", (pReq, pRes) => {
  return dao
    .update(pReq.body, { patient_id: pReq.params.id })
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

/**
 * Delete one patient by ID
 */
router.delete("/:id", (pReq, pRes) => {
  return dao
    .remove({ patient_id: pReq.params.id })
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
