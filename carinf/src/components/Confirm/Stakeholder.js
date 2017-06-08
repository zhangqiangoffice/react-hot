import React, {Component} from 'react';
import InsuranceStore from '../../stores/InsuranceStore';
import CarStore from '../../stores/CarStore';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import AppActionCreators from '../../actions/AppActionCreators';
import appInfo from '../asset/json/appInfo.json';
import {orderOperation} from '../APIUtils';
import { Toast } from 'antd-mobile';

import Sheet from './Sheet';
import CarOwner from './CarOwner';
import BeginDate from './BeginDate';
import Distribution from './Distribution';
import Insured from './Insured';
import Applicant from './Applicant';
import ButtonBottom from '../public/ButtonBottom';
import CarInfos from './CarInfos';
import Notice from './Notice';

import zAJAX from 'z-ajax'

export default class Stakeholder extends Component {
    constructor(props){
        super(props);

        this.state = {
            stakeholder: InsuranceStore.getStakeholder(),       //相关方数据集合
            hasNoticed: false,
        };

        this.onInsuranceChange = this.onInsuranceChange.bind(this);
        this.toggleHasNoticed = this.toggleHasNoticed.bind(this);
        this.next = this.next.bind(this);
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

    //切换已告知
    toggleHasNoticed() {
        this.setState({
            hasNoticed: !this.state.hasNoticed
        })
    }

    //如果被保人信息为空则将车主信息填入
    initBBr() {
        if (this.state.stakeholder.bbrName === '' && this.state.stakeholder.bbrNo === '') {
            InsuranceActionCreators.initBBrAsOwner(CarStore.getName(), CarStore.getIdCard())
        }
    }

    //下一步
    next() {
        if (this.state.hasNoticed) {
            orderOperation()
        } else {
            Toast.info('请先确认 重要提示', 2);
            window.scrollTo(0, 3000)
        }
    }

    render() {
        return (
            <div>
                <Sheet />
                <BeginDate />
                <CarOwner />
                <Insured stakeholder={this.state.stakeholder} />
                <Applicant stakeholder={this.state.stakeholder}/>
                <Distribution />
                <CarInfos />
                <Notice hasNoticed={this.state.hasNoticed} toggleHasNoticed={this.toggleHasNoticed}/>
                <ButtonBottom onClickHandle={this.next} fixed={true}/>
            </div>
        );
    };
}
