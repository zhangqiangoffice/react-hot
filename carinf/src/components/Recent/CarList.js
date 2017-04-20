import React, {Component} from 'react';
import AppActionCreators from '../../actions/AppActionCreators';
import Car from './Car';
import {queryOfferCar} from '../APIUtils';

export default class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carList: [],
        };
    };

    componentDidMount() {      
        this.getList();
    };

    //获取最近投保车辆列表
    getList() {
        AppActionCreators.startAlertProgress();

        let cb = msg => {
            if (msg.result === 1) {
                AppActionCreators.finishAlertProgress();
                if (msg.list.length) {
                    this.setState({
                        carList: [ ...msg.list]
                    })
                } else {
                    this.props.noRecent();
                }
            } else {
                AppActionCreators.messageAlertProgress(msg.message);
            }
        } 
        queryOfferCar(cb)
    };

    render() {

        let listShows = this.state.carList.map((car, index) => {
            return  <Car key={index} car={car}/>
        });

        return (
            <ul className="recent_list">
                {listShows}
            </ul>
        );
    };
}
