import React, {Component} from 'react';

import SelectorInLine from '../public/SelectorInLine';

import APIUtils from '../APIUtils';
import CarStore from '../../stores/CarStore';
import InsuranceStore from '../../stores/InsuranceStore';
import CarActionCreators from '../../actions/CarActionCreators';
import AppActionCreators from '../../actions/AppActionCreators';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';

import Provinces from '../json/provinces'

import Loading from '../public/Loading';

import zAJAX from 'z-ajax'

export default class IndexDesk extends Component {
    constructor(props) {
        super(props);

        this.state = {

            isShow: false,
            // provinceShort: CarStore.getProvinceShort(),                           //车牌省字段
            // plateNum: CarStore.getPlateNum(),
            // name: CarStore.getName(),
            // idCard: CarStore.getIdCard(),
            // tbPlace: InsuranceStore.getTbPlace(),
            // stakeholder: InsuranceStore.getStakeholder(),
            // tbIsShow: false,
            options: [],
            selected: '',
            clickHandle: null,

        };

        // this.switchSelector = this.switchSelector.bind(this);
        // this.isNewCar = this.isNewCar.bind(this);
        // this.nextStep = this.nextStep.bind(this);
        // this.clickTbProvince = this.clickTbProvince.bind(this);
        // this.clickTbCity = this.clickTbCity.bind(this);
        // this.tbProvince = this.tbProvince.bind(this);
        // this.tbCity = this.tbCity.bind(this);
        this.showTbProvinceSelector = this.showTbProvinceSelector.bind(this);
        // this.showTbCitySelector = this.showTbCitySelector.bind(this);
        this.selectTbProvince = this.selectTbProvince.bind(this);
        // this.selectTbCity = this.selectTbCity.bind(this);
        // this.tbClickClose = this.tbClickClose.bind(this);
        this.onClose = this.onClose.bind(this)

    };

    // //切换省份选择器的显隐
    // switchSelector() {
    //     this.setState({
    //         isShow: !this.state.isShow,
    //     });
    // };

    // //目前中华只支持安徽，所以该函数未启用
    // //选择省
    // clickTbProvince() {
    //     if(!this.state.stakeholder.provinceDatas) {
    //         this.tbProvince();
    //     } else {
    //         this.showTbProvinceSelector();
    //     }
    // }

    // //选择市
    // clickTbCity() {
    //     let provinceNo = this.state.tbPlace.province.no;
    //     if (provinceNo) {
    //         if (!this.state.stakeholder.cityDatas[provinceNo]) {
    //             this.tbCity();
    //         } else {
    //             this.showTbCitySelector();
    //         }
    //     } else {
    //         alert('请先选择省份');
    //     }
    // }

    // //获取省列表
    // tbProvince() {
    //     AppActionCreators.showLoading();

    //     let cb = (msg) => {
    //         AppActionCreators.hideLoading();
    //         InsuranceActionCreators.updateProvinceDatas(msg);
    //         this.showTbProvinceSelector();
    //     }

    //     zAJAX(`${ctx}/webService/province`, null, cb)
    // }

    // //获取城市
    // tbCity() {
    //     this.changeIsLoading()
    //     let no = this.state.tbPlace.province.no;

    //     let cb = (msg) => {
    //         this.changeIsLoading()
    //         InsuranceActionCreators.updateCityDatas(no, msg);
    //         this.showTbCitySelector();
    //     }

    //     zAJAX(`${ctx}/webService/region`, {id: no}, cb)

    // }

    //展示省选择器
    showTbProvinceSelector() {
        let arr = Provinces.map((ele, index) => {
            return ele.name
        })
        this.setState({
            isShow:true,
            options: arr,
            selected: this.props.province,
            clickHandle: this.selectTbProvince,
        });
    }

    // //显示城市选择器
    // showTbCitySelector() {
    //     let arr = [];
    //     let no = this.state.tbPlace.province.no;
    //     this.state.stakeholder.cityDatas[no].forEach(function(obj) {
    //         arr.push(obj.regionName);
    //     });
    //     this.setState({
    //         tbIsShow:true,
    //         tbOptions: arr,
    //         tbSelected: this.state.tbPlace.name,
    //         tbClickHandle: this.selectTbCity
    //     });
    // }

    

    //选择省操作
    selectTbProvince(index) {
        // let pro = this.state.stakeholder.provinceDatas[index];
        // let obj = {
        //     name: pro.provinceName,
        //     no: pro.provinceNo
        // }
        // if (obj.no !== this.state.tbPlace.province.no) {
        //     InsuranceActionCreators.changeTbCity({name:'', no: ''});
        // }
        // InsuranceActionCreators.changeTbProvince(obj);
    }

    //关闭选择器
    onClose() {
        this.setState({
            isShow: false
        })
    }

    // //通过index选择市
    // selectTbCity(index) {
    //     let no = this.state.tbPlace.province.no;
    //     let city = this.state.stakeholder.cityDatas[no][index];
    //     let obj = {
    //         name: city.regionName,
    //         no: city.regionNo
    //     }
    //     InsuranceActionCreators.changeTbCity(obj);
    //     CarActionCreators.changeDefaultPlate(obj.no);
    // }

    render() {
        return (
            <li>投保地区
                <span className="selections">
                    <input className="select_toubao" placeholder="请选择省" readOnly="readOnly" value={this.props.province} onClick={this.showTbProvinceSelector} />
                    <input className="select_toubao" placeholder="请选择市" readOnly="readonly" value={this.props.city} onClick={this.clickTbCity}/>
                </span>
                <SelectorInLine 
                    isShow={this.state.isShow} 
                    options={this.state.options} 
                    selected={this.state.selected} 
                    onClose={this.onClose} 
                    onSelect={this.clickHandle}/>
            </li>
                    
        );
    };
}
