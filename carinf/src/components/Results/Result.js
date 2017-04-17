import React, {Component} from 'react';
import appInfo from '../asset/json/appInfo.json';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import AppActionCreators from '../../actions/AppActionCreators';
import InsuranceStore from '../../stores/InsuranceStore';
import Detail from './Detail';
import Total from './Total';

export default class Result extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMore: false,
        };

        this.apply = this.apply.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    };

    //立即投保
    apply() {
        //在更新投保公司的操作中已经判断了支付方式
        InsuranceActionCreators.updateInsuranceCom(this.props.index);
        window.location = '#/confirm'
    };

    //显示或隐藏详情
    toggleShow() {
        this.setState({
            showMore: !this.state.showMore,
        });
    }

    render() {

        return (
            <li>
                <Total result={this.props.result} index={this.props.index} />
                <div className="btn_div">
                    <button type="button" className="apply" onClick={this.apply}>立即投保</button>
                </div>
                {this.state.showMore? <Detail result={this.props.result}/> : null}
                <div className={'handler ' + (this.state.showMore ? 'toHide' : '')} onClick={this.toggleShow}></div>
            </li>
        );
    };
}