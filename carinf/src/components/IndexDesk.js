import React, {Component} from 'react';
import ProvinceSelector from './ProvinceSelector';
import LiSelector from './LiSelector';
import APIUtils from './APIUtils';
import CarStore from '../stores/CarStore';
import InsuranceStore from '../stores/InsuranceStore';
import CarActionCreators from '../actions/CarActionCreators';
import AppActionCreators from '../actions/AppActionCreators';
import InsuranceActionCreators from '../actions/InsuranceActionCreators';
import Loading from './Loading';

import zAJAX from 'z-ajax'

export default class IndexDesk extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
            provinceShort: CarStore.getProvinceShort(),                           //车牌省字段
            plateNum: CarStore.getPlateNum(),
            isHome: CarStore.getIsHome(),
            name: CarStore.getName(),
            idCard: CarStore.getIdCard(),
            tbPlace: InsuranceStore.getTbPlace(),
            stakeholder: InsuranceStore.getStakeholder(),
            tbIsShow: false,
            tbOptions: [],
            tbSelected: '',
            tbClickHandle: null,

        };

        this.onCarChange = this.onCarChange.bind(this);
        this.switchSelector = this.switchSelector.bind(this);
        this.isNewCar = this.isNewCar.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.clickTbProvince = this.clickTbProvince.bind(this);
        this.clickTbCity = this.clickTbCity.bind(this);
        this.tbProvince = this.tbProvince.bind(this);
        this.tbCity = this.tbCity.bind(this);
        this.showTbProvinceSelector = this.showTbProvinceSelector.bind(this);
        this.showTbCitySelector = this.showTbCitySelector.bind(this);
        this.selectTbProvince = this.selectTbProvince.bind(this);
        this.selectTbCity = this.selectTbCity.bind(this);
        this.tbClickClose = this.tbClickClose.bind(this);
        this.updatePlateNum = this.updatePlateNum.bind(this);
    };

    onCarChange() {
        this.setState({
            provinceShort: CarStore.getProvinceShort(),
            plateNum: CarStore.getPlateNum(), 
            isHome: CarStore.getIsHome(),
            name: CarStore.getName(),
            idCard: CarStore.getIdCard(),
            tbPlace: InsuranceStore.getTbPlace(),
            stakeholder: InsuranceStore.getStakeholder(),
        });
    }

    componentDidMount() {      
        CarStore.addChangeListener(this.onCarChange);
    };

    componentWillUnmount() {
        CarStore.removeChangeListener(this.onCarChange);
    };

    //切换省份选择器的显隐
    switchSelector() {
        this.setState({
            isShow: !this.state.isShow,
        });
    };

    //目前中华只支持安徽，所以该函数未启用
    //选择省
    clickTbProvince() {
        if(!this.state.stakeholder.provinceDatas) {
            this.tbProvince();
        } else {
            this.showTbProvinceSelector();
        }
    }

    //选择市
    clickTbCity() {
        let provinceNo = this.state.tbPlace.province.no;
        if (provinceNo) {
            if (!this.state.stakeholder.cityDatas[provinceNo]) {
                this.tbCity();
            } else {
                this.showTbCitySelector();
            }
        } else {
            alert('请先选择省份');
        }
    }

    //获取省列表
    tbProvince() {
        AppActionCreators.showLoading();

        let cb = (msg) => {
            AppActionCreators.hideLoading();
            InsuranceActionCreators.updateProvinceDatas(msg);
            this.showTbProvinceSelector();
        }

        zAJAX(`${ctx}/webService/province`, null, cb)
    }

    //获取城市
    tbCity() {
        AppActionCreators.showLoading();
        let no = this.state.tbPlace.province.no;

        let cb = (msg) => {
            AppActionCreators.hideLoading();
            InsuranceActionCreators.updateCityDatas(no, msg);
            this.showTbCitySelector();
        }

        zAJAX(`${ctx}/webService/region`, {id: no}, cb)

    }

    //展示省选择器
    showTbProvinceSelector() {
        let arr = [];
        this.state.stakeholder.provinceDatas.forEach(function(obj) {
            arr.push(obj.provinceName);
        });
        this.setState({
            tbIsShow:true,
            tbOptions: arr,
            tbSelected: this.state.tbPlace.province.name,
            tbClickHandle: this.selectTbProvince,
        });
    }

    //显示城市选择器
    showTbCitySelector() {
        let arr = [];
        let no = this.state.tbPlace.province.no;
        this.state.stakeholder.cityDatas[no].forEach(function(obj) {
            arr.push(obj.regionName);
        });
        this.setState({
            tbIsShow:true,
            tbOptions: arr,
            tbSelected: this.state.tbPlace.name,
            tbClickHandle: this.selectTbCity
        });
    }

    //关闭选择器
    tbClickClose() {
        this.setState({
            tbIsShow:false,
        });
    }

    //选择省操作
    selectTbProvince(index) {
        let pro = this.state.stakeholder.provinceDatas[index];
        let obj = {
            name: pro.provinceName,
            no: pro.provinceNo
        }
        if (obj.no !== this.state.tbPlace.province.no) {
            InsuranceActionCreators.changeTbCity({name:'', no: ''});
        }
        InsuranceActionCreators.changeTbProvince(obj);
    }

    //通过index选择市
    selectTbCity(index) {
        let no = this.state.tbPlace.province.no;
        let city = this.state.stakeholder.cityDatas[no][index];
        let obj = {
            name: city.regionName,
            no: city.regionNo
        }
        InsuranceActionCreators.changeTbCity(obj);
        CarActionCreators.changeDefaultPlate(obj.no);
    }

    //新车未上牌，直接跳转下个页面
    isNewCar() {
        if (this.state.tbPlace.city.name === '') {
            alert('请先选择投保城市')
        } else {
            AppActionCreators.stepNext();
            CarActionCreators.updateIsNewCar(true);  
        }
    }

    //更改车牌
    updatePlateNum(event) {
        CarActionCreators.updatePlateNum(event);
        let val = event.target.value.trim().toUpperCase();
        if (val.length === 6  && /^[A-Z]/.test(val)) {
            let plateNo = this.state.provinceShort + val;
            APIUtils.getOwnerInfo(plateNo);
        }
    }

    //点击下一步
    nextStep() {
        if (!this.state.tbPlace.city.name) {
            alert('请选择投保城市')
        } else {
            APIUtils.cardInfo();
            CarActionCreators.updateIsNewCar(false);
        }
    };

    render() {
        if (!this.props.isCurrent) {
            return null;
        };

        return (
            <div className="index_desk">
                <img className="banner" src={ctx + '/static/img/carInf/banner.png'} />
                <ul className="index_ul">
                    <li>7座以下私家车
                        <span className="selections" onClick={CarActionCreators.switchIsHome}>
                            <label className={this.state.isHome? 'selected' : ''}>是</label>
                            <label className={this.state.isHome? '' : 'selected'}>否</label>
                        </span>
                    </li>
                    <li>投保地区
                        <span className="selections">
                            <input className="select_toubao" placeholder="请选择省" readOnly="readOnly" value={this.state.tbPlace.province.name}/>
                            <input className="select_toubao" placeholder="请选择市" readOnly="readonly" value={this.state.tbPlace.city.name} onClick={this.clickTbCity}/>
                        </span>
                    </li>
                    <li>
                        <label className="item_name">车&nbsp;&nbsp;牌</label>
                        <input type="text" placeholder="省份" readOnly="readonly" className="select_province" value={this.state.provinceShort} onClick={this.switchSelector}></input>
                        <input type="text" placeholder="车牌号" className="info_input car_num" value={this.state.plateNum} onChange={this.updatePlateNum}/>
                        <label className="new_car" onClick={this.isNewCar}><span>未上牌</span></label>
                    </li>
                    <li>
                        <label className="item_name">车主名</label>
                        <input type="text" placeholder="请输入车主名" className="info_input" value={this.state.name} onChange={CarActionCreators.updateName} />
                    </li>
                    <li>
                        <label className="item_name">证件号</label>
                        <input type="text" placeholder="请输入车主证件号" className="info_input" value={this.state.idCard} onChange={CarActionCreators.updateIdCard} />
                    </li>
                    <button type="button" className="next" onClick={this.nextStep}>下一步</button>
                </ul>
                <ProvinceSelector isShow={this.state.isShow} selectedShort={this.state.provinceShort} switchSelector={this.switchSelector}/>
                <LiSelector 
                    isShow={this.state.tbIsShow} 
                    options={this.state.tbOptions} 
                    selected={this.state.tbSelected}
                    clickClose={this.tbClickClose}
                    clickHandle={this.state.tbClickHandle}
                    />
            </div>
        );
    };
}
