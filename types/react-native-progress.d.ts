declare module 'react-native-progress/Bar' {
  import { Component } from 'react';
  import { ViewProps } from 'react-native';

  interface ProgressBarProps extends ViewProps {
    progress?: number;
    width?: number;
    height?: number;
    color?: string;
    unfilledColor?: string;
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number;
    animated?: boolean;
    indeterminate?: boolean;
    indeterminateAnimationDuration?: number;
  }

  export default class ProgressBar extends Component<ProgressBarProps> {}
} 