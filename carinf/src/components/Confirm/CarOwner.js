import React, {Component} from 'react';
import CarStore from '../../stores/CarStore';

export default class out extends Component {
    render() {
        return (
            <div className="car_owner">
                <div className="item_title">车主信息</div>
                <ul>
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
