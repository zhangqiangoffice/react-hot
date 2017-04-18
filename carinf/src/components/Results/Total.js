import React, {Component} from 'react';
import { componies } from '../asset/json/appInfo.json';

export default class Out extends Component {

    render() {
        let result = this.props.result;
        let company = componies[this.props.index - 1];

        return (  
            <table className="total_table">
                <tbody>
                    <tr>
                        <td><img src={require(`../asset/img/circle_${company.spell}.png`)}/></td>
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
        );
    };
}