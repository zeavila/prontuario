const router = require("express").Router();
const dao = require("../daos/patientScheduleDAO");

/**
 * List of All Schedules
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
 * Create one schedule
 */
router.post("/", (pReq, pRes) => {
  //Route Validation
  if (!pReq.body) {
    return pRes.status(400).send({
      data: {
        message: "Data of Schedule is required.",
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
 * Update one schedule
 * body = {patient_id, schedule_date}
 * :id = patient_id
 * :date = original schedule date
 */
router.put("/:id/:date", (pReq, pRes) => {
  //Route Validation
  if (!pReq.params.id) {
    return pRes.status(400).send({
      data: {
        message: "ID of Patient is required.",
        status: 400
      }
    });
  }
  if (!pReq.params.date) {
    return pRes.status(400).send({
      data: {
        message: "Schedule Date is required.",
        status: 400
      }
    });
  }
  return dao
    .update(pReq.body, {
      patient_id: pReq.params.id,
      schedule_date: pReq.params.date
    })
    .then(rResult => {
      return pRes.send({
        data: rResult
      });
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
 * Delete one schedule
 * :id = patient_id
 * :date = original schedule date
 */
router.delete("/:id/:date", (pReq, pRes) => {
  //Route Validation
  if (!pReq.params.id) {
    return pRes.status(400).send({
      data: {
        message: "ID of Patient is required.",
        status: 400
      }
    });
  }
  if (!pReq.params.date) {
    return pRes.status(400).send({
      data: {
        message: "Schedule Date is required.",
        status: 400
      }
    });
  }
  return dao
    .remove({ patient_id: pReq.params.id, schedule_date: pReq.params.date })
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
