import React, {Component} from 'react';
import CarActionCreators from '../../actions/CarActionCreators';
import DatePic from '../public/DatePic';
import Switcher from '../public/Switcher';

export default class CarInfo extends Component {

    render() {

        return (
            <ul className="info_ul">
                <li>
                    <label>是否过户</label>
                    <Switcher isOn={this.props.isTransferOwnership}  onClick={CarActionCreators.toggleOwnership}/>
                </li>
                {this.props.isTransferOwnership ?
                    <DatePic title="过户日期" 
                        theDate={this.props.issueDate} 
                        minDate="2005-01-01" 
                        maxDate={new Date()}
                        onChangeDate={CarActionCreators.changeIssueDate}/>
                : null
                }
            </ul>
        );
    };
}
