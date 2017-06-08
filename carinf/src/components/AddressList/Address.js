import React, {Component} from 'react';
import { carAddressDelete, carAddressDefault } from '../APIUtils';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import AppStore from '../../stores/AppStore';
import AppActionCreators from '../../actions/AppActionCreators';
import { Modal, Toast } from 'antd-mobile';
import style from '../asset/css/AddressList.less'

const alert = Modal.alert;

export default class Out extends Component {
    constructor(props){
        super(props);

        this.carAddressDelete = this.carAddressDelete.bind(this);
        this.toEdit = this.toEdit.bind(this);
        this.choiceAddress = this.choiceAddress.bind(this)
    };

    carAddressDelete(e) {
        e.stopPropagation();
        alert('删除', '确定删除么???', [
          { text: '取消'},
          { text: '确定', onPress: () => this.postDeleteAddress(), style: { fontWeight: 'bold' } },
        ])
    };

    postDeleteAddress() {
        this.props.deleteAddress(this.props.index)
        carAddressDelete(this.props.address.id)

    }

    //打开编辑页面
    toEdit(e) {
        e.stopPropagation();
        const address = this.props.address;
        window.location = `#/addressEdit/${address.id}/${address.name}/${address.phone}/${address.provinceName}/${address.regionName}/${address.countyName}/${address.address}/${address.county}`
    }

    //选择了其中一个地址
    choiceAddress() {
        this.setDefault()
        InsuranceActionCreators.updateStakeholderAddress(this.props.address)
    }

    //通知后台设置默认地址
    setDefault() {
        let data = {
            id: this.props.address.id,
            workNum: AppStore.getWorkNum(),
        };

        let cb = msg => {
            if (msg.result === 1) {
                window.location = '#/confirm'
            } else {
                Toast.fail(msg.message, 1);
            }
        }

        carAddressDefault(data, cb);
    }

    render() {
        const address = this.props.address;

        return (
            <li onClick={this.choiceAddress}>
                <div className={style.lay}>{address.name} <span className={style.phone} >{address.phone}</span></div>
                <div className={style.lay}>{address.provinceName}{address.regionName}{address.countyName}{address.address}</div>
                <div className={style.last_lay} >
                    <img className={style.radio} src={require(`../asset/img/radio_${address.isDefault === '1' ? 'on' : 'off'}.png`)} />
                    &nbsp;&nbsp;默认地址 
                    <div className={style.btns}>
                        <button type="button" className={style.btn} onClick={this.toEdit}>编辑</button>
                        <button type="button" className={style.btn} onClick={this.carAddressDelete}>删除</button>
                    </div>
                </div>
            </li>
        );
    };
}
