import React, {Component} from 'react';
import appInfo from './json/appInfo.json';
import InsuranceActionCreators from '../actions/InsuranceActionCreators';

export default class SchemeSwitcher extends Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);   
    };

    //点击切换投保方案
    handleClick(event) {
        let index = parseInt(event.target.dataset.index);
        InsuranceActionCreators.updateSchemeIndex(index);
    }
    
    render() {
        let listShows = appInfo.threeSchemeNameList.map((nameStr, index) => {
            return (
                <li className={(index === this.props.schemeIndex) ? 'selected' : ''} key={index} data-index={index} onClick={this.handleClick}>{nameStr}</li>
            )    
        });

        return (
            <ul className="switcher">
                {listShows}
            </ul>
        );
    };
}
