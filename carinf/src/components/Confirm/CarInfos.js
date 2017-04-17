import React, {Component} from 'react';
import CarStore from '../../stores/CarStore';

export default class out extends Component {
    render() {
        return (
            <div className="car_infos">
                <div className="item_title">车辆信息</div>
                <ul>
                    <li>
                        <label>车牌号码</label>
                        {CarStore.getPlateNo()}
                    </li>
                    <li>
                        <label>品牌型号</label>
                        {CarStore.getBrandModel()}
                    </li>
                    <li>
                        <label>车架号</label>
                        {CarStore.getVin()}
                    </li>
                    <li>
                        <label>发动机号</label>
                        {CarStore.getEngineNo()}
                    </li>
                    <li>
                        <label>注册日期</label>
                        {CarStore.getRegisterDate()}
                    </li>
                    <li>
                        <label>是否过户</label>
                        {CarStore.getIsTransferOwnership() === 1 ? '是' : '否'}
                    </li>
                </ul>
            </div>
        );
    };
}
