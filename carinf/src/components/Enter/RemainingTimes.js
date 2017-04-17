import React, {Component} from 'react';
import InsuranceStore from '../../stores/InsuranceStore';

export default class Out extends Component {

    render() {
        const com = InsuranceStore.getInsuranceCom() - 0;
        const times = this.props.usedTimes;
        let used = 0;
        switch (com) {
          case 3:
            used = times.zh;
            break;
          case 2:
            used = times.tp;
            break;
          default:
            break;
        }

        const re = 10 - used;
        
        
        console.log(re);
        return (
            <span className="remaining">还可报价：{re} 次</span>    
        );
    };
}
