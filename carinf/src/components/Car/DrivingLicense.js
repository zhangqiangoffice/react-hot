import React, {Component} from 'react';

import CarStore from '../../stores/CarStore';
import CarActionCreators from '../../actions/CarActionCreators';
import DatePic from '../public/DatePic';

export default class CarInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registerDate: CarStore.getRegisterDate(),
            vin: CarStore.getVin(),
            engineNo: CarStore.getEngineNo(),
            brandModel: CarStore.getBrandModel(),
        };

        this.onCarChange = this.onCarChange.bind(this);
        
    };

    onCarChange() {
        this.setState({
            registerDate: CarStore.getRegisterDate(),
            vin: CarStore.getVin(),
            engineNo: CarStore.getEngineNo(),
            brandModel: CarStore.getBrandModel(),
        });
    }

    componentDidMount() {      
        CarStore.addChangeListener(this.onCarChange);
    };

    componentWillUnmount() {
        CarStore.removeChangeListener(this.onCarChange);
    };
    
    render() {
        return (
            <ul className="info_ul">
                <li>
                    <label>车架号</label>
                    <input type="text" placeholder="请输入" value={this.state.vin} onChange={CarActionCreators.updateVin}/>
                </li>
                <li>
                    <label>发动机号</label>
                    <input type="text" placeholder="请输入" value={this.state.engineNo} onChange={CarActionCreators.updateEngineNo}/>
                </li>
                <li>
                    <label>品牌型号</label>
                    <input type="text" placeholder="请输入" value={this.state.brandModel} onChange={CarActionCreators.updateBrandModel}/>
                </li>
                <li>
                    <label style={{verticalAlign: 'top'}}>注册日期</label>
                    <div style={{display: 'inline-block'}}>
                        <DatePic title="注册日期" theDate={this.state.registerDate} minDate="2005-01-01" maxDate={new Date()}
                            onChangeDate={CarActionCreators.changeRegisterDate}
                        />
                    </div>
                </li>
            </ul>
        );
    };
}
