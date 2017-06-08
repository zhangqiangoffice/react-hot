import React, {Component} from 'react';
import { provinces } from '../asset/json/appInfo.json';
import CarActionCreators from '../../actions/CarActionCreators';
import style from '../asset/css/Enter.less'


export default class ProvinceSelector extends Component {

    //点击省简称之后
    clickShort(event) {
        let short = event.target.innerHTML;
        CarActionCreators.updateProvinceShort(short);
    };

    render() { 
        if (!this.props.isShow) {
            return null;
        }

        let listShows = provinces.map((short, index) => {
            let flag = (this.props.selectedShort !== short);
            return (
                <li key={index} className={flag ? '' : style.selected} onClick={this.clickShort}>{short}</li>
            );   
        });

        return (
            <div className={style.province_selector} onClick={this.props.switchSelector}>
                <div className={style.box}>
                    <ul>
                        {listShows}
                    </ul>
                </div>
            </div>
        );
    };
}
