import React, {Component} from 'react';
import SelectorProvince from '../public/SelectorProvince'
import SelectorCity from '../public/SelectorCity'
import CarActionCreators from '../../actions/CarActionCreators';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import { Toast } from 'antd-mobile';

export default class IndexDesk extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowProvinces: false,
            isShowCities: false, 
        };

        this.showTbProvinceSelector = this.showTbProvinceSelector.bind(this);
        this.showTbCitySelector = this.showTbCitySelector.bind(this);
        this.selectTbProvince = this.selectTbProvince.bind(this);
        this.onClose = this.onClose.bind(this)

    };
    
    //展示省选择器
    showTbProvinceSelector() {
        //目前只支持安徽省
        Toast.info('目前只支持安徽省!', 2);

        // this.setState({
        //     isShowProvinces: true,
        //     isShowCities: false,
        // });
    }

    //显示城市选择器
    showTbCitySelector() {
        if (this.props.province.no) {
            this.setState({
                isShowProvinces:false,
                isShowCities: true,
            });
        } else {
            Toast.info('请先选择省份!', 2);
        }
    }

    
    //选择省操作
    selectTbProvince(province) {
        if (province.name !== this.props.province.name) {
            InsuranceActionCreators.changeTbCity({name:'', no: ''});
        }
        InsuranceActionCreators.changeTbProvince(province);
    }

    //关闭选择器
    onClose() {
        this.setState({
            isShowProvinces: false,
            isShowCities: false,
        })
    }

    //选择市
    selectTbCity(city) {
        if (city.name !== '合肥市') {
            Toast.info('目前只支持合肥市!', 2);
        } else {
            InsuranceActionCreators.changeTbCity(city);
            CarActionCreators.changeDefaultPlate(city.no);
        }
    }

    render() {
        return (
            <li className="li">
                <label className="item_name">投保地区</label>
                <span className="selections">
                    <input className="select_toubao" placeholder="请选择省" readOnly="readOnly" value={this.props.province.name} onClick={this.showTbProvinceSelector} />
                    <input className="select_toubao" placeholder="请选择市" readOnly="readonly" value={this.props.city.name} onClick={this.showTbCitySelector}/>
                </span>
                <SelectorProvince
                    isShow={this.state.isShowProvinces} 
                    selected={this.props.province.name} 
                    onClose={this.onClose} 
                    onSelect={this.selectTbProvince}/>
                <SelectorCity
                    isShow={this.state.isShowCities} 
                    pro={this.props.province.no} 
                    selected={this.props.city.name} 
                    onClose={this.onClose} 
                    onSelect={this.selectTbCity}/>
            </li>
        );
    };
}
