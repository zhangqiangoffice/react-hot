import React, {Component} from 'react';
import CarActionCreators from '../../actions/CarActionCreators';
import Switcher from '../public/Switcher';
import { DatePicker } from 'antd-mobile';
import moment from 'moment';

export default class CarInfo extends Component {

    render() {

        return (
            <ul className="blank_ul">
                <li>
                    <label>是否过户</label>
                    <Switcher isOn={this.props.isTransferOwnership}  onClick={CarActionCreators.toggleOwnership}/>
                </li>
                {this.props.isTransferOwnership ?
                    <li> 
                        <DatePicker 
                              mode="date"
                              maxDate={moment()}
                              title="过户日期"
                              value={this.props.issueDate === '' ? moment() : moment(this.props.issueDate)}
                              onChange={val => CarActionCreators.changeIssueDate(moment(val).format('YYYY-MM-DD'))}
                            >
                            <div>
                                <label>过户日期</label>
                                <input type="text" placeholder="请选择" 
                                    readOnly="readonly"
                                    value={this.props.issueDate}
                                    />
                            </div>
                        </DatePicker>
                    </li>
                : null
                }
            </ul>
        );
    };
}
