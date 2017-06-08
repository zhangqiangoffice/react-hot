import React, {Component} from 'react';
import { Icon } from 'antd-mobile';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';

export default class out extends Component {

    render() {

        return (
            <div>
                <div className="item_title">
                    <Icon type={require('../asset/svg/insured.svg')} />
                    被保人信息
                </div>
                <ul className="blank_ul">
                    <li>
                        <label>姓名</label>
                        <input type="text" placeholder="请输入" value={this.props.stakeholder.bbrName} onChange={(event, type) => {InsuranceActionCreators.handleChange(event, 'bbrName')}}/>
                    </li>
                    <li>
                        <label>身份证号</label>
                        <input type="text" placeholder="请输入" value={this.props.stakeholder.bbrNo} onChange={(event, type) => {InsuranceActionCreators.handleChange(event, 'bbrNo')}}/>
                    </li>
                    <li>
                        <label>手机号</label>
                        <input type="number" placeholder="请输入" value={this.props.stakeholder.bbrPhone} onChange={(event, type) => {InsuranceActionCreators.handleChange(event, 'bbrPhone')}}/>
                    </li>
                </ul>
            </div>
        );
    };
}
