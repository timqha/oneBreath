// @flow

/* REACT */
import React, { Component } from 'react';
import {
  ART,
} from 'react-native';

const {
  Group,
  Shape,
  Surface,
} = ART;

/* TYPES */
type _t_props = {
  width: number,
  height: number,
  radius: number,
  fill: number
};

const arcSweepAngle = 360;
const toRadians = degrees => degrees / 180 * Math.PI;


export default class extends Component<_t_props> {

  polarToCartesian = (centerX: number, centerY: number, r: number, angleInDegrees: number) => {
    const angleInRadians = toRadians(angleInDegrees - 90);
    return {
      x: centerX + (r * Math.cos(angleInRadians)),
      y: centerY + (r * Math.sin(angleInRadians))
    };
  }

  circlePath = (x: number, y: number, r: number, startAngle: number, endAngle: number) => {
    const start = this.polarToCartesian(x, y, r, endAngle * 0.9999);
    const end = this.polarToCartesian(x, y, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    const d = [
      'M', start.x, start.y,
      'A', r, r, 0, largeArcFlag, 0, end.x, end.y
    ];
    return d.join(' ');
  }

  clampFill = (preFill: number) => Math.min(100, Math.max(0, preFill));

  render() {

    const {
      radius,
      height,
      width,
      fill
    } = this.props;

    const indent = 10;
    const path = this.circlePath(
      radius + indent,
      radius + indent,
      radius - indent,
      0,
      (arcSweepAngle * 0.9999) * this.clampFill(fill) / 100
    );


    return (
      <Surface
        width={width}
        height={height}
      >
        <Group rotation={0} originX={radius / 2} originY={radius}>
          <Shape
            d={path}
            strokeWidth={14}
            strokeCap="butt"
            stroke="blue"
          />
          <Shape
            d={path}
            strokeWidth={20}
            strokeCap="butt"
            stroke="rgba(1,15,10,0.2)"
          />
        </Group>
        <ART.Text
          font={{
            fontFamily: 'Helvetica Neue',
            fontSize: 100,
          }}
          fill="#000000"
          x={radius}
          y={radius - 50}
          alignment="center"
        >
            03
        </ART.Text>
      </Surface>
    );
  }
}
