import React, {Component} from 'react';

export default class TopTip extends Component {
    render() {
        return <div className="top_tip">{this.props.tip}</div>
    };
}