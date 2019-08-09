import { DateTime } from "luxon";
import React, { Component } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import UIFx from "uifx";
import PlanList from "../PlanList/PlanList";
import PomodoroSettings from "./PomodoroSettings";

interface PomodoroState {
  end?: DateTime;
  timeLeft?: string;
  timerId?: NodeJS.Timeout;
  minutes: number;
}

const beep = new UIFx({
  asset: "https://www.soundjay.com/button/beep-01a.mp3"
});
beep.setVolume(0.5);

export class Pomodoro extends Component<{}, PomodoroState> {
  public state = {
    end: undefined,
    timeLeft: undefined,
    timerId: undefined,
    minutes: 10
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
              disabled={!!this.state.timerId}
              onClick={this.handleStart}
            >
              Start
            </Button>
            <Button
              className="pomodoro-button"
              variant="outline-danger"
              disabled={!this.state.timerId}
              onClick={this.handleStop}
            >
              Stop
            </Button>
          </Row>
        </Container>
        <PlanList />
      </React.Fragment>
    );
  }

  protected handleStart = () => {
    this.setState(state => {
      beep.play();
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
      beep.play();
      if (state.timerId) {
        clearInterval(state.timerId);
      }
      return {
        end: undefined,
        timerId: undefined,
        timeLeft: undefined,
        minutes: state.minutes
      };
    });
  };

  protected handleTimeUpdate = () => {
    const diff = DateTime.local().diff(this.state.end!);
    if (+diff >= 0) {
      return this.handleStop();
    }

    this.setState({
      timeLeft: diff.negate().toFormat("mm : ss")
    });
  };
}
const mapStateToProps = (state: any) => state;
const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pomodoro);
