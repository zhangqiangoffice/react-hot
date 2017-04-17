import React, {Component} from 'react'
import TitleBar from '../public/TitleBar'
import TopTip from '../public/TopTip'
import CarList from './CarList'

export default class Out extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasRecord: true,
        };

        this.noRecent = this.noRecent.bind(this)
    };

    noRecent() {
      this.setState({
        hasRecord: false
      })
    }

    render() {
        return (
            <div>
                <TitleBar title="最近询价车辆" />
                <TopTip tip={this.state.hasRecord ? '下面是您最近查询的车辆，可点击重新报价' : '无车辆记录'} />
                {this.state.hasRecord ? <CarList noRecent={this.noRecent} /> : null}
            </div>
        )
    };
}