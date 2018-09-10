// @flow

/* REACT */
import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';

/* MODULES */
import { AnimatedProgressLine } from './components';
/* CONFIGS */

/* STYLES */
import styles from './styles';

/* TYPES */
type _t_props = {};
type _t_stop = {
  isStart: boolean,
  isPause: boolean,
  isStop: boolean,

}
const { width, height } = Dimensions.get('window');

const boxSize = Math.min(width, height);
const WIDTH = boxSize;
const HEIGHT = boxSize;
const radius = (WIDTH / 2) - 10;


export default class extends Component<_t_props, _t_stop> {
  state = {
    isStart: false,
    isPause: false,
    isStop: false,
  }

  onStop = () => {
    this.setState(() => ({
      isStart: false,
      isPause: false,
      isStop: true,
    }));
  }

  onChange = () => {
    const { isStart } = this.state;
    if (!isStart) {
      this.setState(() => ({
        isStart: true,
        isPause: false,
        isStop: false,
      }));
    } else {
      this.setState(() => ({
        isStart: false,
        isPause: true,
        isStop: false,
      }));
    }
  }

  onAnimationComplete = () => {
    alert('end animation');
    // console.warn('end animation');
  }

  render() {
    const { isPause, isStart, isStop } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onChange}>

          <AnimatedProgressLine
            radius={radius}
            height={HEIGHT}
            width={WIDTH}
            fill={50}
            prefill={0}
            duration={5000}
            toValue={100}
            isStart={isStart}
            isStop={isStop}
            isPause={isPause}

            onAnimationComplete={this.onAnimationComplete}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this.onStop}>
          <View>
            <Text>Text</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
