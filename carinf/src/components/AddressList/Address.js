import React, {Component} from 'react';
import APIUtils from '../APIUtils';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';

export default class Company extends Component {
    constructor(props){
        super(props);

        this.carAddressDelete = this.carAddressDelete.bind(this);
        this.toEdit = this.toEdit.bind(this);
        this.choiceAddress = this.choiceAddress.bind(this)
    };

    carAddressDelete(e) {
        e.stopPropagation();
        if(confirm('您确定删除此地址？')) {
            AppActionCreators.startAlertProgress();    
            let data = {
                id: this.props.address.id,
                workNum: AppStore.getWorkNum(),
            };

            let cb = msg => {
                if (msg.result === 1) {
                    AppActionCreators.finishAlertProgress();
                    this.props.deleteAddress(this.props.index)
                }else{
                    AppActionCreators.messageAlertProgress(msg.message);
                }
            }
            APIUtils.carAddressDelete(data, cb)
        }
    };

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
                alert(msg.message);
            }
        }

        APIUtils.carAddressDefault(data, cb);
    }

    render() {
        const address = this.props.address;

        return (
            <li onClick={this.choiceAddress}>
                <div className="lay">{address.name} <span className="phone" >{address.phone}</span></div>
                <div className="lay">{address.provinceName}{address.regionName}{address.countyName}{address.address}</div>
                <div className="last_lay" >
                    <img className="radio" src={require(`../asset/img/radio_${address.isDefault === '1' ? 'on' : 'off'}.png`)} />
                    &nbsp;&nbsp;默认地址 
                    <div className="btns">
                        <button type="button" className="btn" onClick={this.toEdit}>编辑</button>
                        <button type="button" className="btn" onClick={this.carAddressDelete}>删除</button>
                    </div>
                </div>
            </li>
        );
    };
}
