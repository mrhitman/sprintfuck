import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaRegSun } from "react-icons/fa";

interface PomodoroSettingsState {
  show: boolean;
}
export class PomodoroSettings extends Component<{}, PomodoroSettingsState> {
  public state = {
    show: false
  };

  public render() {
    const { show } = this.state;
    return (
      <React.Fragment>
        <Button size="sm" variant="outline-light" onClick={this.handleShow}>
          <FaRegSun />
        </Button>
        <Modal show={show} onHide={this.handleHide}>
          <Modal.Header closeButton>
            <Modal.Title>Pomodoro settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias
            quibusdam similique pariatur omnis mollitia sapiente impedit quidem?
            Et id sequi possimus? Libero eius deleniti suscipit natus a quo
            recusandae beatae.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }

  protected handleShow = () => {
    this.setState({ show: true });
  };

  protected handleHide = () => {
    this.setState({ show: false });
  };
}

export default PomodoroSettings;
