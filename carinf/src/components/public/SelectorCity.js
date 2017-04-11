import React, {Component} from 'react';
import SelectorInLine from './SelectorInLine';
import InsuranceStore from '../../stores/InsuranceStore';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import { Toast } from 'antd-mobile';
import APIUtils from '../APIUtils';

export default class Loading extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: ['正在加载城市列表'],
        };

        this.onSelect = this.onSelect.bind(this)
        this.getCityString = this.getCityString.bind(this)

    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.isShow) {
        let cityData = InsuranceStore.getStakeholder().cityDatas[nextProps.pro]
        if (!cityData) {
            let cb = (msg) => {
                InsuranceActionCreators.updateCityDatas(nextProps.pro, msg);
                this.getCityString(msg);
                Toast.hide();
            }
            Toast.loading('加载中...', 0);
            APIUtils.getCitiesList(nextProps.pro, cb);
        } else {
            this.getCityString(cityData)
        }
      }
    }

    getCityString(list) {
        let arr = list.map((ele, index) => {
            return ele.regionName
        })
        this.setState({
            options: arr,
        })
    }

    onSelect(obj) {
        let city = InsuranceStore.getStakeholder().cityDatas[this.props.pro][obj.index];
        let result = {
            name: city.regionName,
            no: city.regionNo
        }
        this.props.onSelect(result)
    }

    render() {

        return (
            <SelectorInLine 
                isShow={this.props.isShow} 
                options={this.state.options} 
                selected={this.props.selected} 
                onClose={this.props.onClose} 
                onSelect={this.onSelect}/>
        );
    };
}