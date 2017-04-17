import React, {Component} from 'react';
import Home from './Home';
import Place from './Place';
import CarNum from './CarNum';
import OwnerName from './OwnerName';
import OwnerCard from './OwnerCard';
import RemainingTimes from './RemainingTimes';
import ProvinceSelector from './ProvinceSelector';
import APIUtils from '../APIUtils';
import CarStore from '../../stores/CarStore';
import InsuranceStore from '../../stores/InsuranceStore';
import ButtonBottom from '../public/ButtonBottom';

import { Link } from 'react-router'
import { Toast } from 'antd-mobile';

export default class IndexDesk extends Component {
    constructor(props) {
        super(props);

        this.state = this.getData();

        this.onCarChange = this.onCarChange.bind(this);
        this.nextStep = this.nextStep.bind(this);
    };

    getData() {
        return {
            plateNo: CarStore.getPlateNo(),
            name: CarStore.getName(),
            idCard: CarStore.getIdCard(),
            tbPlace: InsuranceStore.getTbPlace(),
            usedTimes: InsuranceStore.getUsedTimes(),
        }
    };

    onCarChange() {
        this.setState(this.getData());
    }

    componentDidMount() {      
        CarStore.addChangeListener(this.onCarChange);
        InsuranceStore.addChangeListener(this.onCarChange);
    };

    componentWillUnmount() {
        CarStore.removeChangeListener(this.onCarChange);
        InsuranceStore.removeChangeListener(this.onCarChange);
    };

    //点击下一步
    nextStep() {
        if (!this.state.tbPlace.city.name) {
            Toast.info('请选择投保城市', 2)
        } else {
            APIUtils.cardInfo();
        }
    };

    render() {
        return (
            <div className="index_desk">
                <ul className="index_ul">
                    <Home />
                    <Place province={this.state.tbPlace.province} city={this.state.tbPlace.city}/>
                    <CarNum num={this.state.plateNo}/>
                    <OwnerName name={this.state.name} />
                    <OwnerCard idCard={this.state.idCard} />
                </ul>
                <RemainingTimes usedTimes={this.state.usedTimes}/>
                <Link to="/recent"><span className="recent">最近询价车辆</span></Link>
                <ButtonBottom text="下一步" onClickHandle={this.nextStep}/>          
            </div>
        );
    };
}
