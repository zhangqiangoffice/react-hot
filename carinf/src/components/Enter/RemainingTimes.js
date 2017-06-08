import React, {Component} from 'react';
import InsuranceStore from '../../stores/InsuranceStore';
import style from '../asset/css/Enter.less'

export default class Out extends Component {

    render() {
        if (this.props.unUsedTimes > 5 ) {
            return null;
        }
        
        return (
            <span className={style.remaining}>还可报价：{this.props.unUsedTimes} 次</span>    
        );
    };
}
