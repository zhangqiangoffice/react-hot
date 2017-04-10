import React, {Component} from 'react';
import InsuranceStore from '../../stores/InsuranceStore';
import CarStore from '../../stores/CarStore';
import RadioSelector from '../RadioSelector';
import LiSelector from '../LiSelector';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import AppActionCreators from '../../actions/AppActionCreators';
import appInfo from '../json/appInfo.json';
import APIUtils from '../APIUtils';
import Loading from '../Loading';

import Sheet from './Sheet';
import CarOwner from './CarOwner';
import BeginDate from './BeginDate';
import Distribution from './Distribution';

import zAJAX from 'z-ajax'

export default class Stakeholder extends Component {
    constructor(props){
        super(props);

        this.state = {
            isShow: false,

            deliveryType: InsuranceStore.getDeliveryType(),
            stakeholder: InsuranceStore.getStakeholder(),       //相关方数据集合
            insuranceCom: InsuranceStore.getInsuranceCom(),
            isHome: CarStore.getIsHome(),
            plateNo: CarStore.getPlateNo(),
            brandModel: CarStore.getBrandModel(),
            engineNo: CarStore.getEngineNo(),
            registerDate: CarStore.getRegisterDate(),
            isTransferOwnership: CarStore.getIsTransferOwnership(),
            vin: CarStore.getVin(),
            name: CarStore.getName(),
            idCard: CarStore.getIdCard(),
            result: InsuranceStore.getOffers()[InsuranceStore.getInsuranceCom()],

        };

        this.onInsuranceChange = this.onInsuranceChange.bind(this);
        this.quoteAddress = this.quoteAddress.bind(this);
    };

    onInsuranceChange() {
        this.setState({
            deliveryType: InsuranceStore.getDeliveryType(),
            stakeholder: InsuranceStore.getStakeholder(),       //相关方数据集合
            insuranceCom: InsuranceStore.getInsuranceCom(),
            isHome: CarStore.getIsHome(),
            plateNo: CarStore.getPlateNo(),
            brandModel: CarStore.getBrandModel(),
            engineNo: CarStore.getEngineNo(),
            registerDate: CarStore.getRegisterDate(),
            isTransferOwnership: CarStore.getIsTransferOwnership(),
            vin: CarStore.getVin(),
            name: CarStore.getName(),
            idCard: CarStore.getIdCard(),
            result: InsuranceStore.getOffers()[InsuranceStore.getInsuranceCom()],
        });
    }

    componentDidMount() {      
        
        InsuranceStore.addChangeListener(this.onInsuranceChange);
    };

    componentWillUnmount() {
        InsuranceStore.removeChangeListener(this.onInsuranceChange);
    };


    //跳转到地址列表页面
    quoteAddress() {
        window.location = '#/addressList'
    }

    render() {

        const fr = {
            float: 'right',
        }

        let listShows;

        if (this.state.deliveryType) {
            listShows = <ul>
                <li>
                    <label>配送方式</label>
                    <span>{appInfo.deliveryTypes[this.state.deliveryType]}</span>
                </li>
                <li>
                    <label>门店</label>
                    <input type="text" placeholder="请选择" readOnly="readonly" value={this.state.stakeholder.store.name} />
                </li>
                <li>
                    <label>地址</label>
                    <span>{this.state.stakeholder.store.address}</span>
                </li>
            </ul>
        } else {
            listShows = <ul>
                <li>
                    <label>配送方式</label>
                    <span>{appInfo.deliveryTypes[this.state.deliveryType]}</span>
                </li>
                <li onClick={this.quoteAddress}>
                    <label>收件人</label>
                    <span>{this.state.stakeholder.collectName}<span style={fr}>{this.state.stakeholder.collectPhone}</span></span>
                </li>
                <li onClick={this.quoteAddress}>
                    <label>收件地址</label>
                    <span >{this.state.stakeholder.add_province_name}{this.state.stakeholder.add_city_name}{this.state.stakeholder.add_district_name}{this.state.stakeholder.collectAdd}</span>
                </li>
            </ul>
        }

        let listShow2 = null;
        let total = 0;

        if (this.state.result && this.state.result.list) {
            listShow2 = this.state.result.list.map((insure, index) => {
                //累计商业险合计
                total += (insure.prm - 0);
                return (
                    <li key={index}>
                        <label>{insure.name}</label>
                        {insure.amt}
                        <span className="right">￥{insure.prm}</span>
                    </li>
                )
            })
        }           

        return (
            <div className="stakeholder">
                <Sheet />
                <BeginDate />
                <CarOwner />

                <div className="insured">
                    <div className="item_title">被保人信息</div>
                    <ul>
                        <li>
                            <label>姓名</label>
                            <input type="text" placeholder="请输入" value={this.state.stakeholder.bbrName} onChange={(event, type) => {InsuranceActionCreators.handleChange(event, 'bbrName')}}/>
                        </li>
                        <li>
                            <label>身份证号</label>
                            <input type="text" placeholder="请输入" value={this.state.stakeholder.bbrNo} onChange={(event, type) => {InsuranceActionCreators.handleChange(event, 'bbrNo')}}/>
                        </li>
                        <li>
                            <label>电子邮箱</label>
                            <input type="text" placeholder="请输入" value={this.state.stakeholder.bbrEmail} onChange={(event, type) => {InsuranceActionCreators.handleChange(event, 'bbrEmail')}}/>
                        </li>
                        <li>
                            <label>手机号</label>
                            <input type="number" placeholder="请输入" value={this.state.stakeholder.bbrPhone} onChange={(event, type) => {InsuranceActionCreators.handleChange(event, 'bbrPhone')}}/>
                        </li>
                    </ul>
                </div>

                <div className="applicant">
                    <div className="item_title"><label>投保人信息</label> 
                        <span className={this.state.stakeholder.sameAs ? 'selected' : ''} onClick={InsuranceActionCreators.toggleSameAs}>同被保人</span>
                    </div>
                    <ul className={this.state.stakeholder.sameAs ? 'hide' : ''}>
                        <li>
                            <label>姓名</label>
                            <input type="text" placeholder="请输入" value={this.state.stakeholder.tbrName} onChange={(event, type) => {InsuranceActionCreators.handleChange(event, 'tbrName')}}/>
                        </li>
                        <li>
                            <label>身份证号</label>
                            <input type="text" placeholder="请输入" value={this.state.stakeholder.tbrNo} onChange={(event, type) => {InsuranceActionCreators.handleChange(event, 'tbrNo')}}/>
                        </li>
                        <li>
                            <label>电子邮箱</label>
                            <input type="text" placeholder="请输入" value={this.state.stakeholder.tbrEmail} onChange={(event, type) => {InsuranceActionCreators.handleChange(event, 'tbrEmail')}}/>
                        </li>
                        <li>
                            <label>手机号</label>
                            <input type="number" placeholder="请输入" value={this.state.stakeholder.tbrPhone} onChange={(event, type) => {InsuranceActionCreators.handleChange(event, 'tbrPhone')}}/>
                        </li>
                    </ul>
                </div>

                <Distribution />

            {/*}    <div className="distribution">
                    <div className="item_title">保单配送</div>
                    {listShows}
                </div>
*/}
                <div className="car_infos">
                    <div className="item_title">车辆信息</div>
                    <ul>
                        <li>
                            <label>车牌号码</label>
                            {this.state.plateNo}
                        </li>
                        <li>
                            <label>品牌型号</label>
                            {this.state.brandModel}
                        </li>
                        <li>
                            <label>车架号</label>
                            {this.state.vin}
                        </li>
                        <li>
                            <label>发动机号</label>
                            {this.state.engineNo}
                        </li>
                        <li>
                            <label>注册日期</label>
                            {this.state.registerDate}
                        </li>
                        <li>
                            <label>是否过户</label>
                            {this.state.plateNo === 1 ? '是' : '否'}
                        </li>
                    </ul>
                </div>

                <button type="button" className="next fixed" onClick={APIUtils.orderOperation}>下一步</button>

            </div>
        );
    };
}
