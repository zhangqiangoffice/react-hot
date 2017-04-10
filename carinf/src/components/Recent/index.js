import React, {Component} from 'react'

import TitleBar from '../public/TitleBar'
import TopTip from '../public/TopTip'
import CarList from './CarList'

import zAJAX from 'z-ajax'

export default class App extends Component {

    render() {
        return (
            <div>
                <TitleBar title="最近询价车辆" />
                <TopTip tip="下面是您最近查询的车辆，可点击重新报价" />
                <CarList />
            </div>
        )
    };
}