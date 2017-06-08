import React, {Component} from 'react';
import CarStore from '../../stores/CarStore';
import DrivingLicense from './DrivingLicense';
import Owner from './Owner';
import Transfer from './Transfer';

export default class CarInfo extends Component {
    constructor(props) {
        super(props);

        this.state = this.getData();

        this.onCarChange = this.onCarChange.bind(this);
        
    };

    getData() {
        return {
            name: CarStore.getName(),
            idCard: CarStore.getIdCard(),
            registerDate: CarStore.getRegisterDate(),
            isTransferOwnership: CarStore.getIsTransferOwnership(),
            issueDate: CarStore.getIssueDate(),
            vin: CarStore.getVin(),
            engineNo: CarStore.getEngineNo(),
            brandModel: CarStore.getBrandModel(),
            isNewCar: CarStore.getIsNewCar(),
        }
    }

    onCarChange() {
        this.setState(this.getData());
    }

    componentDidMount() {      
        CarStore.addChangeListener(this.onCarChange);
    };

    componentWillUnmount() {
        CarStore.removeChangeListener(this.onCarChange);
    };
    
    render() {

        return (
            <div>
                <DrivingLicense vin={this.state.vin}
                    engineNo={this.state.engineNo}
                    brandModel={this.state.brandModel}
                    registerDate={this.state.registerDate}
                />
                {this.state.isNewCar ? 
                    <Owner name={this.state.name} idCard={this.state.idCard}/> 
                : <Transfer isTransferOwnership={this.state.isTransferOwnership} issueDate={this.state.issueDate} />}
            </div>
        );
    };
}
