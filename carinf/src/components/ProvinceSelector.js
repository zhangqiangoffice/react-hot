import React, {Component} from 'react';
import appInfo from './json/appInfo.json';
import CarActionCreators from '../actions/CarActionCreators';

export default class ProvinceSelector extends Component {
    constructor(props){
        super(props);

        this.clickShort = this.clickShort.bind(this);
    };

    //点击省简称之后
    clickShort(event) {
        // this.props.switchSelector();
        let short = event.target.innerHTML;
        CarActionCreators.updateProvinceShort(short);
    };

    render() {
        
        if (!this.props.isShow) {
            return null;
        }

        let listShows = appInfo.provinces.map((short, index) => {
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
