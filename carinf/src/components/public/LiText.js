import React, {Component} from 'react';

export default class TitleBar extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const liStyle = {
            borderBottom: '1px solid #ccc',
            height: '5rem',
            lineHeight: '5rem',
            padding: '0 1rem',
        };
        const labelStyle = {
            display: 'inline-block',
            width: '8rem',
        };
        const inputStyle = {
            verticalAlign: 'middle',
            border: '0',
        }

        return (
            <li style={liStyle}>
                <label style={labelStyle}>{this.props.item}</label>
                <input type="text" placeholder="请输入" value={this.props.val} onChange={e => this.props.onChangeVal((e.target.value).trim())} style={inputStyle}/>
            </li>

        );
    };
}