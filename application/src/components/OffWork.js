import React, {Component} from 'react';
import Applications from './Applications';
import APIUtils from './APIUtils';
import AppActionCreators from '../actions/AppActionCreators';
import Options from './Options';

export default class OffWork extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.goLists = this.goLists.bind(this);
        
    };

    //页面打开滑动到顶部
    componentWillReceiveProps(nextProps) {
        if (nextProps.isCurrent) {
            window.scrollTo(0, 0)
        }
    }

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
                    <h1>请假申请</h1>
                    <span className={!this.props.activedListIndex ? 'hide' : ''} onClick={APIUtils.deal_application}>提交</span>
                </div>

                <table className="staff_info">
                    <tbody>
                        <tr>
                            <td className="item">姓名：</td>
                            <td>{detail.staffName}</td>
                            <td className="item">职位：</td>
                            <td>{detail.positionName}</td>
                        </tr>
                        <tr>
                            <td className="item">所在部门：</td>
                            <td colSpan="3">{detail.departName}</td>
                        </tr>
                        <tr>
                            <td className="item">请假原因：</td>
                            <td colSpan="3">{detail.moveTypeName}</td>
                        </tr>
                        <tr>
                            <td className="item">请假事由：</td>
                            <td colSpan="3">{detail.memo}</td>
                        </tr>
                        <tr>
                            <td className="item">开始时间：</td>
                            <td colSpan="3">{detail.startDate}</td>
                        </tr>
                        <tr>
                            <td className="item">结束时间：</td>
                            <td colSpan="3">{detail.endDate}</td>
                        </tr>
                        <tr>
                            <td className="item">时间总计：</td>
                            <td colSpan="3">{detail.intervals}天</td>
                        </tr>

                    </tbody>
                </table>            

                <Options signList={detail.signList} signContent={this.props.signContent} signStatus={this.props.signStatus}/>
                
            </div>
        );
    };
}