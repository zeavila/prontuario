//Base of routes
const BASE_URL_V1 = "/api/v1";

/**
 * Routes for each entity in API
 */
module.exports = {
  BASE_URL: BASE_URL_V1,
  PATIENTS_URL: BASE_URL_V1 + "/patients",
  SCHEDULES_URL: BASE_URL_V1 + "/schedules",
  NOTES_URL: BASE_URL_V1 + "/notes"
};
