import React, {Component} from 'react';
import CarActionCreators from '../../actions/CarActionCreators';
import style from '../asset/css/Enter.less'

export default class Out extends Component {

    render() {
        return (
            <li className={style.li}>
                <label className={style.item_name}>证件号</label>
                <input type="text" placeholder="请输入车主证件号" className={style.info_input} value={this.props.idCard} onChange={CarActionCreators.updateIdCard} />
            </li> 
        );
    };
}
