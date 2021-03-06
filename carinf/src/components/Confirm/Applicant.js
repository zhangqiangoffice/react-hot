import React, {Component} from 'react';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import { Icon } from 'antd-mobile';
import style from '../asset/css/Confirm.less'

export default class out extends Component {

    render() {

        return (
            <div>
                <div className="item_title">
                    <Icon type={require('../asset/svg/applicant.svg')} />
                    <label>投保人信息</label> 
                    <span className={this.props.stakeholder.sameAs ? style.sameAs : style.dontAs} onClick={InsuranceActionCreators.toggleSameAs}>同被保人</span>
                </div>
                <ul className={this.props.stakeholder.sameAs ? 'hide' : 'blank_ul'}>
                    <li>
                        <label>姓名</label>
                        <input type="text" placeholder="请输入" value={this.props.stakeholder.tbrName} onChange={(event, type) => {InsuranceActionCreators.handleChange(event, 'tbrName')}}/>
                    </li>
                    <li>
                        <label>身份证号</label>
                        <input type="text" placeholder="请输入" value={this.props.stakeholder.tbrNo} onChange={(event, type) => {InsuranceActionCreators.handleChange(event, 'tbrNo')}}/>
                    </li>
                    <li>
                        <label>手机号</label>
                        <input type="number" placeholder="请输入" value={this.props.stakeholder.tbrPhone} onChange={(event, type) => {InsuranceActionCreators.handleChange(event, 'tbrPhone')}}/>
                    </li>
                </ul>
            </div>
        );
    };
}
