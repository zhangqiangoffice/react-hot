import React, {Component} from 'react';
import CarStore from '../../stores/CarStore';
import { Icon } from 'antd-mobile';

export default class out extends Component {
    render() {
        return (
            <div>
                <div className="item_title">
                    <Icon type={require('../asset/svg/owner.svg')} />
                    车主信息
                </div>
                <ul className="blank_ul">
                    <li>
                        <label>姓名</label>
                        {CarStore.getName()}
                    </li>
                    <li>
                        <label>身份证号</label>
                        {CarStore.getIdCard()}
                    </li>
                </ul>
            </div>
        );
    };
}
