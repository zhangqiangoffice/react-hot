import React, {Component} from 'react';
import InsuranceStore from '../../stores/InsuranceStore';
import CarStore from '../../stores/CarStore';
import LiSelector from '../LiSelector';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import AppActionCreators from '../../actions/AppActionCreators';
import appInfo from '../asset/json/appInfo.json';
import APIUtils from '../APIUtils';
import Loading from '../Loading';

import Sheet from './Sheet';
import CarOwner from './CarOwner';
import BeginDate from './BeginDate';
import Distribution from './Distribution';
import Insured from './Insured';
import Applicant from './Applicant';
import ButtonBottom from '../public/ButtonBottom';
import CarInfos from './CarInfos';

import zAJAX from 'z-ajax'

export default class Stakeholder extends Component {
    constructor(props){
        super(props);

        this.state = {
            stakeholder: InsuranceStore.getStakeholder(),       //相关方数据集合
        };

        this.onInsuranceChange = this.onInsuranceChange.bind(this);
    };

    onInsuranceChange() {
        this.setState({
            stakeholder: InsuranceStore.getStakeholder(),       //相关方数据集合
        });
    }

    componentDidMount() {      
        InsuranceStore.addChangeListener(this.onInsuranceChange);
        this.initBBr();
    };

    componentWillUnmount() {
        InsuranceStore.removeChangeListener(this.onInsuranceChange);
    };

    //如果被保人信息为空则将车主信息填入
    initBBr() {
        if (this.state.stakeholder.bbrName === '' && this.state.stakeholder.bbrNo === '') {
            InsuranceActionCreators.initBBrAsOwner(CarStore.getName(), CarStore.getIdCard())
        }
    }

    render() {
        return (
            <div className="stakeholder">
                <Sheet />
                <BeginDate />
                <CarOwner />
                <Insured stakeholder={this.state.stakeholder} />
                <Applicant stakeholder={this.state.stakeholder}/>
                <Distribution />
                <CarInfos />
                <ButtonBottom onClickHandle={APIUtils.orderOperation} fixed={true}/>
            </div>
        );
    };
}
