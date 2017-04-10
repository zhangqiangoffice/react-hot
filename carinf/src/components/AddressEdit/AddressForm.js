import React, {Component} from 'react';
import LiText from '../public/LiText';
import LiNumber from '../public/LiNumber';
import LiClick from '../public/LiClick';
import SelectorInLine from '../public/SelectorInLine';
import ButtonBottom from '../public/ButtonBottom';

import APIUtils from '../APIUtils';
import zAJAX from 'z-ajax'
import assign from 'object-assign';

export default class TitleBar extends Component {
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

            provinceData: [],
            regionData: {},
            countyData: {}, 

            selectorIsShow: false,
            selectorFor: '',
            selectorOptions: [],
            selectorSelected: '',
        };

        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangePhone = this.handleChangePhone.bind(this)
        this.handleChangeAddress = this.handleChangeAddress.bind(this)
        this.clickProvince = this.clickProvince.bind(this)
        this.clickRegion = this.clickRegion.bind(this)
        this.clickCounty = this.clickCounty.bind(this)

        this.showSelector = this.showSelector.bind(this)
        this.closeSelector = this.closeSelector.bind(this)
        this.selectorClick = this.selectorClick.bind(this)
        this.saveData = this.saveData.bind(this)
    };

    componentDidMount() {      
        //初始化省份数据
        this.initProvinceData()

        //如果是编辑状态，还有获取已选市县的数据
        if (this.state.id) {
            this.getListByNo(this.state.provinceNo, 'region')
            this.getListByNo(this.state.regionNo, 'county')
        }
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

    //展示选择框
    showSelector(item) {
        let options = [];
        switch(item) {
            case 'province':
                options = this.state.provinceData.map((pro, index) => {
                    return pro.provinceName
                });
                break;
            case 'region':
                options = this.state.regionData[this.state.provinceNo].map((region, index) => {
                    return region.regionName
                });
                break;
            case 'county':
                options = this.state.countyData[this.state.regionNo].map((county, index) => {
                    return county.countyName
                });
                break;
            default :
                break;
        }
        this.setState({
            selectorIsShow: true,
            selectorFor: item,
            selectorOptions: options,
            selectorSelected: this.state[item],
        })
        
    }

    //关闭选择框
    closeSelector() {
        this.setState({
          selectorIsShow: false,
          selectorOptions: [],
          selectorSelected: '',
        });
    };

    //从后台获取省份列表
    initProvinceData() {
        const cb = (msg) => {
            this.setState({
                provinceData: msg,
            });
        }
        zAJAX(`${ctx}/webService/province`, null, cb)
    }

    //点击选择省,展示省列表
    clickProvince() {
        if (this.state.provinceData) {
            this.showSelector('province')
        } else {
            initProvinceData()
        }
    };

    clickRegion() {
        const no = this.state.provinceNo;
        if (!no) {
            alert('请先选择省');
        } else if (!this.state.regionData[no]){
            this.getListByNo(no, 'region')
        } else {
            this.showSelector('region');
        }
    };

    clickCounty() {
        let no = this.state.regionNo;
        if (!no) {
            alert('请先选择市');
        } else if (!this.state.countyData[no]) {
            this.getListByNo(no, 'county')
        } else {
            this.showSelector('county')
        }
    };

    //点击选择框选择省市县
    selectorClick(obj) {
        let no = '';
        switch(this.state.selectorFor) {
            case 'province':
                no = this.state.provinceData[obj.index].provinceNo;
                this.getListByNo(no, 'region');
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
                no = this.state.regionData[this.state.provinceNo][obj.index].regionNo;
                this.getListByNo(no, 'county');
                if (no !== this.state.regionNo) {
                    this.setState({
                      county: '',
                      countyNo: '',
                    });
                }
                break;
            case 'county' :
                no = this.state.countyData[this.state.regionNo][obj.index].countyNo;
            default:
                break;
        }
        this.setState({
          [this.state.selectorFor]: obj.text,
          [this.state.selectorFor + 'No']: no,
        });
    };

    //从后台请求市、县数据
    getListByNo(no, target) {
        const cb = (msg) => {
            this.setState(prevState => ({
              [`${target}Data`]: assign({}, prevState[`${target}Data`], {[no] : msg})
            }));
        }
        zAJAX(`${ctx}/webService/${target}`, {id: no}, cb)
    }

    //点击保存
    saveData() {
        this.props.changeIsLoading();
        const cb = (msg) => {
            this.props.changeIsLoading();
            if (msg.result === 1) {
                window.location = '#/addressList'
            } else {
                alert(msg.message)
            }
        }
        const data = {
            id: this.state.id,     //地址id
            workNum: APIUtils.getUrlParam('workNum'),        //
            name: this.state.name,       //收件人姓名
            phone: this.state.phone,      //收件人手机号
            province: this.state.provinceNo,        //省级代码
            region: this.state.regionNo,     //市区代码
            county: this.state.countyNo,     //县区代码
            address: this.state.address,     //收货地址

        }

        zAJAX(`${ctx}/carInf/operationCarAddress`, data, cb)
    };


    render() {
        const ulStyle = {
            backgroundColor: '#fff',
            borderTop: '1px solid #ccc',
            marginTop: '5rem',
        };
        
        return (
            <div>
                <ul style={ulStyle}>
                    <LiText item="收件人" val={this.state.name} onChangeVal={this.handleChangeName}/>
                    <LiNumber item="联系电话" val={this.state.phone} onChangeVal={this.handleChangePhone}/>
                    <LiClick item="收件省" val={this.state.province} onClickHandle={this.clickProvince}/>
                    <LiClick item="收件市" val={this.state.region} onClickHandle={this.clickRegion}/>
                    <LiClick item="收件区县" val={this.state.county} onClickHandle={this.clickCounty}/>
                    <LiText item="详细地址" val={this.state.address} onChangeVal={this.handleChangeAddress}/>
                </ul>
                <ButtonBottom text='保存' onClickHandle={this.saveData}/>
                <SelectorInLine 
                    isShow={this.state.selectorIsShow} 
                    options={this.state.selectorOptions} 
                    selected={this.state.selectorSelected} 
                    onClose={this.closeSelector}
                    onSelect={this.selectorClick}
                    />
            </div>
        );
    };
}