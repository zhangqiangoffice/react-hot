import React, {Component} from 'react';
import CarActionCreators from '../../actions/CarActionCreators';
import { DatePicker } from 'antd-mobile';
import moment from 'moment';


export default class CarInfo extends Component {
    
    render() {
        return (
            <ul className="blank_ul">
                <li>
                    <label>车架号</label>
                    <input type="text" placeholder="请输入" value={this.props.vin} onChange={CarActionCreators.updateVin}/>
                </li>
                <li>
                    <label>发动机号</label>
                    <input type="text" placeholder="请输入" value={this.props.engineNo} onChange={CarActionCreators.updateEngineNo}/>
                </li>
                <li>
                    <label>品牌型号</label>
                    <input type="text" placeholder="请输入" value={this.props.brandModel} onChange={CarActionCreators.updateBrandModel}/>
                </li>
                <li>
                    <DatePicker 
                          mode="date"
                          maxDate={moment()}
                          title="注册日期"
                          value={this.props.registerDate === '' ? moment() : moment(this.props.registerDate)}
                          onChange={val => CarActionCreators.changeRegisterDate(moment(val).format('YYYY-MM-DD'))}
                        >
                        <div>
                            <label>注册日期</label>
                            <input type="text" placeholder="请选择" 
                                readOnly="readonly"
                                value={this.props.registerDate}
                                />
                        </div>
                    </DatePicker>
                </li>
            </ul>
        );
    };
}
