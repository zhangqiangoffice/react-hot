import React, {Component} from 'react'
import BlankLi from './BlankLi'
import InputBox from './InputBox'
import { DatePicker } from 'antd-mobile';
import moment from 'moment';
import style from './asset/css/index.less'

export default class OutPut extends Component {
    // constructor(props) {
    //     super(props);
    // };

  render() {
    return (
      <ul className="coat_ul">
        <BlankLi item="保险名称">
          众安驾乘意外伤害保险
        </BlankLi>
        <BlankLi item="保险起期">
          {this.props.justRead ? <span className={style.date_span}>{this.props.effectiveDate}</span> :
            <DatePicker 
              mode="date"
              minDate={moment().add(1, 'days')}
              title="保险起期"
              value={this.props.effectiveDate === '' ? moment().add(1, 'days') : moment(this.props.effectiveDate)}
              onChange={val => this.props.onChangeEffectiveDate(moment(val).format('YYYY-MM-DD'))}
            >
                <span>
                    <input type="text" placeholder="请选择" 
                    readOnly="readonly"
                    value={this.props.effectiveDate}
                    />
                    零时
                </span>
            </DatePicker>
          }
        </BlankLi>
        <BlankLi item="保险止期">
          <span className={style.date_span}>{this.props.expiryDate}</span>24时
        </BlankLi>
      </ul>
    )
  };
}