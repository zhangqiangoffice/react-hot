import React, {Component} from 'react';
import InsuranceStore from '../../stores/InsuranceStore';
import { componies } from '../asset/json/appInfo.json';


export default class out extends Component {
    render() {
        const insuranceCom = InsuranceStore.getInsuranceCom()
        const result = InsuranceStore.getOffers()[insuranceCom]

        //交强险合计
        let total2 = (parseFloat(result.traffRealPrm) || 0) + (parseFloat(result.taxRealPrm) || 0)
          

        //商业险合计
        let total = 0;
        //商业险列表
        let listShow = null;
        if (result && result.list) {
            listShow = result.list.map((insure, index) => {
                //累计商业险合计
                total += (insure.prm - 0);
                return (
                    <li key={index}>
                        <label>{insure.name}</label>
                        {insure.amt}
                        <span className="right">￥{insure.prm}</span>
                    </li>
                )
            })
        }

        return (
            <div className="sheet">
                <div className="total">￥<span>{(total2 + total).toFixed(2)}</span></div>
                <div className="company_name">{componies[insuranceCom - 1].product}</div>
                <ul>
                    <li>
                        <label>交强险</label>
                        <span className="right">￥{(parseFloat(result.traffRealPrm) || 0).toFixed(2)}</span>
                    </li>
                    <li>
                        <label>车船税</label>
                        <span className="right">￥{(parseFloat(result.taxRealPrm) || 0).toFixed(2)}</span>
                    </li>
                </ul>
                <div className="sum">强制险合计<span>￥{(total2).toFixed(2)}</span></div>
                <ul className="list2">
                    {listShow}
                </ul>
                <div className="sum">商业险合计<span>￥{total.toFixed(2)}</span></div>
            </div>
        );
    };
}
