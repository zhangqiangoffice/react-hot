import React, {Component} from 'react';
import CarActionCreators from '../../actions/CarActionCreators';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import APIUtils from '../APIUtils';

export default class Car extends Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    };

    
    //获取行驶证信息
    handleClick() {
        CarActionCreators.updateFromRecent(this.props.car)
        InsuranceActionCreators.changeTbCity({no: this.props.car.tbCity, name: this.props.car.tbName})
        APIUtils.cardInfo();
    }

    render() {
        const car = this.props.car;
        return (
            <li onClick={this.handleClick}>
                <div>{car.plateNo}</div>
                <div>{car.name}<label>{car.idCard}</label></div>
            </li>
        );
    };
}

