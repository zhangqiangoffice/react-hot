import React, {Component} from 'react';
import CarActionCreators from '../../actions/CarActionCreators';

export default class Out extends Component {

    render() {
        return (
            <li className="li">
                <label className="item_name">证件号</label>
                <input type="text" placeholder="请输入车主证件号" className="info_input" value={this.props.idCard} onChange={CarActionCreators.updateIdCard} />
            </li> 
        );
    };
}
