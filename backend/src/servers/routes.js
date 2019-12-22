const httpServer = require("./httpServer");
const ROUTES = require("../enums/ROUTES");

//Routes Files
const root = require("../routes/root");
const pattients = require("../routes/patients");
// const schedules = require("../routes/schedules");
// const notes = require("../routes/notes");

//Routes
httpServer.use(ROUTES.BASE_URL, root);
httpServer.use(ROUTES.PATIENTS_URL, pattients); //"/api/v1/patients"
// httpServer.use(ROUTES.SCHEDULES_URL, schedules);
// httpServer.use(ROUTES.NOTES_URL, notes);

//404 Request
httpServer.use("/", (pReq, pRes) => {
  console.log(`URI not found: ${pReq.url}`);
  return pRes.status(404).send({
    data: {
      message: "URI not found",
      status: 404
    }
  });
});
