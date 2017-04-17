import React, {Component} from 'react';
import CarActionCreators from '../../actions/CarActionCreators';
import DatePic from '../public/DatePic';

export default class CarInfo extends Component {
    
    render() {
        return (
            <ul className="info_ul">
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
                <DatePic title="注册日期" 
                    theDate={this.props.registerDate} 
                    minDate="2005-01-01" 
                    maxDate={new Date()}
                    onChangeDate={CarActionCreators.changeRegisterDate}
                />
            </ul>
        );
    };
}
