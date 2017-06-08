import React, {Component} from 'react';
import { Icon } from 'antd-mobile';
import InsuranceStore from '../../stores/InsuranceStore';

export default class out extends Component {

    render() {

        return (
            <div>
                <div className="item_title">
                    <Icon type={require('../asset/svg/date.svg')} />
                    保险起期
                </div>
                <ul className="blank_ul">
                    <li>
                        <label>交强险</label>
                        {InsuranceStore.getTraBeginDate()}
                    </li>
                    <li>
                        <label>商业险</label>
                        {InsuranceStore.getBeginDate()}
                    </li>
                </ul>
            </div>
        );
    };
}
