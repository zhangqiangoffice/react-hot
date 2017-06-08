import React, {Component} from 'react';

export default class Out extends Component {

    render() {
        let result = this.props.result;
        if (!result.traffRealDiscount && !result.realDiscount) {
            return null
        }

        return (  
            <table>
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
                        <td>{result.traffRealDiscount}折</td>
                        <td>{result.traffRealPrm}元</td>   
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
        );
    };
}