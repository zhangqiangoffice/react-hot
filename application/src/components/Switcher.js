import React, {Component} from 'react';

export default class Switcher extends Component {
    constructor(props){
        super(props);
    };

    render() {
        let yesOrNo = this.props.isOn ? 'yes' : 'no';
        return (
            <img src={ctx + '/static/img/carInf/' + yesOrNo + '.png'} onClick={this.props.onClick}/>
        );
    };
}