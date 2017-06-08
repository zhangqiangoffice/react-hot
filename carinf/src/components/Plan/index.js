import React, {Component} from 'react';
import TitleBar from '../public/TitleBar';
import Plan from './Plan';

export default class Out extends Component {

  render() {
    return (
        <div>
            <TitleBar title="选择险种" />
            <Plan />
        </div>
    )
  };
}