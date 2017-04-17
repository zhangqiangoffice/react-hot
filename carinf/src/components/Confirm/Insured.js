import React, {Component} from 'react';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';

export default class out extends Component {

    render() {

        return (
            <div className="insured">
                <div className="item_title">被保人信息</div>
                <ul>
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
