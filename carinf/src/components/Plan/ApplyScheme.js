import React, {Component} from 'react';
import InsuranceItem from './InsuranceItem';
import style from '../asset/css/Plan.less'

export default class ApplyScheme extends Component {
    constructor(props){
        super(props);

        this.getDedu = this.getDedu.bind(this);
    };

    //检查某个险种是否有不计免赔
    getDedu(deduName) {
        let flag = null;
        this.props.scheme.map((value, key) => {
            if (value.code === deduName) {
                flag = value;
            } 
        });
        return flag;
    };
    
    render() {
        
        let insuranceList = this.props.scheme.map((insurance, index) => { 
            if (insurance.code.indexOf('01') > -1) {
                let deduName = insurance.code.replace('1', '2');
                let deductible = this.getDedu(deduName);
                return (
                    <InsuranceItem 
                        key={index} 
                        insurance={insurance} 
                        deductible={deductible} 
                    />
                )
            }
        });

        return (
            <div>
                <table className={style.items}>
                    <thead>
                        <tr>
                            <th><span>条款</span></th>
                            <th><span>保额</span></th>
                            <th><span>不计免赔</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {insuranceList}
                    </tbody>
                </table>
            </div>
        );
    };
}
