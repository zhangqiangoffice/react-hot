import React, {Component} from 'react';
import { queryAddress } from '../APIUtils';
import { Icon } from 'antd-mobile';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import { Toast } from 'antd-mobile';
import style from '../asset/css/Confirm.less';


export default class out extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            phone: '',
            address: '',
        };
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
        let cb = msg => {
            if (msg.result === 1) {
                let obj = null;
                msg.list.map((ele, index) => {
                    if (ele.isDefault === '1') {
                        obj = ele;
                    }
                })
                if (obj) {
                    this.setState({
                        name: obj.name,
                        phone: obj.phone,
                        address: obj.provinceName + obj.regionName + obj.countyName + obj.address,
                    })
                    InsuranceActionCreators.updateStakeholderAddress(obj)
                }
            }else{
                Toast.fail(msg.message, 1);
            }
        } 
        queryAddress(cb);
    };

    render() {
        return (
            <div className={style.distribution}>
                <div className="item_title">
                    <Icon type={require('../asset/svg/distribution.svg')} />
                    保单配送
                </div>
                {this.state.name ?
                    <ul className="blank_ul">
                        <li>
                            <label>配送方式</label>
                            <span>快递</span>
                        </li>

                        <li onClick={this.quoteAddress}>
                            <label>收件人</label>
                            <span>{this.state.name}<span className={style.phone}>{this.state.phone}</span></span>
                        </li>
                        <li onClick={this.quoteAddress} className={style.address_li}>
                            <label>收件地址</label>
                            <span>{this.state.address}</span>
                        </li>
                    </ul>
                    :
                    <ul className="blank_ul">
                        <li>
                            <label>配送方式</label>
                            <span>快递</span>
                        </li>

                        <li onClick={this.addAddress}>
                            <label>添加联系人</label>
                            <img className={style.open} src={require('../asset/img/right_arrow.png')} />
                        </li>
                    </ul>
                }
            </div>
        );
    };
}
