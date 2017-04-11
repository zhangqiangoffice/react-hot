import React, {Component} from 'react';

import CarActionCreators from '../../actions/CarActionCreators';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import InsuranceStore from '../../stores/InsuranceStore';
import { Toast } from 'antd-mobile';
import ProvinceSelector from './ProvinceSelector';
import APIUtils from '../APIUtils';

export default class IndexDesk extends Component {
    constructor(props) {
        super(props);

        this.state = {
            provinceShort: this.props.num ? this.props.num.substr(0, 1) : '',
            plateNum: this.props.num ? this.props.num.substr(1) : '', 
            isShow: false,
        };

        this.switchSelector = this.switchSelector.bind(this);
        this.updatePlateNum = this.updatePlateNum.bind(this);

    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.num) {
        this.setState({
            provinceShort: nextProps.num.substr(0, 1) ,
            plateNum: nextProps.num.substr(1), 
        });
      }
    }
    
    //切换省简称选择器
    switchSelector() {
        this.setState({
            isShow: !this.state.isShow,
        });
    };

    //新车未上牌，直接跳转下个页面
    noNum() {
        if (InsuranceStore.getTbPlace().city.name === '') {
            Toast.info('请先选择投保城市', 2)
        } else {
            CarActionCreators.updateIsNewCar(true);  
            window.location = '#/car'
        }
    }

    //更改车牌
    updatePlateNum(event) {
        CarActionCreators.updatePlateNum(event);
        let val = event.target.value.trim().toUpperCase();
        if (val.length < 6) {
            this.setState({
                plateNum: val,
            })
        } else if (val.length === 6  && /^[A-Z]/.test(val)) {
            let plateNo = this.state.provinceShort + val;
            APIUtils.getOwnerInfo(plateNo);
        }
    }

    render() {
        return (
            <li className="li">
                <label className="item_name">车&nbsp;&nbsp;牌</label>
                <input type="text" placeholder="省份" readOnly="readonly" className="select_province" value={this.state.provinceShort} onClick={this.switchSelector}></input>
                <input type="text" placeholder="车牌号" className="info_input car_num" value={this.state.plateNum} onChange={this.updatePlateNum}/>
                <label className="new_car" onClick={this.noNum}><span>未上牌</span></label>
                <ProvinceSelector isShow={this.state.isShow} selectedShort={this.state.provinceShort} switchSelector={this.switchSelector}/>
            </li>
        );
    };
}
