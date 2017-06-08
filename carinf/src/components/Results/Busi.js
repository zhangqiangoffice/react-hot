import React, {Component} from 'react';

export default class Out extends Component {

    render() {
        let detailShows = this.props.result.list.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.name}（{item.amt}）</td>
                    <td>{item.benPrm}元</td>
                    <td>{item.discount}折</td>
                    <td>{item.prm}元</td>
                </tr>
            )
        });

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
                    {detailShows}
                </tbody>
            </table>
        );
    };
}