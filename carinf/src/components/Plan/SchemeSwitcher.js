import React, {Component} from 'react';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import style from '../asset/css/Plan.less'

export default class SchemeSwitcher extends Component {

    //点击切换投保方案
    handleClick(event) {
        let index = parseInt(event.target.dataset.index);
        InsuranceActionCreators.updateSchemeIndex(index);
    }
    
    render() {
        let listShows = ["全面保护", "新车套餐", "自定义"].map((nameStr, index) => {
            return (
                <li className={(index === this.props.schemeIndex) ? style.selected : ''} key={index} data-index={index} onClick={this.handleClick}>{nameStr}</li>
            )    
        });

        return (
            <ul className={style.switcher}>
                {listShows}
            </ul>
        );
    };
}
