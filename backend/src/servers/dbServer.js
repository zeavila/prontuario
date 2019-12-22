const mysql = require("mysql");
const dbConfig = require("../appConfig").get("mysql");

/**
 * Create a Connection with Database
 */
const getConnection = () => {
  return new Promise((pResolve, _pReject) => {
    return pResolve(
      mysql.createPool({
        connectionLimit: 10,
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database
      })
    );
  });
};

module.exports = { getConnection };
