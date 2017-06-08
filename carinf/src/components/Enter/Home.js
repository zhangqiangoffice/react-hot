import React, {Component} from 'react';
import { Toast } from 'antd-mobile';
import style from '../asset/css/Enter.less'

export default class Out extends Component {

    //切换是否是私家车
    switchIsHome() {
       Toast.info('目前仅支持私家车！', 2);
    }

    render() {
        return (
            <li className={style.li}>
                <label className={style.item_name}>7座以下私家车</label>
                <span className={style.selections}  onClick={this.switchIsHome}>
                    <label className={style.selected}>是</label>
                    <label>否</label>
                </span>
            </li>        
        );
    };
}
