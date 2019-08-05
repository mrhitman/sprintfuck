import { DateTime } from 'luxon';
import React, { Component } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import PomodoroSettings from './PomodoroSettings';
import PlanList from '../PlanList/PlanList';

interface PomodoroState {
  end?: DateTime;
  timeLeft?: string;
  timerId?: NodeJS.Timeout;
  minutes: number;
}

export class Pomodoro extends Component<{}, PomodoroState> {
  public state = {
    start: undefined,
    timeLeft: undefined,
    timerId: undefined,
    minutes: 25
  };

  public render() {
    return (
      <React.Fragment>
        <Container className="pomodoro-panel">
          <Row className="pomodoro-header">
            <PomodoroSettings />
          </Row>
          <Row>
            <div className="pomodoro-time">
              <div>{this.state.timeLeft ? this.state.timeLeft : `${this.state.minutes} : 00`}</div>
            </div>
          </Row>
          <Row>
            <Button className="pomodoro-button" variant="outline-danger" onClick={this.handleStart}>
              Start
            </Button>
            <Button className="pomodoro-button" variant="outline-danger" onClick={this.handleStop}>
              Stop
            </Button>
          </Row>
        </Container>
        <PlanList />
      </React.Fragment>
    );
  }

  protected handleStart = () => {
    this.setState((state) => {
      const end = DateTime.local().plus({ minutes: state.minutes });
      return {
        end,
        timerId: setInterval(this.handleTimeUpdate, 1000),
        timeLeft: DateTime.local()
          .diff(end)
          .negate()
          .toFormat('mm : ss')
      };
    });
  };

  protected handleStop = () => {
    this.setState((state) => {
      if (state.timerId) {
        clearInterval(state.timerId);
      }
      return {
        start: undefined,
        timerId: undefined,
        timeLeft: undefined,
        minutes: state.minutes
      };
    });
  };

  protected handleTimeUpdate = () => {
    this.setState((state) => {
      return {
        timeLeft: DateTime.local()
          .diff(state.end!)
          .negate()
          .toFormat('mm : ss')
      };
    });
  };
}

export default Pomodoro;
