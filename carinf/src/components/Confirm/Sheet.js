import React, {Component} from 'react';
import InsuranceStore from '../../stores/InsuranceStore';
import appInfo from '../json/appInfo.json';


export default class out extends Component {
    constructor(props){
        super(props);
    };

    render() {

        const result = InsuranceStore.getOffers()[InsuranceStore.getInsuranceCom()]
        console.log(result);
        const insuranceCom = InsuranceStore.getInsuranceCom()

        let listShow2 = null;
        let total = 0;

        if (result && result.list) {
            listShow2 = result.list.map((insure, index) => {
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
                <div className="total">￥<span>{((parseFloat(result.traffRealPrm) || 0) + (parseFloat(result.taxRealPrm) || 0) + total).toFixed(2)}</span></div>
                <div className="company_name">{appInfo.componies[insuranceCom - 1].product}</div>
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
                <div className="sum">强制险合计<span>￥{((parseFloat(result.traffRealPrm) || 0) + (parseFloat(result.taxRealPrm) || 0) ).toFixed(2)}</span></div>
                <ul className="list2">
                    {listShow2}
                </ul>
                <div className="sum">商业险合计<span>￥{(total || 0).toFixed(2)}</span></div>
            </div>
        );
    };
}
