import React, {Component} from 'react';

import TitleBar from '../public/TitleBar';
import TopTip from '../public/TopTip';
import CarInfo from './CarInfo';

import zAJAX from 'z-ajax'

export default class App extends Component {
    constructor(props) {
        super(props);

    };

    render() {

        return (
            <div>
                <TitleBar title="投保车辆信息" />
                <TopTip tip="我们确保您的个人信息仅用于车险报价" />
                <CarInfo isCurrent={true} />
            </div>
        )
    };
}