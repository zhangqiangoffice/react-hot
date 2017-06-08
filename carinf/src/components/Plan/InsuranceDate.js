import React, {Component} from 'react';
import Switcher from '../public/Switcher';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import { DatePicker } from 'antd-mobile';
import moment from 'moment';

import style from '../asset/css/Plan.less'

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
            <ul className={style.insurance_date}>
                <li>
                    <DatePicker 
                          mode="date"
                          minDate={this.props.lastBeginDate === '' ? moment().add(1, 'd') : moment(this.props.lastBeginDate)}
                          title="商业险起保日期"
                          value={(this.props.beginDate) === '' ? moment() : moment((this.props.beginDate))}
                          onChange={val => CarActionCreators.changeRegisterDate(moment(val).format('YYYY-MM-DD'))}
                        >
                        <div>
                            <label>商业险起保日期</label>
                            <input type="text" placeholder="请选择" 
                                readOnly="readonly"
                                value={(this.props.beginDate).slice(0, 10)}
                                />
                        </div>
                    </DatePicker>
                </li>

                
                <li>
                    交强险
                    <Switcher isOn={this.props.ciFlag} onClick={InsuranceActionCreators.toggleCiFlag}/>
                </li>
                {this.props.ciFlag ?
                    <li>
                        <DatePicker 
                              mode="date"
                              minDate={this.props.lastTraBeginDate === '' ? moment().add(1, 'd') : moment(this.props.lastTraBeginDate)}
                              title="交强险起保日期"
                              value={(this.props.traBeginDate) === '' ? moment() : moment((this.props.traBeginDate))}
                              onChange={val => CarActionCreators.changeRegisterDate(moment(val).format('YYYY-MM-DD'))}
                            >
                            <div>
                                <label>交强险起保日期</label>
                                <input type="text" placeholder="请选择" 
                                    readOnly="readonly"
                                    value={(this.props.traBeginDate).slice(0, 10)}
                                    />
                            </div>
                        </DatePicker>
                    </li>
                : null }
            </ul>
        );
    };
}