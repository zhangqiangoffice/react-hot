import React, {Component} from 'react';
import TitleBar from '../public/TitleBar';
import TopTip from '../public/TopTip';
import CarInfo from './CarInfo';
import ButtonBottom from '../public/ButtonBottom';
import { carModel } from '../APIUtils';

export default class App extends Component {

    render() {

        return (
            <div>
                <TitleBar title="投保车辆信息" />
                <TopTip tip="我们确保您的个人信息仅用于车险报价" />
                <CarInfo />
                <ButtonBottom text="下一步" onClickHandle={carModel}/> 
            </div>
        )
    };
}