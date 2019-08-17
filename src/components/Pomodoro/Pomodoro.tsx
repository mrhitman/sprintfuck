import { DateTime } from 'luxon';
import React, { Component } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import UIFx from 'uifx';
import PlanList from '../PlanList/PlanList';
import PomodoroSettings from './PomodoroSettings';
import { SettingsState } from '../../store/settings/reducer';
import { TIMER } from '../../store/timer/types';
import { TimerState } from '../../store/timer/reducer';

interface PomodoroState {
  timeLeft?: string;
}

interface PomodoroStore {
  timer: TimerState;
  settings: SettingsState;
  start: (onTimer: () => void) => void;
  stop: () => void;
}

const beep = new UIFx({
  asset: 'https://www.soundjay.com/button/beep-01a.mp3'
});
beep.setVolume(0.5);

class Pomodoro extends Component<{} & PomodoroStore, PomodoroState> {
  public state = {
    timeLeft: undefined,
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
              <div>{this.state.timeLeft ? this.state.timeLeft : `${this.props.settings.pomodoro} : 00`}</div>
            </div>
          </Row>
          <Row>
            <Button
              className="pomodoro-button"
              variant="outline-danger"
              disabled={!!this.props.timer.timerId}
              onClick={this.handleStart}
            >
              Start
            </Button>
            <Button
              className="pomodoro-button"
              variant="outline-danger"
              disabled={!this.props.timer.timerId}
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
    beep.play();
    this.props.start(this.handleTimeUpdate);
  };

  protected handleStop = () => {
    beep.play();
    this.props.stop();
  };

  protected handleTimeUpdate = () => {

    const diff = DateTime
      .local()
      .diff(this.props.timer.endTime!);

    if (+diff >= 0) {
      return this.handleStop();
    }

    this.setState({
      timeLeft: diff.negate().toFormat('mm : ss')
    });
  };
}

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = (dispatch: Dispatch) => ({
  start: (onTimer: () => void) => {
    dispatch({ type: TIMER.START, payload: { onTimer } })
  },
  stop: () => {
    dispatch({ type: TIMER.STOP })
  },
});

export default connect<PomodoroStore>(mapStateToProps, mapDispatchToProps)(Pomodoro);
