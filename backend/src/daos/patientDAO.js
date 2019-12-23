const dbServer = require("../servers/dbServer");
const moment = require("moment");

/**
 * Read of Patients
 * @param {Object} pConditions
 * @returns {Promise} Result os query or error
 */
const read = (pConditions = null) => {
  return new Promise((pResolve, pReject) => {
    let xSQL = "SELECT * FROM patient";
    if (pConditions != null && pConditions.patient_id) {
      xSQL += ` WHERE patient_id = ${pConditions.patient_id}`;
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
 * Create of Patient
 * @param {Object} pDataObject Data of Patient {name, telephone, birth_date, gender, height, weight}
 * @returns {Promise} Message of Sucess or Error
 */
const create = pDataObject => {
  return new Promise((pResolve, pReject) => {
    const xSQL =
      "INSERT INTO patient (`name`, `telephone`, `birth_date`, `gender`, `height`, `weight`) VALUES (?)";
    const xValue = [
      [
        pDataObject.name,
        pDataObject.telephone,
        pDataObject.birth_date,
        pDataObject.gender,
        pDataObject.height,
        pDataObject.weight
      ]
    ];
    return dbServer.getConnection().then(pCN => {
      //Execute insert query
      return pCN.query(xSQL, xValue, (pError, pResult) => {
        pCN.end();
        if (pError) {
          return pReject(pError);
        } else {
          return pResolve({ message: "Successsfully Created Patient" });
        }
      });
    });
  });
};

/**
 * Update data of one patient
 * @param {Object} pDataObject Data of Patient
 * @param {Object} pConditions ID of Patient {patient_id}
 * @returns {Promise} Message of Sucess or Error
 */
const update = (pDataObject, pConditions) => {
  return new Promise((pResolve, pReject) => {
    //Read actual Patient
    return read(pConditions)
      .then(rPatient => {
        //if Patient not found
        if (!rPatient || !rPatient[0]) {
          return pReject({ message: "Patient not found" });
        }
        return Promise.all([dbServer.getConnection(), rPatient[0]]);
      })
      .then(([pCN, pPatient]) => {
        //Merge fields of patient
        const xMerged = {
          ...pPatient,
          ...pDataObject
        };
        const xBirthDate = moment(xMerged.birth_date).format("YYYY-MM-DD");
        let xSQL = "UPDATE patient ";
        xSQL += ` SET name = '${xMerged.name}', telephone = '${xMerged.telephone}', `;
        xSQL += ` birth_date = '${xBirthDate}', gender = '${xMerged.gender}', `;
        xSQL += ` height = ${xMerged.height}, weight = ${xMerged.weight}`;
        xSQL += ` WHERE patient_id = ${pConditions.patient_id}`;
        //Execute update query
        return pCN.query(xSQL, (pError, pResult) => {
          pCN.end();
          if (pError) {
            return pReject(pError);
          } else {
            return pResolve({
              message: "Successsfully Updated Patient"
            });
          }
        });
      });
  });
};

/**
 * Remove one Patient
 * @param {Object} pConditions ID of Patient {patient_id}
 * @returns {Promise}
 */
const remove = pConditions => {
  return new Promise((pResolve, pReject) => {
    //Read Patient
    return read(pConditions)
      .then(rPatient => {
        //if Patient not found
        if (!rPatient || !rPatient[0]) {
          return pReject({ message: "Patient not found" });
        }
        return dbServer.getConnection();
      })
      .then(pCN => {
        //Execute delete query
        const xSQL = "DELETE FROM patient WHERE patient_id = ?";
        return pCN.query(xSQL, pConditions.patient_id, (pError, pResult) => {
          pCN.end();
          if (pError) {
            return pReject(pError);
          } else {
            return pResolve({ message: "Patient removed." });
          }
        });
      });
  });
};

module.exports = { read, create, update, remove };
