import React, {Component} from 'react';
import Applications from './Applications';
import APIUtils from './APIUtils';
import AppActionCreators from '../actions/AppActionCreators';
import Options from './Options';
import AppStore from '../stores/AppStore';
import { DatePicker } from 'antd-mobile';
import zAJAX from 'z-ajax'
import moment from 'moment';

export default class BecomeRegular extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colligateLevel: '1',
            adviseLevel: '1',
            adviseMemo: '',
        }

        this.goLists = this.goLists.bind(this);
        this.selectLevel = this.selectLevel.bind(this);
        this.selectAdvise = this.selectAdvise.bind(this);
        this.submit = this.submit.bind(this);
        this.changeAdviseMemo = this.changeAdviseMemo.bind(this);
        
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

    //选择评级
    selectLevel(event) {
        let id = event.target.dataset.id;
        this.setState({
            colligateLevel: id,
        });
    }

    //选择转正建议
    selectAdvise(event) {
        let index = event.target.dataset.index;
        this.setState({
            adviseLevel: index,
            adviseMemo: '',
        });
    }

    //输入转正建议的文本
    changeAdviseMemo(text) {
        // let text = event.target.value.trim();
        this.setState({
            adviseMemo: text,
        });
    }

    //点击提交
    submit() {
        let isLeader = this.props.detail.levelEdit === "1";
        if (isLeader) {
            if (!AppStore.getSignContent()) {
                alert('签批意见不能为空！');
                return false;
            }
            if (this.state.adviseLevel !== '1' && this.state.adviseMemo === '') {
                alert('转正建议详情不能为空！');
                return false;
            }

            let datas = {
                id: AppStore.getSignId(),
                signStatus: AppStore.getSignStatus(),
                signContent: AppStore.getSignContent(),
                applyId: AppStore.getActivedApplyId(),
                staffId: AppStore.getStaffid(),
                applyType: AppStore.getApplyType(),
                colligateLevel: this.state.colligateLevel,
                adviseLevel: this.state.adviseLevel,
                adviseMemo: this.state.adviseMemo,
            }

            AppActionCreators.showLoading();

            let cb = msg => {
                if (msg.result === 1) {
                    AppActionCreators.showComponent('Lists');
                    alert('提交成功！');
                    window.location.reload();
                } else {
                    alert(msg.message);
                }  
            }

            zAJAX(`${ctx}/application_mobile/deal_application`, datas, cb)
        } else {
            APIUtils.deal_application();
        }
    }


    render() {
        if (!this.props.isCurrent) {
            return null
        }

        let detail = this.props.detail.entity;
        let isLeader = this.props.detail.levelEdit === "1";

        let comments;
        let advise;
        
        //如果是直属领导
        if (isLeader) {
            let listShows = this.props.detail.colligateList.map((level, index) => {
                return(
                    <li className={this.state.colligateLevel === level.id ? 'selected' : ''} key={index} data-id={level.id} onClick={this.selectLevel}>{level.name}</li>
                );
            });

            comments = <div>
                <div className="sub_title">请假日期</div>
                <div className="leave_reason">
                    综合评级

                    <ul>
                        {listShows}
                    </ul>
                </div>

                <div className="leave_reason border_bottom">
                    转正建议

                    <ul>
                        <li className={this.state.adviseLevel === "0" ? 'selected' : ''} data-index="0" onClick={this.selectAdvise}>
                            提前至
                            <DatePicker 
                                  mode="date"
                                  onChange={val => this.changeAdviseMemo(moment(val).format('YYYY-MM-DD'))}
                                >
                                <input type="text" placeholder="请选择" 
                                    data-index="0" 
                                    readOnly="readonly"
                                    value={ this.state.adviseLevel === "0" ? this.state.adviseMemo : ''}
                                    className={this.state.adviseLevel === "0" ? '' : 'hide'}
                                    />
                            </DatePicker>

                        </li>
                        <li className={this.state.adviseLevel === "1" ? 'selected' : ''} data-index="1" onClick={this.selectAdvise}>
                            按期转正
                        </li>
                        <li className={this.state.adviseLevel === "2" ? 'selected' : ''} data-index="2" onClick={this.selectAdvise}>
                            延长至
                            <DatePicker 
                                  mode="date"
                                  onChange={val => this.changeAdviseMemo(moment(val).format('YYYY-MM-DD'))}
                                >
                                <input type="text" placeholder="请选择" 
                                    data-index="2" 
                                    readOnly="readonly"
                                    value={this.state.adviseLevel === "2" ? this.state.adviseMemo : ''}
                                    className={this.state.adviseLevel === "2" ? '' : 'hide'}
                                    />
                            </DatePicker>
                        </li>
                        <li className={this.state.adviseLevel === "3" ? 'selected' : ''} data-index="3" onClick={this.selectAdvise}>
                            辞退，最后工作日
                            <DatePicker 
                                  mode="date"
                                  onChange={val => this.changeAdviseMemo(moment(val).format('YYYY-MM-DD'))}
                                >
                                <input type="text" placeholder="请选择" 
                                    data-index="3" 
                                    readOnly="readonly"
                                    value={this.state.adviseLevel === "3" ? this.state.adviseMemo : ''}
                                    className={this.state.adviseLevel === "3" ? '' : 'hide'}
                                    />
                            </DatePicker>
                        </li>
                        <li className={this.state.adviseLevel === "4" ? 'selected' : ''} data-index="4" onClick={this.selectAdvise}>
                            转岗，建议岗位
                            <input type="text" 
                                placeholder="请输入" 
                                data-index="4" 
                                value={this.state.adviseLevel === "4" ? this.state.adviseMemo : ''}
                                className={this.state.adviseLevel === "4" ? '' : 'hide'}
                                onChange={this.state.adviseLevel === "4" ? e => this.changeAdviseMemo(e.target.value.trim()) : null}
                                />
                        </li>
                    </ul>
                </div>

            </div>
        } else {
            //如果不是直属领导需要拼接字段
            switch (detail.adviseLevel) {
                case '0':
                    advise = '提前至' + detail.adviseMemo + '转正';
                    break;
                case '1':
                    advise = '按期转正';
                    break;
                case '2':
                    advise = '延长试用期至' + detail.adviseMemo;
                    break;
                case '3':
                    advise = '辞退，最后工作日为' + detail.adviseMemo;
                    break;
                case '4':
                    advise = '建议转岗为' + detail.adviseMemo;
                    break;
                default:
                    break;
            }

        }

        return (
            <div className="business_travel">
                <div className="title_bar">
                    <button type="button" onClick={this.goLists}> </button>
                    <h1>转正申请</h1>
                    <span className={!this.props.activedListIndex ? 'hide' : ''} onClick={this.submit}>提交</span>
                </div>

                <table className="staff_info">
                    <tbody>
                        <tr>
                            <td className="item">姓名：</td>
                            <td>{detail.staffName}</td>
                            <td className="item">学历：</td>
                            <td>{detail.educationName}</td>
                        </tr>
                        <tr>
                            <td className="item">所在部门：</td>
                            <td>{detail.departName}</td>
                            <td className="item">职位：</td>
                            <td>{detail.positionName}</td>
                        </tr>
                        <tr>
                            <td className="item">入职日期：</td>
                            <td colSpan="3">{detail.entryDate}</td>
                        </tr>
                        <tr>
                            <td className="item">转正日期：</td>
                            <td colSpan="3">{detail.memberDate}</td>
                        </tr>
                        <tr>
                            <td className="item">工作总结：</td>
                            <td colSpan="3" style={{paddingRight: '1rem'}}>{detail.memo}</td>
                        </tr>
                        <tr className={isLeader ? 'hide' : ''}>
                            <td className="item">综合评级：</td>
                            <td colSpan="3">{detail.colligateLevelName}</td>
                        </tr>
                        <tr className={isLeader ? 'hide' : ''}>
                            <td className="item">转正建议：</td>
                            <td colSpan="3">{advise}</td>
                        </tr>
                    </tbody>
                </table>   

                {comments}         

                <Options signList={detail.signList} signContent={this.props.signContent} signStatus={this.props.signStatus}/>
                
            </div>
        );
    };
}