import React, { Component } from "react";
import { Modal } from "react-bootstrap";

interface PomodoroSettingsProps {
  show: boolean;
}
export class PomodoroSettings extends Component<PomodoroSettingsProps> {
  public render() {
    const { show } = this.props;
    return (
      <Modal show={show}>
        <Modal.Header>Pomodoro settings</Modal.Header>
        <Modal.Body>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias
          quibusdam similique pariatur omnis mollitia sapiente impedit quidem?
          Et id sequi possimus? Libero eius deleniti suscipit natus a quo
          recusandae beatae.
        </Modal.Body>
      </Modal>
    );
  }
}

export default PomodoroSettings;
