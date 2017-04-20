import React, {Component} from 'react';
import LiText from '../public/LiText';
import LiNumber from '../public/LiNumber';
import LiClick from '../public/LiClick';
import ButtonBottom from '../public/ButtonBottom';
import SelectorProvince from '../public/SelectorProvince'
import SelectorCity from '../public/SelectorCity'
import SelectorCounty from '../public/SelectorCounty';

import { saveAddress } from '../APIUtils';
import { Toast } from 'antd-mobile';
import AppStore from '../../stores/AppStore';

export default class Out extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.params.id || '',
            name: this.props.params.name,   
            phone: this.props.params.phone,
            province: this.props.params.province,
            provinceNo: this.props.params.no ? this.props.params.no.substr(0, 2) + '0000' : '',
            region: this.props.params.region,
            regionNo: this.props.params.no ? this.props.params.no.substr(0, 4) + '00' : '',
            county: this.props.params.county,
            countyNo: this.props.params.no,
            address: this.props.params.address,

            isShowProvinces: false,
            isShowCities: false,
            isShowCounties: false,
            selectorFor: '',
        };

        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangePhone = this.handleChangePhone.bind(this)
        this.handleChangeAddress = this.handleChangeAddress.bind(this)
        this.clickProvince = this.clickProvince.bind(this)
        this.clickRegion = this.clickRegion.bind(this)
        this.clickCounty = this.clickCounty.bind(this)

        this.selectorClick = this.selectorClick.bind(this)
        this.postSaveAddress = this.postSaveAddress.bind(this)
        this.onClose = this.onClose.bind(this)
    };

    handleChangeName(text) {
        this.setState({
            name: text,
        });
    };

    handleChangePhone(text) {
        this.setState({
            phone: text,
        });
    };

    handleChangeAddress(text) {
        this.setState({
            address: text,
        });
    };

    //关闭选择器
    onClose() {
        this.setState({
            isShowProvinces: false,
            isShowCities: false,
            isShowCounties: false,
        })
    }

    //点击选择省,展示省列表
    clickProvince() {
        this.setState({
            isShowProvinces: true,
            selectorFor: 'province',
        });

    };

    clickRegion() {
        if (this.state.provinceNo) {
            this.setState({
                isShowCities: true,
                selectorFor: 'region',
            });
        } else {
            Toast.info('请先选择省份!', 2);
        }
    };

    clickCounty() {
        if (this.state.regionNo) {
            this.setState({
                isShowCounties: true,
                selectorFor: 'county',
            });
        } else {
            Toast.info('请先选择市!', 2);
        }

    };

    //点击选择框选择省市县
    selectorClick(obj) {
        let no = obj.no;
        switch(this.state.selectorFor) {
            case 'province':
                if (no !== this.state.provinceNo) {
                    this.setState({
                      region: '',
                      regionNo: '',
                      county: '',
                      countyNo: '',
                    });
                }
                break;
            case 'region':
                if (no !== this.state.regionNo) {
                    this.setState({
                      county: '',
                      countyNo: '',
                    });
                }
                break;
            default:
                break;
        }
        this.setState({
          [this.state.selectorFor]: obj.name,
          [this.state.selectorFor + 'No']: no,
        });
    };

    //点击保存
    postSaveAddress() {
        const data = {
            id: this.state.id,     //地址id
            workNum: AppStore.getWorkNum(),        //
            name: this.state.name,       //收件人姓名
            phone: this.state.phone,      //收件人手机号
            province: this.state.provinceNo,        //省级代码
            region: this.state.regionNo,     //市区代码
            county: this.state.countyNo,     //县区代码
            address: this.state.address,     //收货地址

        }
        saveAddress(data);
    };


    render() {
        return (
            <div>
                <ul className="address_form">
                    <LiText item="收件人" val={this.state.name} onChangeVal={this.handleChangeName}/>
                    <LiNumber item="联系电话" val={this.state.phone} onChangeVal={this.handleChangePhone}/>
                    <LiClick item="收件省" val={this.state.province} onClickHandle={this.clickProvince}/>
                    <LiClick item="收件市" val={this.state.region} onClickHandle={this.clickRegion}/>
                    <LiClick item="收件区县" val={this.state.county} onClickHandle={this.clickCounty}/>
                    <LiText item="详细地址" val={this.state.address} onChangeVal={this.handleChangeAddress}/>
                </ul>
                <ButtonBottom text='保存' onClickHandle={this.postSaveAddress}/>

                <SelectorProvince
                    isShow={this.state.isShowProvinces} 
                    selected={this.state.province} 
                    onClose={this.onClose} 
                    onSelect={this.selectorClick}/>

                <SelectorCity
                    isShow={this.state.isShowCities} 
                    pro={this.state.provinceNo} 
                    selected={this.state.region} 
                    onClose={this.onClose} 
                    onSelect={this.selectorClick}/>

                <SelectorCounty 
                    isShow={this.state.isShowCounties} 
                    city={this.state.regionNo} 
                    selected={this.state.county} 
                    onClose={this.onClose} 
                    onSelect={this.selectorClick}/>
            </div>
        );
    };
}