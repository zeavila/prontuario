const dbServer = require("../servers/dbServer");
const moment = require("moment");

/**
 * Read of Notes
 * @param {Object} pConditions
 * @returns {Promise} Result os query or error
 */
const read = (pConditions = null) => {
  return new Promise((pResolve, pReject) => {
    let xSQL = "SELECT * FROM note";
    if (pConditions != null && pConditions.patient_id) {
      xSQL += ` WHERE patient_id = ${pConditions.patient_id}`;
    }
    if (pConditions != null && pConditions.schedule_date) {
      xSQL += ` AND schedule_date = '${pConditions.schedule_date}'`;
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
 * Create of Note
 * @param {Object} pDataObject Data of Note {patient_id, date, notes}
 * @returns {Promise} Message of Sucess or Error
 */
const create = pDataObject => {
  return new Promise((pResolve, pReject) => {
    const xSQL =
      "INSERT INTO note (`patient_id`, `schedule_date`, `notes`) VALUES (?)";
    const xValue = [
      [pDataObject.patient_id, pDataObject.schedule_date, pDataObject.notes]
    ];
    return dbServer.getConnection().then(pCN => {
      //Execute insert query
      return pCN.query(xSQL, xValue, (pError, _pResult) => {
        pCN.end();
        if (pError) {
          return pReject(pError);
        } else {
          return pResolve({ message: "Successsfully Created Note" });
        }
      });
    });
  });
};

module.exports = { read, create };
