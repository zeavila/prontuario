const mysql = require("mysql");
const dbConfig = require("../appConfig").get("mysql");

const getConnection = () => {
  return new Promise((pResolve, pReject) => {
    return pResolve(
      mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database
      })
    );
  });
};

const closeConnection = pCN => {
  pCN.commit();
};

module.exports = { getConnection, closeConnection };
