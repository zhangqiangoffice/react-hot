import React, {Component} from 'react';
import appInfo from './json/appInfo.json';
import InsuranceActionCreators from '../actions/InsuranceActionCreators';
import AppActionCreators from '../actions/AppActionCreators';
import InsuranceStore from '../stores/InsuranceStore';

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

        //初始化被保人信息
        InsuranceActionCreators.initBbr();

        AppActionCreators.stepNext();
        window.location = '#/confirm'
    };

    //显示或隐藏详情
    toggleShow() {
        this.setState({
            showMore: !this.state.showMore,
        });
    }

    render() {
        let detailShows = this.props.result.list.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.name}（{item.amt}）</td>
                    <td>{item.benPrm}元</td>
                    <td>{item.prm}元</td>
                </tr>
            )
        });

        let result = this.props.result;
        let company = appInfo.componies[this.props.index - 1];

        return (
            <li>
                <table className="total_table">
                    <tbody>
                        <tr>
                            <td><img src={ctx + '/static/img/carInf/circle_' + company.spell + '.png'}/></td>
                            <td colSpan="2">
                                <p className="company_name">{company.product}</p>
                                <p className="company_detail">正常精准报价</p>
                            </td>
                            <td className="sum_td"><span>{((parseFloat(result.traffRealPrm) || 0) + (parseFloat(result.taxRealPrm) || 0) + (parseFloat(result.realPrm) || 0)).toFixed(2)}</span>元</td>
                        </tr>
                        <tr className="money_tr">
                            <td></td>
                            <td className="no_wrap">交强险 <span className="cyan">{result.traffRealPrm}</span></td>
                            <td className="no_wrap">车船税 <span className="cyan">{result.taxRealPrm}</span></td>
                            <td>商业险 <span className="cyan">{result.realPrm}</span></td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                {result.message}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn_div">
                    <button type="button" className="apply" onClick={this.apply}>立即投保</button>
                </div>
                <table className={'detail_table ' + (this.state.showMore && result.insuredType !== '' ? '' : 'hide')}>
                    <tbody>
                        {result.insuredType !== '' ?
                        <tr>
                            <td>投保类型</td>
                            <td>{result.insuredType}</td>
                        </tr>
                        : null}
                        {result.claimCount !== '' ?
                        <tr>
                            <td>出险次数</td>
                            <td>{result.claimCount}</td>
                        </tr>
                        : null}
                        {result.renewFlag !== '' ?
                        <tr>
                            <td>是否续保</td>
                            <td>{result.renewFlag}</td>
                        </tr>
                        : null}
                    </tbody>
                </table>
                {}
                <table className={'detail_table ' + (this.state.showMore && ((result.traffRealDiscount - 0) > 0 || (result.realDiscount - 0) > 0 ) ? '' : 'hide')}>
                    <thead>
                        <tr>
                            <th>险种</th>
                            <th>折前</th>
                            <th>折扣</th>
                            <th>折后</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(result.traffRealDiscount - 0) > 0 ?
                        <tr>
                            <td>交强险</td>
                            <td>{result.traffPrm}元</td>
                            <td>{result.traffRealDiscount * 10}折</td>
                            <td>{result.traffRealPrm}</td>   
                        </tr>
                        : null}
                        {(result.realDiscount - 0) > 0 ?
                        <tr>
                            <td>商业险</td>
                            <td>{result.prm}元</td>
                            <td>{result.realDiscount * 10}折</td>
                            <td>{result.realPrm}</td>
                        </tr>
                        : null}
                    </tbody>
                </table>
                <table className={'detail_table ' + (this.state.showMore ? '' : 'hide')}>
                    <thead>
                        <tr>
                            <th>险种</th>
                            <th>折前</th>
                            <th>折后</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detailShows}
                    </tbody>
                </table>
                <div className={'handler ' + (this.state.showMore ? 'toHide' : '')} onClick={this.toggleShow}></div>
            </li>
        );
    };
}