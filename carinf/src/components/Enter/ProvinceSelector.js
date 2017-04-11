import React, {Component} from 'react';
import { provinces } from '../json/appInfo.json';
import CarActionCreators from '../../actions/CarActionCreators';

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
                <li key={index} className={flag ? '' : 'selected'} onClick={this.clickShort}>{short}</li>
            );   
        });

        return (
            <div className="province_selector" onClick={this.props.switchSelector}>
                <div className="box">
                    <ul>
                        {listShows}
                    </ul>
                </div>
            </div>
        );
    };
}
