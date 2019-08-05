import { DateTime } from "luxon";
import React, { Component } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { FaRegSun } from "react-icons/fa";

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
      <Container className="pomodoro-panel">
        <Row className="pomodoro-header">
          <Button size="sm" variant="outline-light">
            <FaRegSun />
          </Button>
        </Row>
        <Row>
          <div className="pomodoro-time">
            <div>
              {this.state.timeLeft
                ? this.state.timeLeft
                : `${this.state.minutes} : 00`}
            </div>
          </div>
        </Row>
        <Row>
          <Button
            className="pomodoro-button"
            variant="outline-danger"
            onClick={this.handleStart}
          >
            Start
          </Button>
          <Button
            className="pomodoro-button"
            variant="outline-danger"
            onClick={this.handleStop}
          >
            Stop
          </Button>
        </Row>
      </Container>
    );
  }

  protected handleStart = () => {
    this.setState(state => {
      const end = DateTime.local().plus({ minutes: state.minutes });
      return {
        end,
        timerId: setInterval(this.handleTimeUpdate, 1000),
        timeLeft: DateTime.local()
          .diff(end)
          .negate()
          .toFormat("mm : ss")
      };
    });
  };

  protected handleStop = () => {
    this.setState(state => {
      if (state.timerId) {
        clearInterval(state.timerId);
      }
      return {
        start: undefined,
        timerId: undefined,
        minutes: state.minutes
      };
    });
  };

  protected handleTimeUpdate = () => {
    this.setState(state => {
      const diff = DateTime.local().diff(state.end!);
      return {
        timeLeft: diff.negate().toFormat("mm : ss")
      };
    });
  };
}

export default Pomodoro;
