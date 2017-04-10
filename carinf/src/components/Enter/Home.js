import React, {Component} from 'react';
import { Toast } from 'antd-mobile';

export default class Out extends Component {

    //切换是否是私家车
    switchIsHome() {
       Toast.info('目前仅支持私家车！', 2);
    }

    render() {
        return (
            <li>7座以下私家车
                <span className="selections"  onClick={this.switchIsHome}>
                    <label className='selected'>是</label>
                    <label>否</label>
                </span>
            </li>        
        );
    };
}
