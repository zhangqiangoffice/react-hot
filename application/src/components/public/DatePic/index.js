import React, {Component} from 'react';
import { DatePicker } from 'antd-mobile';
import moment from 'moment';
import style from './style.less'

// 如果不是使用 List.Item 作为 children
const CustomChildren = props => (
  <div onClick={props.onClick}> 
    <span className={props.extra === '请选择' ? style.gray : ''}>{props.extra}</span>
  </div>
);

export default class DatePic extends Component {
    constructor(props) {
        super(props);

        this.state = {
          dpValue: this.props.theDate ? moment(this.props.theDate, 'YYYY-MM-DD') : null,
        }

        this.changeDate = this.changeDate.bind(this)
    };

    changeDate(m) {
      this.setState({
        dpValue: m,
      })
      this.props.onChangeDate(m.format('YYYY-MM-DD'))
    }

    render() {
        return (
          <li>
            <label>{this.props.title}</label>
            <div className={style.picker}>
              <DatePicker 
                mode="date" 
                title={this.props.title} 
                value={this.state.dpValue}
                extra='请选择'
                minDate={this.props.minDate ? moment(this.props.minDate, 'YYYY-MM-DD') : null}
                maxDate={this.props.maxDate ? moment(this.props.maxDate, 'YYYY-MM-DD') : null}
                onChange={this.changeDate}>
                <CustomChildren />
                
              </DatePicker>
            </div>
          </li>
        );
    };
}