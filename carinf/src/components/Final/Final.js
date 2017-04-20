import React, {Component} from 'react';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import {applyPay} from '../APIUtils';
import AppActionCreators from '../../actions/AppActionCreators';
import CarStore from '../../stores/CarStore';
import AppStore from '../../stores/AppStore';
import InsuranceStore from '../../stores/InsuranceStore';

export default class Final extends Component {
    constructor(props){
        super(props);

        this.reset = this.reset.bind(this);
    };

    //再次下单，回到第一步，并清空数据
    reset() {
        window.location= '#/';
        AppActionCreators.stepGoFirst();
        CarActionCreators.reset();
        InsuranceActionCreators.reset();
    }

    render() {

        let com = InsuranceStore.getInsuranceCom();
        let isHome = CarStore.getIsHome();
        let cid = AppStore.getCid();
        let provinceId = InsuranceStore.getTbPlace().province.no;
        let offers = InsuranceStore.getOffers();
        let orderNo = InsuranceStore.getSerial();

        //总计支付
        let total = (((offers[com].realPrm - 0) || 0) + ((offers[com].traffRealPrm - 0) || 0) + ((offers[com].taxRealPrm - 0) || 0)).toFixed(2);
        
        //订单编号

        let flag = (com == 2 || com == 3 ) && isHome === 1;
        let src = "http://insurance.egogoal.com/insuranceWeb/callback/api/getCarRules?staffId=EG0001&cid=2296&proId1=70102&proId2=70101&am1=3500&am2=7800&provinceId=120000";
        //商业险金额
        if (cid) {
            let am1 = offers[com].realPrm || 0
            //交强险金额
            let am2 = offers[com].traffRealPrm || 0
            //易购钱包余额
            src = "http://insurance.egogoal.com/insuranceWeb/callback/api/getCarRules?staffId=EG0001&cid=" + cid + "&proId1=70102&proId2=70101&am1=" + am1 + "&am2=" + am2 + "&provinceId=" + provinceId
        }

        return (
            <div className="final">
                <div className="bg"></div>
                <div className="success">
                    <p className="red">核保成功！</p>
                    <p>
                        需支付<span className="red"> {total}元</span><br/>
                        请在48小时内完成支付<br />
                        订单编号：{orderNo}
                    </p>

                </div>
                <button type="button" onClick={this.reset}>再次下单</button>
                <button type="button" className={flag ? '' : 'hide'} onClick={applyPay}>前去支付</button>
                {cid ? <iframe src={src}></iframe> : null}
            </div>
        );
    };
}