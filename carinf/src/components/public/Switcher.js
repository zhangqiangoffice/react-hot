import React, {Component} from 'react';

export default class Switcher extends Component {

    render() {
        let yesOrNo = this.props.isOn ? 'yes' : 'no';
        return (
            <img className="switcher_img" src={require(`../asset/img/${yesOrNo}.png`)} onClick={this.props.onClick}/>
        );
    };
}