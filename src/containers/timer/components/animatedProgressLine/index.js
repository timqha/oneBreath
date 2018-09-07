// @flow

/* REACT */
import React, { Component } from 'react';
import {
  Animated,
  Easing
} from 'react-native';
import ProgressLine from '../progressLine';

const AnimatedProgress = Animated.createAnimatedComponent(ProgressLine);


/* TYPES */
type _t_props = {
  fill: number,
  prefill: number,
  duration: number,
  toValue: number,

  isStart: boolean,
  isStop: boolean,
  isPause: boolean,

};
type _t_state = {
  fillAnimation: Animated.Value,
}

export default class extends Component<_t_props, _t_state> {
  state = {
    fillAnimation: new Animated.Value(this.props.prefill || 0)
  }

  componentDidUpdate(prevProps: _t_props) {
    const { isStart, isStop, isPause } = this.props;

    if (prevProps.isStart !== isStart) {
      this.animateRun();
    }

    if (prevProps.isStop !== isStop && !isStart) {
      this.animateRunBack();
    }

    if (prevProps.isPause !== isPause && !isStart && !isStop) {
      this.animatePause();
    }
  }

  animatePause() {
    const { toValue, duration } = this.props;
    const { fillAnimation } = this.state;

    return Animated.timing(
      fillAnimation, {
        duration,
        toValue,
        easing: Easing.out(Easing.ease),
      }
    ).stop();
  }

  animateRun() {
    const { toValue, duration } = this.props;
    const { fillAnimation } = this.state;

    return Animated.timing(fillAnimation, {
      // need deduction of time
      duration,
      toValue,
      easing: Easing.out(Easing.ease),
    }).start();
  }

  animateRunBack() {
    const { fillAnimation } = this.state;

    return Animated.timing(fillAnimation, {
      toValue: 0,
      easing: Easing.out(Easing.ease),
      duration: 100,
    }).start();
  }

  render() {
    const {
      fill,
      prefill,
      toValue,
      ...other
    } = this.props;
    const { fillAnimation } = this.state;

    return (
      <AnimatedProgress
        {...other}
        fill={fillAnimation}
      />
    );
  }
}
