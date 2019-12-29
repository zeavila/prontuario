import React, { Component } from "react";
import SideMenu from "../sideMenu";
import Modal from "react-awesome-modal";
import moment from "moment";
import api from "../../services/api";
import "./styles.css";

export default class Patient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      delete_visible: false,
      note_visible: false,
      patient: {
        patient_id: this.props.match.params.id,
        name: "",
        birth_date: null,
        gender: "M",
        telephone: "",
        height: null,
        weight: null
      },
      notes: [],
      note: {
        patient_id: this.props.match.params.id,
        schedule_date: null,
        notes: ""
      }
    };
  }

  async componentDidMount() {
    this.setPatient();
    this.setNoteList();
    const xSchedules = await api.scheduleListOfPatient(
      this.state.patient.patient_id
    );
    if (xSchedules.data) {
      this.setState({ schedules: xSchedules.data });
      // console.log(this.state.schedules);
    }
  }

  setPatient = async () => {
    const xPatient = await api.patientRead(this.state.patient.patient_id);
    if (xPatient.data && xPatient.data[0]) {
      xPatient.data[0].birth_date = moment(xPatient.data[0].birth_date).format(
        "YYYY-MM-DD"
      );
      this.setState({
        patient: xPatient.data[0]
      });
      // console.log(this.state.patient);
    }
  };

  setNoteList = async () => {
    const xNotes = await api.noteList(this.state.patient.patient_id);
    if (xNotes.data) {
      this.setState({ notes: xNotes.data });
      // console.log(this.state.notes);
    }
  };

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
    this.setPatient();
  }

  handleSubmit = pEvent => {
    pEvent.preventDefault();
    api
      .patientUpdate(this.state.patient, this.state.patient.patient_id)
      .then(rResult => {
        // console.log(rResult);
        this.props.history.push(`/patients/${this.state.patient.patient_id}`);
        this.closeModal();
      })
      .catch(rErr => {
        alert(`Erro: ${rErr}`);
      });
  };

  handleInputNameChange = pEvent => {
    this.setState({
      patient: {
        ...this.state.patient,
        name: pEvent.target.value
      }
    });
  };
  handleInputBirthDateChange = pEvent => {
    this.setState({
      patient: {
        ...this.state.patient,
        birth_date: pEvent.target.value
      }
    });
  };
  handleInputGenderChange = pEvent => {
    this.setState({
      patient: {
        ...this.state.patient,
        gender: pEvent.target.value
      }
    });
  };
  handleInputTelephoneChange = pEvent => {
    this.setState({
      patient: {
        ...this.state.patient,
        telephone: pEvent.target.value
      }
    });
  };
  handleInputHeightChange = pEvent => {
    this.setState({
      patient: {
        ...this.state.patient,
        height: pEvent.target.value
      }
    });
  };
  handleInputWeightChange = pEvent => {
    this.setState({
      patient: {
        ...this.state.patient,
        weight: pEvent.target.value
      }
    });
  };

  // DELETE PATIENT
  openModalDelete() {
    this.setState({
      delete_visible: true
    });
  }
  closeModalDelete() {
    this.setState({
      delete_visible: false
    });
  }
  handleDelete = () => {
    api
      .patientDelete(this.state.patient.patient_id)
      .then(_rResult => {
        // console.log(_rResult);
        this.props.history.push("/");
      })
      .catch(rErr => {
        alert(`Erro: ${rErr}`);
      });
  };

  // INSERT/UPDATE NOTE
  openModalNote() {
    this.setState({
      note_visible: true
    });
  }
  closeModalNote() {
    this.setState({
      note_visible: false,
      note: {
        patient_id: this.props.match.params.id,
        schedule_date: null,
        notes: ""
      }
    });
  }
  handleNote = () => {
    // console.log(this.state.note);
    api
      .noteCreate(this.state.note)
      .then(_rResult => {
        // console.log(_rResult);
        this.setNoteList();
        this.closeModalNote();
      })
      .catch(rErr => {
        alert(`Erro: ${rErr}`);
      });
  };
  handleInputNotesChange = pEvent => {
    this.setState({
      note: {
        ...this.state.note,
        notes: pEvent.target.value
      }
    });
  };
  handleInputNoteScheduleChange = pEvent => {
    const xScheduleDate = pEvent.target.value;
    api
      .noteRead({
        patient_id: this.state.note.patient_id,
        schedule_date: xScheduleDate
      })
      .then(rNote => {
        // console.log(rNote);
        if (rNote && rNote.data[0]) {
          this.setState({
            modalAction: "E",
            note: rNote.data[0]
          });
        } else {
          this.setState({
            modalAction: "N",
            note: {
              patient_id: this.props.match.params.id,
              schedule_date: xScheduleDate,
              notes: ""
            }
          });
        }
      });
  };

  render() {
    return (
      <div className="page-container">
        <Modal
          visible={this.state.visible}
          width="400"
          height="365"
          effect="fadeInDown"
          onClickAway={() => this.closeModal()}
        >
          <div className="patient-modal">
            <h1>Edição de Paciente</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="inputs">
                <input
                  placeholder="Nome"
                  value={this.state.patient.name}
                  onChange={this.handleInputNameChange}
                  required="required"
                  type="text"
                />
                <input
                  placeholder="Data de Nascimento"
                  value={this.state.patient.birth_date}
                  onChange={this.handleInputBirthDateChange}
                  required="required"
                  type="date"
                />
                <select
                  value={this.state.patient.gender}
                  onChange={this.handleInputGenderChange}
                  required="required"
                >
                  <option value="F">Feminino</option>
                  <option value="M">Masculino</option>
                </select>
                <input
                  placeholder="Telefone: (xx) xxxxx-xxxx"
                  value={this.state.patient.telephone}
                  onChange={this.handleInputTelephoneChange}
                  type="tel"
                />
                <input
                  placeholder="Altura"
                  value={this.state.patient.height}
                  onChange={this.handleInputHeightChange}
                  type="number"
                  min="0"
                />
                <input
                  placeholder="Peso"
                  value={this.state.patient.weight}
                  onChange={this.handleInputWeightChange}
                  type="number"
                  min="0"
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
          height="140"
          effect="fadeInDown"
          onClickAway={() => this.closeModalDelete()}
        >
          <div className="delete-modal">
            <h1>Exclusão de Paciente</h1>
            <div className="content">
              Tem certeza que deseja excluir o paciente{" "}
              <b>{this.state.patient.name}</b>?
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
        <Modal
          visible={this.state.note_visible}
          width="400"
          height="310"
          effect="fadeInDown"
          onClickAway={() => this.closeModalNote()}
        >
          <div className="note-modal">
            <h1>Anotação do Atentimento</h1>
            <div className="inputs">
              <div className="note-schedule">
                <span>Data da Consulta</span>
                <select
                  onChange={this.handleInputNoteScheduleChange}
                  required="required"
                >
                  <option value="null">Selecione uma data</option>
                  {this.state.schedules &&
                    this.state.schedules.map(schedule => (
                      <option
                        value={moment(schedule.schedule_date).format(
                          "YYYY-MM-DD"
                        )}
                      >
                        {moment(schedule.schedule_date).format("DD/MM/YYYY")}
                      </option>
                    ))}
                </select>
              </div>
              <textarea
                placeholder="Anotações"
                value={this.state.note.notes}
                onChange={this.handleInputNotesChange}
                required="required"
                rows="10"
                disabled={this.state.modalAction === "E"}
              />
            </div>
            <div className="buttons">
              <button
                type="button"
                onClick={() => this.handleNote()}
                disabled={this.state.modalAction === "E"}
              >
                Salvar
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => this.closeModalNote()}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
        <SideMenu />
        <div className="page-content">
          <div className="content-header">
            <h1>Paciente: {this.state.patient.name}</h1>
            <button type="button" onClick={() => this.openModal()}>
              Editar Cadastro
            </button>
            <button
              className="cancel-button"
              type="button"
              onClick={() => this.openModalDelete()}
            >
              Excluir Cadastro
            </button>
          </div>
          <div className="content">
            <div className="patient-data">
              <div>
                <span>
                  Data de Nascimento:{" "}
                  {moment(this.state.patient.birth_date).format("DD/MM/YYYY")}
                </span>
                <span>
                  Sexo:{" "}
                  {this.state.patient.gender === "F" ? "Feminino" : "Masculino"}
                </span>
                <span>Telefone: {this.state.patient.telephone}</span>
              </div>
              <div>
                <span>Altura: {this.state.patient.height}</span>
                <span>Peso: {this.state.patient.weight}</span>
              </div>
            </div>
            <div className="patient-notes">
              <button type="button" onClick={() => this.openModalNote()}>
                Inserir Anotação
              </button>
              <table>
                <tr>
                  <th>Data da Consulta</th>
                  <th>Atendimento</th>
                </tr>
                {this.state.notes &&
                  this.state.notes.map(note => (
                    <tr>
                      <td>{moment(note.schedule_date).format("DD/MM/YYYY")}</td>
                      <td>{note.notes}</td>
                    </tr>
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
