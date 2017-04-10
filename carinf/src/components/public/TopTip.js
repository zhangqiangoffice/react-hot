import React, {Component} from 'react';

export default class TopTip extends Component {
    render() {
        const tipStyle = {
            textAlign: 'center',
            padding: '1rem 0',
            color: '#999',
            marginTop: '4.5rem',
            fontSize: '1.4rem',
        }
        return <div style={tipStyle}>{this.props.tip}</div>
    };
}