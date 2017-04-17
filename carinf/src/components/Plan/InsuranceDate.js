import React, {Component} from 'react';
import Switcher from '../public/Switcher';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';

import DatePic from '../public/DatePic';

export default class Out extends Component {
    constructor(props){
        super(props);

        this.changeBeginDate = this.changeBeginDate.bind(this);
        this.changeTraBeginDate = this.changeTraBeginDate.bind(this);
    };

    changeBeginDate(m) {
        let text ;
        if (new Date(m + ' 00:00:00') < new Date(this.props.lastBeginDate) ) {
            text = this.props.lastBeginDate;
        } else {
            text = m + ' 00:00:00'
        }
        InsuranceActionCreators.changeBeginDate(text);
    }

    changeTraBeginDate(m) {
        let text;
        if (new Date(m + ' 00:00:00') < new Date(this.props.lastTraBeginDate) ) {
            text = this.props.lastTraBeginDate;
        } else {
            text = m + ' 00:00:00'
        }
        InsuranceActionCreators.changeTraBeginDate(text);
    }

    render() {

        return (   
            <ul className="insurance_date">
                <DatePic title="商业险起保日期" 
                    theDate={(this.props.beginDate).slice(0, 10)} 
                    minDate={this.props.lastBeginDate} 
                    onChangeDate={this.changeBeginDate} />
                <li>
                    交强险
                    <Switcher isOn={this.props.ciFlag} onClick={InsuranceActionCreators.toggleCiFlag}/>
                </li>
                {this.props.ciFlag ?
                    <DatePic title="交强险起保日期" 
                        theDate={(this.props.traBeginDate).slice(0, 10)} 
                        minDate={this.props.lastTraBeginDate} 
                        onChangeDate={this.changeTraBeginDate}/>
                : null }
            </ul>
        );
    };
}