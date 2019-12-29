import axios from "axios";

const BaseAPI = axios.create({
  baseURL: "http://localhost:3001/api/v1"
});

const api = {
  /**
   * Status Service of API
   */
  status: () => {
    return new Promise((pResolve, pReject) => {
      return BaseAPI.get("status")
        .then(rResult => {
          return pResolve(rResult.data);
        })
        .catch(rErr => {
          return pReject(rErr);
        });
    });
  },

  //Patient
  /**
   * List of All Patients
   */
  patientList: () => {
    return new Promise((pResolve, pReject) => {
      return BaseAPI.get("patients")
        .then(rResult => {
          return pResolve(rResult.data);
        })
        .catch(rErr => {
          return pReject(rErr);
        });
    });
  },

  /**
   * Create one Patient
   */
  patientCreate: pDataObject => {
    return new Promise((pResolve, pReject) => {
      return BaseAPI.post("patients", pDataObject)
        .then(rResult => {
          return pResolve(rResult.data);
        })
        .catch(rErr => {
          return pReject(rErr);
        });
    });
  },

  /**
   * Read One Patient by ID
   */
  patientRead: pPatientId => {
    return new Promise((pResolve, pReject) => {
      return BaseAPI.get(`patients/${pPatientId}`)
        .then(rResult => {
          return pResolve(rResult.data);
        })
        .catch(rErr => {
          return pReject(rErr);
        });
    });
  },

  /**
   * Update one Patient
   */
  patientUpdate: (pDataObject, pPatientId) => {
    return new Promise((pResolve, pReject) => {
      return BaseAPI.put(`patients/${pPatientId}`, pDataObject)
        .then(rResult => {
          return pResolve(rResult.data);
        })
        .catch(rErr => {
          return pReject(rErr);
        });
    });
  },

  /**
   * Delete one patient by ID
   */
  patientDelete: pPatientId => {
    return new Promise((pResolve, pReject) => {
      return BaseAPI.delete(`patients/${pPatientId}`)
        .then(rResult => {
          return pResolve(rResult.data);
        })
        .catch(rErr => {
          return pReject(rErr);
        });
    });
  },

  //Schedules
  /**
   * List of All Schedules of one patient
   */
  scheduleList: () => {
    return new Promise((pResolve, pReject) => {
      return BaseAPI.get(`schedules`)
        .then(rResult => {
          return pResolve(rResult.data);
        })
        .catch(rErr => {
          return pReject(rErr);
        });
    });
  },

  /**
   * List of All Schedules of one patient
   */
  scheduleListOfPatient: pPatientId => {
    return new Promise((pResolve, pReject) => {
      return BaseAPI.get(`schedules/${pPatientId}`)
        .then(rResult => {
          return pResolve(rResult.data);
        })
        .catch(rErr => {
          return pReject(rErr);
        });
    });
  },

  /**
   * Create one schedule
   */
  scheduleCreate: pDataObject => {
    return new Promise((pResolve, pReject) => {
      return BaseAPI.post("schedules", pDataObject)
        .then(rResult => {
          return pResolve(rResult.data);
        })
        .catch(rErr => {
          return pReject(rErr);
        });
    });
  },

  /**
   * Update one schedule
   */
  scheduleUpdate: (pDataObject, pConditions) => {
    return new Promise((pResolve, pReject) => {
      return BaseAPI.put(
        `schedules/${pConditions.patient_id}/${pConditions.schedule_date}`,
        pDataObject
      )
        .then(rResult => {
          return pResolve(rResult.data);
        })
        .catch(rErr => {
          return pReject(rErr);
        });
    });
  },

  /**
   * Delete one schedule
   */
  scheduleDelete: pConditions => {
    console.log(pConditions);
    return new Promise((pResolve, pReject) => {
      return BaseAPI.delete(
        `schedules/${pConditions.patient_id}/${pConditions.schedule_date}`
      )
        .then(rResult => {
          return pResolve(rResult.data);
        })
        .catch(rErr => {
          return pReject(rErr);
        });
    });
  },

  //Notes
  /**
   * List of All Notes of one patient
   */
  noteList: pPatientId => {
    return new Promise((pResolve, pReject) => {
      return BaseAPI.get(`notes/${pPatientId}`)
        .then(rResult => {
          return pResolve(rResult.data);
        })
        .catch(rErr => {
          return pReject(rErr);
        });
    });
  },

  /**
   * Create one Note
   */
  noteCreate: pDataObject => {
    return new Promise((pResolve, pReject) => {
      return BaseAPI.post("notes", pDataObject)
        .then(rResult => {
          return pResolve(rResult.data);
        })
        .catch(rErr => {
          return pReject(rErr);
        });
    });
  }
};

export default api;
