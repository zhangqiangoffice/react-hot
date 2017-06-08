import React, {Component} from 'react';

export default class Out extends Component {

    render() {

        const result = this.props.result;
        const type = result.insuredType;
        const count = result.claimCount;
        const flag = result.renewFlag;

        if (type === '' && count === '' && flag === '') {
            return null
        }

        return (  
            <table>
                <tbody>
                    {type !== '' ?
                    <tr>
                        <td>投保类型</td>
                        <td>{type}</td>
                    </tr>
                    : null}
                    {count !== '' ?
                    <tr>
                        <td>出险次数</td>
                        <td>{count}</td>
                    </tr>
                    : null}
                    {flag !== '' ?
                    <tr>
                        <td>是否续保</td>
                        <td>{flag}</td>
                    </tr>
                    : null}
                </tbody>
            </table>
        );
    };
}