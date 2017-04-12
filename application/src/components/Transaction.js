import React, {Component} from 'react';
import Applications from './Applications';
import APIUtils from './APIUtils';
import AppActionCreators from '../actions/AppActionCreators';
import Options from './Options';

export default class QuitOffice extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.goLists = this.goLists.bind(this);
        
    };

    //返回列表页面
    goLists() {
        AppActionCreators.showComponent('Lists');
    }


    render() {
        if (!this.props.isCurrent) {
            return null
        }

        let detail = this.props.detail.entity;

        return (
            <div className="business_travel">
                <div className="title_bar">
                    <button type="button" onClick={this.goLists}> </button>
                    <h1>人事异动申请</h1>
                    <span className={!this.props.activedListIndex ? 'hide' : ''} onClick={APIUtils.deal_application}>提交</span>
                </div>

                <table className="staff_info">
                    <tbody>
                        <tr>
                            <td className="item">姓名：</td>
                            <td>{detail.staffName}</td>
                            <td className="item">性别：</td>
                            <td>{detail.sex}</td>
                        </tr>
                        <tr>
                            <td className="item">入职日期：</td>
                            <td>{detail.entryDate}</td>
                            <td className="item">出生年月：</td>
                            <td>{detail.birthDate}</td>
                        </tr>
                        <tr>
                            <td className="item">类别：</td>
                            <td>{detail.moveTypeName}</td>
                            <td className="item">新岗生效：</td>
                            <td className="last">{detail.effectDate}</td>
                        </tr>
                        <tr>
                            <td className="item">异动事由：</td>
                            <td colSpan="3">{detail.memo}</td>
                        </tr>
                        <tr className="split">
                            <td colSpan="4"> 人事异动前</td>
                        </tr>
                        <tr>
                            <td className="item">部门：</td>
                            <td>{detail.departName}</td>
                            <td className="item">职务：</td>
                            <td>{detail.positionName}</td>
                        </tr>
                        <tr>
                            <td className="item">岗位职责：</td>
                            <td colSpan="3">{detail.duty}</td>
                        </tr>
                        <tr>
                            <td className="item">工作地点：</td>
                            <td colSpan="3" className="last">{detail.place}</td>
                        </tr>
                        <tr className="split">
                            <td colSpan="4"> 人事异动后</td>
                        </tr>
                        <tr>
                            <td className="item">部门：</td>
                            <td>{detail.moveDepartmentName}</td>
                            <td className="item">职务：</td>
                            <td>{detail.movePositionName}</td>
                        </tr>
                        <tr>
                            <td className="item">岗位职责：</td>
                            <td colSpan="3">{detail.moveDuty}</td>
                        </tr>
                        <tr>
                            <td className="item">工作地点：</td>
                            <td colSpan="3">{detail.movePlace}</td>
                        </tr>

                    </tbody>
                </table>            

                <Options signList={detail.signList} signContent={this.props.signContent} signStatus={this.props.signStatus}/>
                
            </div>
        );
    };
}