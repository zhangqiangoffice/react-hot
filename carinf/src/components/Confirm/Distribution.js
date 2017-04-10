import React, {Component} from 'react';
import APIUtils from '../APIUtils';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';

import zAJAX from 'z-ajax'

export default class out extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            phone: '',
            province: '',
            city: '',
            county: '',
            address: '',

        };

        this.quoteAddress = this.quoteAddress.bind(this);
        this.addAddress = this.addAddress.bind(this);
    };

    componentDidMount() {      
        this.getAddress();
    };

    //跳转到地址列表页面
    quoteAddress() {
        window.location = '#/addressList'
    }

    //添加地址
    addAddress() {
        window.location = '#/addressEdit'
    }

    //获取邮寄地址列表
    getAddress () {
        let data = {
            workNum: APIUtils.getUrlParam('workNum'),
        };

        let cb = msg => {

            if (msg.result === 1) {
                const obj = msg.list.find((ele, index) => {
                    return ele.isDefault === '1'
                })

                this.setState({
                    name: obj.name,
                    phone: obj.phone,
                    province: obj.provinceName,
                    city: obj.regionName,
                    county: obj.countyName,
                    address: obj.address,
                })

                InsuranceActionCreators.updateStakeholderAddress(obj)

            }else{
                alert(msg.message);
            }
        } 

        zAJAX(`${ctx}/carInf/queryAddress`, data, cb)
    };



    render() {
        const fr = {
            float: 'right',
        }

        const liStyle ={
            minHeight: '2rem',
            height: 'auto',
            lineHeight: '1.8rem',
            padding: '1.5rem 1rem',

        }
        return (
            <div className="distribution">
                <div className="item_title">保单配送</div>
                {this.state.name ?
                    <ul>
                        <li>
                            <label>配送方式</label>
                            <span>快递</span>
                        </li>

                        <li onClick={this.quoteAddress}>
                            <label>收件人</label>
                            <span>{this.state.name}<span style={fr}>{this.state.phone}</span></span>
                        </li>
                        <li onClick={this.quoteAddress} style={liStyle}>
                            <label>收件地址</label>
                            <span>{this.state.province}{this.state.city}{this.state.county}{this.state.address}</span>
                        </li>
                    </ul>
                    :
                    <ul>
                        <li>
                            <label>配送方式</label>
                            <span>快递</span>
                        </li>

                        <li onClick={this.addAddress}>
                            <label>添加联系人</label>
                        </li>
                    </ul>
                }
            </div>
        );
    };
}
