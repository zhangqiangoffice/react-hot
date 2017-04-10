import React, {Component} from 'react';

import AppActionCreators from '../../actions/AppActionCreators';
import Car from './Car';
import Loading from '../public/Loading';
import APIUtils from '../APIUtils';
import zAJAX from 'z-ajax'

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
        AppActionCreators.changeLoading();
        
        let data = {
            workNum: APIUtils.getUrlParam('workNum'),
        };

        let cb = msg => {
            AppActionCreators.changeLoading();
            if (msg.result === 1) {
                this.setState({
                    carList: [ ...msg.list]
                })
            } else {
                alert(msg.message);
            }
        } 

        zAJAX(`${ctx}/carInf/queryOfferCar`, data, cb)
    };

    render() {

        let listShows = this.state.carList.map((car, index) => {
            return  <Car key={index} car={car}/>
        });

        const ulStyle = {
            borderTop: '1px solid #ccc',
        }
        return (
            <ul style={ulStyle}>
                {listShows}
            </ul>
        );
    };
}
