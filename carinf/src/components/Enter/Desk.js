import React, {Component} from 'react';
import Home from './Home';
import Place from './Place';
import CarNum from './CarNum';
import OwnerName from './OwnerName';
import OwnerCard from './OwnerCard';
import ProvinceSelector from '../ProvinceSelector';
import APIUtils from '../APIUtils';
import CarStore from '../../stores/CarStore';
import InsuranceStore from '../../stores/InsuranceStore';

import { Link } from 'react-router'
import { Toast } from 'antd-mobile';

export default class IndexDesk extends Component {
    constructor(props) {
        super(props);

        this.state = {
            plateNo: CarStore.getPlateNo(),
            name: CarStore.getName(),
            idCard: CarStore.getIdCard(),
            tbPlace: InsuranceStore.getTbPlace(),

        };

        this.onCarChange = this.onCarChange.bind(this);
        this.nextStep = this.nextStep.bind(this);

    };

    onCarChange() {
        this.setState({
            plateNo: CarStore.getPlateNo(),
            name: CarStore.getName(),
            idCard: CarStore.getIdCard(),
            tbPlace: InsuranceStore.getTbPlace(),
        });
    }

    componentDidMount() {      
        CarStore.addChangeListener(this.onCarChange);
        InsuranceStore.addChangeListener(this.onCarChange);
    };

    componentWillUnmount() {
        CarStore.removeChangeListener(this.onCarChange);
        InsuranceStore.removeChangeListener(this.onCarChange);
    };

    //点击下一步
    nextStep() {
        if (!this.state.tbPlace.city.name) {
            Toast.info('请选择投保城市', 2)
        } else {
            APIUtils.cardInfo();
        }
    };

    render() {
        const m0 = {
            marginTop: '0',
        }
        const spanStyle = {
            color: '#ba1e17',
            float: 'right',
            margin: '0.5rem 1rem 0 0'
        }

        return (
            <div className="index_desk" style={m0}>
                <ul className="index_ul">
                    <Home />
                    <Place province={this.state.tbPlace.province} city={this.state.tbPlace.city}/>
                    <CarNum num={this.state.plateNo}/>
                    <OwnerName name={this.state.name} />
                    <OwnerCard idCard={this.state.idCard} />
                    
                    <Link to="/recent"><span style={spanStyle}>最近询价车辆</span></Link>
                    
                    <button type="button" className="next" onClick={this.nextStep}>下一步</button>
                </ul>
            </div>
        );
    };
}
