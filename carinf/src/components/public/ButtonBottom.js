import React, {Component} from 'react';

export default class TitleBar extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        let buttonStyle = {
            display: 'block',
            width: '80%',
            margin: '5rem auto',
            padding: '.5rem 0',
            backgroundColor: '#f39900',
            color: '#fff',
            border: '0',
            fontSize: '1.8rem',
            borderRadius: '.5rem',
        };

        if (this.props.fixed) {
            buttonStyle.position = 'fixed';
            buttonStyle.bottom = '0';
            buttonStyle.left = '0';
            buttonStyle.margin = '0 0 1.5rem 10%';
        }

        return (
            <button type="button" style={buttonStyle}  onClick={this.props.onClickHandle}>{this.props.text}</button>
        );
    };
}