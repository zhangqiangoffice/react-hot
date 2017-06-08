import React, {Component} from 'react';
import CarActionCreators from '../../actions/CarActionCreators';
import style from '../asset/css/Enter.less'

export default class Out extends Component {

    render() {
        return (
            <li className={style.li}>
                <label className={style.item_name}>车主名</label>
                <input type="text" placeholder="请输入车主名" className={style.info_input} value={this.props.name} onChange={CarActionCreators.updateName} />
            </li>     
        );
    };
}
