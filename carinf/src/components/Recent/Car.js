import React, {Component} from 'react';
import InsuranceStore from '../../stores/InsuranceStore';
import CarActionCreators from '../../actions/CarActionCreators';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import { componies } from '../asset/json/appInfo.json';
import { cardInfo } from '../APIUtils';
import { Toast } from 'antd-mobile';

export default class Car extends Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    };

    
    //获取行驶证信息
    handleClick() {
        let car = this.props.car

        //判断已报价次数
        if (car[`${componies[InsuranceStore.getInsuranceCom() - 1].spell}Count`] >= 10) {
            Toast.info('该车报价已超过10次')
        } else {
            CarActionCreators.updateFromRecent(this.props.car)
            InsuranceActionCreators.changeTbCity({no: this.props.car.tbCity, name: this.props.car.tbName})
            InsuranceActionCreators.updateUnUsedTimes(car.tpCount, car.zhCount)
            cardInfo();
        }
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

