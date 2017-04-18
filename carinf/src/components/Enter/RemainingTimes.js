import React, {Component} from 'react';
import InsuranceStore from '../../stores/InsuranceStore';

export default class Out extends Component {

    render() {
        console.log(this.props.unUsedTimes);
        if (this.props.unUsedTimes > 5 ) {
            return null;
        }
        
        return (
            <span className="remaining">还可报价：{this.props.unUsedTimes} 次</span>    
        );
    };
}
