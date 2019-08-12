import { Formik, FormikProps } from 'formik';
import React, { Component } from 'react';
import { Button, Col, Container, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';
import { FaRegSun } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SettingsState } from '../../store/settings/reducer';
import { SETTINGS } from '../../store/settings/types';

interface PomodoroSettingsStore {
  settings: SettingsState;
  saveSettings: (values: SettingsState) => void;
}

interface PomodoroSettingsState {
  show: boolean;
}

export class PomodoroSettings extends Component<{} & PomodoroSettingsStore, PomodoroSettingsState> {
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
        <Formik
          onSubmit={this.handleSave}
          initialValues={this.props.settings}
          render={(bag: FormikProps<any>) => (
            <Modal size="lg" show={show} onHide={this.handleHide}>
              <Modal.Header closeButton>
                <Modal.Title>Pomodoro settings</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col>Schema</Col>
                    <Col>
                      <InputGroup>
                        <FormControl as="select">
                          <option>default 25 5 15 4</option>
                        </FormControl>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Pomidoro time</Col>
                    <Col>
                      <InputGroup>
                        <FormControl value={bag.values.pomodoro} onChange={bag.handleChange('pomodoro')} />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Short break time</Col>
                    <Col>
                      <InputGroup>
                        <FormControl value={bag.values.shortBreak} onChange={bag.handleChange('shortBreak')} />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Long break time</Col>
                    <Col>
                      <InputGroup>
                        <FormControl value={bag.values.longBreak} onChange={bag.handleChange('longBreak')} />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Long break interval</Col>
                    <Col>
                      <InputGroup>
                        <FormControl
                          value={bag.values.longBreakInterval}
                          onChange={bag.handleChange('longBreakInterval')}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Pomodoro autostart</Col>
                    <Col>
                      <label className="switch">
                        <input type="checkbox" checked={bag.values.pomodoroAutoStart} onChange={bag.handleChange('pomodoroAutoStart')} />
                        <span className="slider round"  />
                      </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Break autostart</Col>
                    <Col>
                      <label className="switch">
                        <input type="checkbox" checked={bag.values.breakAutoStart} onChange={bag.handleChange('breakAutoStart')} />
                        <span className="slider round"  />
                      </label>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleHide}>
                  Close
                </Button>
                <Button variant="primary" onClick={bag.submitForm}>
                  Save changes
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        />
      </React.Fragment>
    );
  }

  protected handleShow = () => {
    this.setState({ show: true });
  };

  protected handleHide = () => {
    this.setState({ show: false });
  };

  protected handleSave = (values: SettingsState) => {
    this.props.saveSettings(values);
    this.handleHide();
  };
}
const mapStateToProps = (state: any) => state;
const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveSettings: (values: SettingsState) => dispatch({ type: SETTINGS.SET, payload: values })
});

export default connect<PomodoroSettingsStore>(mapStateToProps, mapDispatchToProps)(PomodoroSettings);
