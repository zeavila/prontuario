const router = require("express").Router();
const dao = require("../daos/noteDAO");

/**
 * Read Note by Patient ID
 */
router.get("/:id/:date", (pReq, pRes) => {
  //Route Validation
  if (!pReq.params.id) {
    return pRes.status(400).send({
      data: {
        message: "ID of Note is required.",
        status: 400
      }
    });
  }
  if (!pReq.params.date) {
    return pRes.status(400).send({
      data: {
        message: "Date of Note is required.",
        status: 400
      }
    });
  }
  return dao
    .read({ patient_id: pReq.params.id, schedule_date: pReq.params.date })
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
 * Read Note by Patient ID
 */
router.get("/:id", (pReq, pRes) => {
  //Route Validation
  if (!pReq.params.id) {
    return pRes.status(400).send({
      data: {
        message: "ID of Note is required.",
        status: 400
      }
    });
  }
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
 * Create one Note
 */
router.post("/", (pReq, pRes) => {
  //Route Validation
  if (!pReq.body) {
    return pRes.status(400).send({
      data: {
        message: "Data of Note is required.",
        status: 400
      }
    });
  }
  if (!pReq.body.patient_id) {
    return pRes.status(400).send({
      data: {
        message: "ID of Patient is required.",
        status: 400
      }
    });
  }
  if (!pReq.body.schedule_date) {
    return pRes.status(400).send({
      data: {
        message: "Date of Schedule is required.",
        status: 400
      }
    });
  }
  if (!pReq.body.notes) {
    return pRes.status(400).send({
      data: {
        message: "Notes is required.",
        status: 400
      }
    });
  }
  return dao
    .create(pReq.body)
    .then(rResult => {
      return pRes.send({ data: rResult });
    })
    .catch(rErr => {
      return pRes.status(400).send({
        data: {
          message: rErr.message,
          status: 400
        }
      });
    });
});

module.exports = router;
