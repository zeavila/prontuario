var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "prontmed",
  password: "Teste1234",
  database: "prontmed"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM patient", function(err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
});
