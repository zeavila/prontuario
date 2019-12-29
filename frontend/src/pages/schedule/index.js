import React, { Component } from "react";
import SideMenu from "../sideMenu";
import Modal from "react-awesome-modal";
import moment from "moment";
import { MdEdit, MdDelete } from "react-icons/md";
import api from "../../services/api";
import "./styles.css";

export default class Schedule extends Component {
  state = {
    modalAction: "N", //N = New, E = Edit
    visible: false,
    delete_visible: false,
    schedules: [],
    schedule: {
      patient_id: null,
      schedule_date: moment().format("YYYY-MM-DD")
    },
    schedule_original: {
      patient_id: null,
      schedule_date: null
    },
    patients: []
  };

  async componentDidMount() {
    const xSchedules = await api.scheduleList();
    if (xSchedules.data) {
      this.setState({ schedules: xSchedules.data });
    }
    const xPatients = await api.patientList();
    if (xPatients.data) {
      this.setState({ patients: xPatients.data });
    }
  }

  openModal(pSchedule = null) {
    this.setState({
      visible: true
    });
    if (pSchedule) {
      this.setState({
        modalAction: "E",
        schedule: {
          patient_id: pSchedule.patient_id,
          schedule_date: moment(pSchedule.schedule_date).format("YYYY-MM-DD")
        },
        schedule_original: {
          patient_id: pSchedule.patient_id,
          schedule_date: moment(pSchedule.schedule_date).format("YYYY-MM-DD")
        }
      });
    } else {
      this.setState({
        modalAction: "N",
        schedule: {
          patient_id: 0,
          schedule_date: moment().format("YYYY-MM-DD")
        }
      });
    }
  }

  closeModal() {
    this.setState({
      visible: false,
      schedule: { patient_id: 0, schedule_date: moment().format("YYYY-MM-DD") }
    });
  }
  handleInputPatientChange = pEvent => {
    this.setState({
      schedule: {
        ...this.state.schedule,
        patient_id: pEvent.target.value
      }
    });
  };
  handleInputDateChange = pEvent => {
    this.setState({
      schedule: {
        ...this.state.schedule,
        schedule_date: pEvent.target.value
      }
    });
  };
  handleSubmit = pEvent => {
    pEvent.preventDefault();
    if (this.state.modalAction === "N") {
      api
        .scheduleCreate(this.state.schedule)
        .then(_rResult => {
          // console.log(_rResult);
          return api.scheduleList();
        })
        .then(rSchedules => {
          this.setState({ schedules: rSchedules.data });
          this.closeModal();
        })
        .catch(rErr => {
          alert(`Erro: ${rErr}`);
        });
    } else {
      api
        .scheduleUpdate(this.state.schedule, this.state.schedule_original)
        .then(_rResult => {
          // console.log(_rResult);
          return api.scheduleList();
        })
        .then(rSchedules => {
          this.setState({ schedules: rSchedules.data });
          this.closeModal();
        })
        .catch(rErr => {
          alert(`Erro: ${rErr}`);
        });
    }
  };

  // DELETE PATIENT
  openModalDelete(pSchedule) {
    this.setState({
      delete_visible: true,
      schedule: pSchedule
    });
  }
  closeModalDelete() {
    this.setState({
      delete_visible: false,
      schedule: { patient_id: 0, schedule_date: moment().format("YYYY-MM-DD") }
    });
  }
  handleDelete = () => {
    api
      .scheduleDelete({
        patient_id: this.state.schedule.patient_id,
        schedule_date: moment(this.state.schedule.schedule_date).format(
          "YYYY-MM-DD"
        )
      })
      .then(_rResult => {
        console.log(_rResult);
        return api.scheduleList();
      })
      .then(rSchedules => {
        this.setState({ schedules: rSchedules.data });
        this.closeModalDelete();
      })
      .catch(rErr => {
        alert(`Erro: ${rErr}`);
      });
  };

  render() {
    return (
      <div className="page-container">
        <SideMenu />
        <Modal
          visible={this.state.visible}
          width="400"
          height="200"
          effect="fadeInDown"
          onClickAway={() => this.closeModal()}
        >
          <div className="schedule-modal">
            <h1>
              {this.state.modalAction === "N"
                ? "Novo Agendamento"
                : "Detalhes do Agendamento"}
            </h1>
            <form onSubmit={this.handleSubmit}>
              <div className="inputs">
                <select
                  value={this.state.schedule.patient_id}
                  onChange={this.handleInputPatientChange}
                  required="required"
                  disabled={this.state.modalAction === "E"}
                >
                  <option value="0">Selecione um Paciente</option>
                  {this.state.patients &&
                    this.state.patients.map(patient => (
                      <option value={patient.patient_id}>{patient.name}</option>
                    ))}
                </select>
                <input
                  placeholder="Data"
                  value={this.state.schedule.schedule_date}
                  onChange={this.handleInputDateChange}
                  required="required"
                  type="date"
                />
              </div>
              <div className="buttons">
                <button type="submit">Salvar</button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => this.closeModal()}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </Modal>
        <Modal
          visible={this.state.delete_visible}
          width="400"
          height="150"
          effect="fadeInDown"
          onClickAway={() => this.closeModalDelete()}
        >
          <div className="delete-modal">
            <h1>Exclusão de Agendamento</h1>
            <div className="content">
              Tem certeza que deseja excluir o Agendamento?
            </div>
            <div className="buttons">
              <button type="button" onClick={() => this.handleDelete()}>
                Sim
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => this.closeModalDelete()}
              >
                Não
              </button>
            </div>
          </div>
        </Modal>
        <div className="page-content">
          <div className="content-header">
            <h1>Agendamentos</h1>
            <button type="button" onClick={() => this.openModal()}>
              Novo Agendamento
            </button>
          </div>
          <div className="content">
            <table>
              <tr>
                <th>Paciente</th>
                <th>Data</th>
                <th></th>
              </tr>
              {this.state.schedules &&
                this.state.schedules.map(schedule => (
                  <tr>
                    <td>{schedule.name}</td>
                    <td>
                      {moment(schedule.schedule_date).format("DD/MM/YYYY")}
                    </td>
                    <td className="coloumns-actions">
                      <button
                        type="button"
                        onClick={() => this.openModal(schedule)}
                      >
                        <MdEdit size={24} color="#000" />
                      </button>
                      <button
                        type="button"
                        onClick={() => this.openModalDelete(schedule)}
                      >
                        <MdDelete size={24} color="#000" />
                      </button>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
}
