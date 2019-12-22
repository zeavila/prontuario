const dbServer = require("../servers/dbServer");

//READ
const read = (pConditions = null) => {
  return new Promise((pResolve, pReject) => {
    const xSQL = "SELECT * FROM patient";
    return dbServer.getConnection().then(pCN => {
      return pCN.query(xSQL, (pError, pResult) => {
        if (pError) {
          return pReject(pError);
        } else {
          return pResolve(pResult);
        }
      });
    });
  });
};

//CREATE
// const create = pDataObject => {};

//UPDATE
// const update = (pDataObject, pConditions) => {};

//DELETE
// const delete = pConditions => {};

module.exports = { read };
