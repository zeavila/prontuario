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
      patient: {
        patient_id: this.props.match.params.id,
        name: "",
        birth_date: null,
        gender: "M",
        telephone: ""
      }
    };
  }

  async componentDidMount() {
    const xResponse = await api.patientRead(this.state.patient.patient_id);
    if (xResponse.data && xResponse.data[0]) {
      xResponse.data[0].birth_date = moment(
        xResponse.data[0].birth_date
      ).format("YYYY-MM-DD");
      this.setState({ patient: xResponse.data[0] });
    }
  }

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
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
        console.log(_rResult);
        this.props.history.push("/");
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

  render() {
    return (
      <div className="page-container">
        <Modal
          visible={this.state.visible}
          width="400"
          height="300"
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
                  placeholder="(xx) xxxxx-xxxx"
                  value={this.state.patient.telephone}
                  onChange={this.handleInputTelephoneChange}
                  type="tel"
                />
              </div>
              <div className="buttons">
                <button type="submit">Salvar</button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => this.closeModal()}
                >
                  cancelar
                </button>
              </div>
            </form>
          </div>
        </Modal>
        <Modal
          visible={this.state.delete_visible}
          width="400"
          height="300"
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
          <div className="content"></div>
        </div>
      </div>
    );
  }
}
