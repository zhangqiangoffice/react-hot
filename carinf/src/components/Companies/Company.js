import React, {Component} from 'react';

import AppStore from '../../stores/AppStore';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';

import APIUtils from '../APIUtils';

export default class Company extends Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    };

    
    handleClick() {
        let id = this.props.company.id;
        
        InsuranceActionCreators.updateInsuranceCom(id); 
        //太平洋车险要跳转到单独页面
        if (id === 1) {
            if (window.minsheng) {
                window.minsheng.turnToActivity('太平洋车险', `http://ecoop.idoutec.cn/wechatgateway/basic/auth?channel=H5_DBB_MSDL&state=car&userid=${AppStore.getWorkNum()}`);
            } else {
                window.location = '#/subFrame'
            }
        } else {
            window.location = '#/enter'      
        }
    }

    render() {
        let company = this.props.company;
        return (
            <li onClick={this.handleClick}>
                <img src={`${ctx}/static/img/carInf/pic_${company.spell}.png`} />
                <section>
                    <p className="title">{company.product}</p>
                    <p className="content">{company.info}</p> 
                    <img src={`${ctx}/static/img/carInf/logo_${company.spell}.png`} />
                </section>
                <i className="clear"></i>
            </li>
        );
    };
}
