import React, {Component} from 'react';
import assign from 'object-assign';
import zAJAX from 'z-ajax'

import AppActionCreators from '../../actions/AppActionCreators';
import CarActionCreators from '../../actions/CarActionCreators';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import InsuranceStore from '../../stores/InsuranceStore';

export default class Car extends Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    };

    
    //获取行驶证信息
    handleClick() {
        AppActionCreators.changeLoading();
        let data = assign({}, this.props.car, {insuranceCom: 700 + (InsuranceStore.getInsuranceCom() - 0),})

        let cb = msg => {
            AppActionCreators.changeLoading();
            if (msg.result === 1) {
                CarActionCreators.updateFromRecent(this.props.car)
                InsuranceActionCreators.changeTbCity({no: this.props.car.tbCity, name: this.props.car.tbName})
                if (msg.hasRecord === 1) {
                    CarActionCreators.updateLincence(msg);
                } else {
                    CarActionCreators.clearLincence();
                }
                AppActionCreators.stepNext();
                CarActionCreators.updateIsNewCar(false);
                window.location = '#/Car'
            } else {
                alert(msg.message);
            }
        } 

        zAJAX(`${ctx}/carInf/cardInfo`, data, cb)
    }

    render() {
        const liStyle = {
            background: '#fff',
            borderBottom: '1px solid #ccc',
            padding: '0.5rem 1rem',
            fontSize: '1.4rem',
        }
        const fr = {
            float: 'right',
        }
        const car = this.props.car;
        return (
            <li style={liStyle} onClick={this.handleClick}>
                <div>{car.plateNo}</div>
                <div>{car.name}<span style={fr}>{car.idCard}</span></div>
            </li>
        );
    };
}
