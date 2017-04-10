import React, {Component} from 'react';
import InsuranceStore from '../../stores/InsuranceStore';

export default class out extends Component {

    render() {

        return (
            <div className="date">
                <div className="item_title">保险起期</div>
                <ul>
                    <li>
                        <label>交强险</label>
                        {InsuranceStore.getTraBeginDate()}
                    </li>
                    <li>
                        <label>商业险</label>
                        {InsuranceStore.getBeginDate()}
                    </li>
                </ul>
            </div>
        );
    };
}
