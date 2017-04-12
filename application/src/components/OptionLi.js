import React, {Component} from 'react';
import APIUtils from './APIUtils';
import AppActionCreators from '../actions/AppActionCreators';
import Switcher from './Switcher';


export default class AppLi extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        let sign = this.props.sign;
        let statesFlagStr = ['待审', '同意', '驳回'];
        let statesFlagClass = ['un', 'ok', 'no'];
        let second = (<div className="down_storey">
                        <span className="suggestion_item">签批意见</span>
                        <label>{sign.memo}</label>
                    </div>);
        if (sign.editFlag === "0" || sign.editFlag === "2") {
            second = (<div className="down_storey">
                        <span className="suggestion_item">签批意见</span>
                        <input data-id={sign.id} type="text" placeholder="请输入意见，且不得为空" value={this.props.signContent} onChange={AppActionCreators.changeSignContent}/>
                        <p>
                            {this.props.signStatus === '1' ? '同意' : '驳回'}
                            <Switcher isOn={this.props.signStatus === '1'} onClick={AppActionCreators.switchSignStatus}/>
                        </p>
                    </div>
                );
        }

        return (
            <li>
                <div className="department">{sign.signDepartmentName}</div>
                <div className="one_signer">
                    <div className="up_storey">
                        <img src={ctx + '/static/img/document/portrait.png'} />
                        <div className="signer_person">
                            <p>{sign.signPersonName}
                               <br/>
                               {sign.signTime}
                            </p>
                        </div>

                        <span className={'signer_result ' +  statesFlagClass[sign.statesFlag]}>{statesFlagStr[sign.statesFlag]}</span>
                    </div>
            
                    {second}
            
                </div>
            </li>
        );
    };
}