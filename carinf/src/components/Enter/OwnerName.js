import React, {Component} from 'react';
import CarActionCreators from '../../actions/CarActionCreators';

export default class Out extends Component {

    render() {
        return (
            <li className="li">
                <label className="item_name">车主名</label>
                <input type="text" placeholder="请输入车主名" className="info_input" value={this.props.name} onChange={CarActionCreators.updateName} />
            </li>     
        );
    };
}
