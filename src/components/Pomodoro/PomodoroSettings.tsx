import React, { Component } from 'react';
import { Button, Col, Container, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';
import { FaRegSun } from 'react-icons/fa';

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
            <Container>
              <Row>
                <Col>Schema</Col>
                <Col>
                  <InputGroup>
                    <FormControl value="default 25 5 15 4" />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>Pomidoro time</Col>
                <Col>
                  <InputGroup>
                    <FormControl value="25" />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>Short break time</Col>
                <Col>
                  <InputGroup>
                    <FormControl value="5" />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>Long break time</Col>
                <Col>
                  <InputGroup>
                    <FormControl value="5" />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>Pomodoro autostart</Col>
                <Col>
                  <label className="bs-switch">
                    <input checked type="checkbox" readOnly />
                    <span className="slider round" />
                  </label>
                </Col>
              </Row>
            </Container>
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
