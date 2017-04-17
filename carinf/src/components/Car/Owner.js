import React, {Component} from 'react';
import CarActionCreators from '../../actions/CarActionCreators';

export default class CarInfo extends Component {

    render() {

        return (
            <ul className="info_ul">
                <li>
                    <label>车主名</label>
                    <input type="text" placeholder="请输入" value={this.props.name} onChange={CarActionCreators.updateName}/>
                </li>
                <li>
                    <label>证件号</label>
                    <input type="text" placeholder="请输入" value={this.props.idCard} onChange={CarActionCreators.updateIdCard}/>
                </li>
            </ul>
        );
    };
}
