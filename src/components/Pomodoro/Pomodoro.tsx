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
import { TimerState, TimerStateType } from '../../store/timer/reducer';

interface PomodoroState {
  timerId?: NodeJS.Timeout;
  timeLeft?: string;
}

interface PomodoroStore {
  timer: TimerState;
  settings: SettingsState;
  start: () => void;
  stop: () => void;
  done: () => void;
}

const beep = new UIFx({
  asset: 'https://www.soundjay.com/button/beep-01a.mp3'
});
beep.setVolume(0.5);

class Pomodoro extends Component<{} & PomodoroStore, PomodoroState> {
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
                {this.props.timer.state !== 'idle' && this.state.timeLeft ? (
                  this.state.timeLeft
                ) : (
                  `${this.props.settings.pomodoro} : 00`
                )}
              </div>
            </div>
          </Row>
          <Row>
            <Button
              className="pomodoro-button"
              variant="outline-danger"
              disabled={this.props.timer.state !== 'idle'}
              onClick={this.handleStart}
            >
              Start
            </Button>
            <Button
              className="pomodoro-button"
              variant="outline-danger"
              disabled={this.props.timer.state === 'idle'}
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
    this.props.start();

    const timerId = setInterval(this.handleTimeUpdate, 200);
    this.setState({ timerId });
  };

  protected handleStop = () => {
    beep.play();
    clearTimeout(this.state.timerId!);
    this.setState({
      timeLeft: undefined,
      timerId: undefined
    });
    this.props.stop();
  };

  protected handleTimeUpdate = () => {
    if (!this.props.timer.endTime) {
      return;
    }

    const diff = DateTime
      .local()
      .diff(this.props.timer.endTime);

    if (+diff >= 0) {
      beep.play();
      this.props.done();
      return;
    }

    this.setState({
      timeLeft: diff.negate().toFormat('mm : ss')
    });
  };
}

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = (dispatch: Dispatch) => ({
  start: (type: TimerStateType) => {
    dispatch({ type: TIMER.START });
  },
  stop: () => {
    dispatch({ type: TIMER.STOP });
  },
  done: () => {
    dispatch({ type: TIMER.DONE });
  },
});

export default connect<PomodoroStore>(mapStateToProps, mapDispatchToProps)(Pomodoro);
