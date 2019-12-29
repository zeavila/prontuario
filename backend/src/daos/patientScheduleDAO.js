const dbServer = require("../servers/dbServer");
const moment = require("moment");

/**
 * Read of Patients Schedules
 * @param {Object} pConditions
 * @returns {Promise} Result os query or error
 */
const read = (pConditions = null) => {
  return new Promise((pResolve, pReject) => {
    let xSQL =
      "SELECT s.*, name " +
      "  FROM patient_schedule s LEFT JOIN patient p " +
      "     ON p.patient_id = s.patient_id";
    if (pConditions != null && pConditions.patient_id) {
      //For schedules of one patient
      xSQL += ` WHERE s.patient_id = ${pConditions.patient_id}`;
    }
    if (pConditions != null && pConditions.schedule_date) {
      xSQL += ` AND s.schedule_date = '${pConditions.schedule_date}'`;
    }
    return dbServer.getConnection().then(pCN => {
      //Execute select query
      return pCN.query(xSQL, (pError, pResult) => {
        pCN.end();
        if (pError) {
          return pReject(pError);
        } else {
          return pResolve(pResult);
        }
      });
    });
  });
};

/**
 * Create of Patient Schedule
 * @param {Object} pDataObject Data of Schedule {patient_id, schedule_date}
 * @returns {Promise} Message of Sucess or Error
 */
const create = pDataObject => {
  return new Promise((pResolve, pReject) => {
    const xSQL =
      "INSERT INTO patient_schedule (`patient_id`, `schedule_date`) VALUES (?)";
    const xValue = [[pDataObject.patient_id, pDataObject.schedule_date]];
    return dbServer.getConnection().then(pCN => {
      //Execute insert query
      return pCN.query(xSQL, xValue, (pError, pResult) => {
        pCN.end();
        if (pError) {
          return pReject(pError);
        } else {
          return pResolve({
            message: "Successsfully Created Schedule"
          });
        }
      });
    });
  });
};

/**
 * Update data of one schedule
 * @param {Object} pDataObject Data of Schedule
 * @param {Object} pConditions ID of Patient {patient_id, schedule_date}
 * @returns {Promise} Message of Sucess or Error
 */
const update = (pDataObject, pConditions) => {
  return new Promise((pResolve, pReject) => {
    //Read actual Schedule
    return read(pConditions)
      .then(rSchedule => {
        //if Patient not found
        if (!rSchedule || !rSchedule[0]) {
          return pReject({ message: "Schedule not found" });
        }
        return dbServer.getConnection();
      })
      .then(pCN => {
        const xScheduleDate = moment(pDataObject.schedule_date).format(
          "YYYY-MM-DD"
        );
        const xOriginalScheduleDate = moment(pConditions.schedule_date).format(
          "YYYY-MM-DD"
        );
        let xSQL =
          `UPDATE patient_schedule SET schedule_date = '${xScheduleDate}' ` +
          ` WHERE patient_id = ${pConditions.patient_id} AND schedule_date = '${xOriginalScheduleDate}'`;
        //Execute update query
        return pCN.query(xSQL, (pError, _pResult) => {
          pCN.end();
          if (pError) {
            return pReject(pError);
          } else {
            return pResolve({
              message: "Successsfully Updated Schedule"
            });
          }
        });
      });
  });
};

/**
 * Remove one Patient Schedule
 * @param {Object} pConditions ID of Patient and Date of Schedule {patient_id, schedule_date}
 * @returns {Promise}
 */
const remove = pConditions => {
  return new Promise((pResolve, pReject) => {
    //Read Schedule
    return read(pConditions)
      .then(rPatient => {
        //if Schedule not found
        if (!rPatient || !rPatient[0]) {
          return pReject({ message: "Schedule not found" });
        }
        return dbServer.getConnection();
      })
      .then(pCN => {
        const xScheduleDate = moment(pConditions.schedule_date).format(
          "YYYY-MM-DD"
        );
        //Execute delete query
        const xSQL =
          `DELETE FROM patient_schedule` +
          ` WHERE patient_id = ${pConditions.patient_id} AND schedule_date = '${xScheduleDate}'`;
        return pCN.query(xSQL, pConditions.patient_id, (pError, pResult) => {
          pCN.end();
          if (pError) {
            return pReject(pError);
          } else {
            return pResolve({ message: "Schedule removed." });
          }
        });
      });
  });
};

module.exports = { read, create, update, remove };
