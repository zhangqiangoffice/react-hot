import React, {Component} from 'react';

export default class Switcher extends Component {
    constructor(props){
        super(props);
    };

    render() {
        let yesOrNo = this.props.isOn ? 'yes' : 'no';
        return (
            <img src={require(`../asset/img/${yesOrNo}.png`)} onClick={this.props.onClick}/>
        );
    };
}