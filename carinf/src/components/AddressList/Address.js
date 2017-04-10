import React, {Component} from 'react';

import APIUtils from '../APIUtils';
import zAJAX from 'z-ajax'
import SelectorRadio from '../public/SelectorRadio';
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
            this.props.changeIsLoading();
            let data = {
                id: this.props.address.id,
                workNum: APIUtils.getUrlParam('workNum'),
            };

            let cb = msg => {
                this.props.changeIsLoading();
                if (msg.result === 1) {
                    this.props.deleteAddress(this.props.index)
                }else{
                    alert(msg.message);
                }
            } 

            zAJAX(`${ctx}/carInf/carAddressDelete`, data, cb)
        }
    };

    //打开编辑页面
    toEdit(e) {
        e.stopPropagation();
        window.location = `#/addressEdit/${this.props.address.id}/${this.props.address.name}/${this.props.address.phone}/${this.props.address.provinceName}/${this.props.address.regionName}/${this.props.address.countyName}/${this.props.address.address}/${this.props.address.county}`
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
            workNum: APIUtils.getUrlParam('workNum'),
        };

        let cb = msg => {
            if (msg.result === 1) {
                window.location = '#/confirm'
            } else {
                alert(msg.message);
            }
        } 

        zAJAX(`${ctx}/carInf/carAddressDefault`, data, cb)
    }

    render() {
        const liStyle = {
            borderBottom: '1px solid #ccc',
            borderTop: '1px solid #ccc',
            marginBottom: '1rem',
            background: '#fff',
        };
        const divStyle = {
            padding: '0.5rem 1rem 0',
        };
        const lastDivStyle = {
            padding: '0.5rem 1rem 0.5rem',
            borderTop: '1px solid #ccc',
            marginTop: '0.5rem',
        };
        const fr = {
            float: 'right',
        };
        const buttonStyle = {
            background: '#fff',
            border: '0',
            padding: '0 1.5rem',
        };
        const sDivStyle = {
            dispaly: 'inline-block',
        };
        const imgStyle = {
            height: '2rem',
            width: 'auto',
            verticalAlign: 'middle',
        }

        return (
            <li style={liStyle} onClick={this.choiceAddress}>
                <div style={divStyle}>{this.props.address.name} <span style={fr}>{this.props.address.phone}</span></div>
                <div style={divStyle}>{this.props.address.provinceName}{this.props.address.regionName}{this.props.address.countyName}{this.props.address.address}</div>
                <div  style={lastDivStyle} >
                    <img style={imgStyle} src={ctx + '/static/img/carInf/radio_' + (this.props.address.isDefault === '1' ? 'on' : 'off') + '.png'} />
                    &nbsp;&nbsp;默认地址 
                    <div style={fr}>
                        <button type="button" style={buttonStyle} onClick={this.toEdit}>编辑</button>
                        <button type="button" style={buttonStyle} onClick={this.carAddressDelete}>删除</button>
                    </div>
                </div>
            </li>
        );
    };
}
