import React, {Component} from 'react';
import APIUtils from './APIUtils';
import AppActionCreators from '../actions/AppActionCreators';
import AppStore from '../stores/AppStore';

export default class NewOffWork extends Component {
    constructor(props) {
        super(props);

        this.state = {
            memo: '',
            moveType: "1",
            startDate: '',
            endDate: '',
            intervals: '',
            greaterThan3: false

        }

        this.changeMemo = this.changeMemo.bind(this);
        this.goLists = this.goLists.bind(this);
        this.submit = this.submit.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.countDays = this.countDays.bind(this);
        this.checkData = this.checkData.bind(this);
        this.selectReason = this.selectReason.bind(this);
        
    };

    //修改外出原因
    changeMemo(event) {
        let val = event.target.value;
        this.setState({
            memo: val
        });
    }

    //返回列表页面
    goLists() {
        AppActionCreators.showComponent('Lists');
    }

    //选择请假原因
    selectReason(event) {
        let id = event.target.dataset.id;
        this.setState({
            moveType: id,
        });
    }

    //计算日期之间的天数
    countDays(sStr = this.state.startDate, eStr = this.state.endDate) {
        let s = new Date(sStr);
        let e = new Date(eStr);
        let d = (e - s) / (24 * 60 * 60 * 1000) + 1;
        this.setState({
            intervals: d > 0 ? d : '',
            greaterThan3: d >= 3
        });
        if (d <= 0) {
            alert ('开始时间不能大于结束时间！');
        }
    }

    //修改结束日期
    changeEndDate(event) {
        let val = event.target.value.trim();
        let len = val.length;
        if (len < 11) {
            this.setState({
                endDate: val
            });

            if (len === 10) {
                this.countDays(undefined, val);
            }
        }

    }

    //修改开始日期
    changeStartDate(event) {
        let val = event.target.value.trim();
        let len = val.length;
        if (len < 11) {
            this.setState({
                startDate: val
            });

            if (len === 10) {
                this.countDays(val, );
            }
        }
    }

    //检查数据是否满足提交要求
    checkData() {
        if (!this.state.memo) {
            alert('请填写请假事由!');
            return false;
        }

        if (!this.state.intervals) {
            alert('请假时间输入不正确');
            return false;
        }

        return true;
    }

    //提交公出申请
    submit() {
        if (this.checkData()) {
            let datas = {
                staffId: AppStore.getStaffid(),
                applyType: 5,
                moveType: this.state.moveType,
                memo: this.state.memo,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                intervals: this.state.intervals,
            }

            AppActionCreators.showLoading();
            $.ajax({
                type: "post",
                url: ctx + "/application_mobile/add_application",
                data: {data: JSON.stringify(datas)},
                dataType: "json",
                success: function(msg) {
                    AppActionCreators.hideLoading();
                    if (msg.result === 1) {
                        alert('提交成功！');
                        this.goLists();
                        this.setState({
                            memo: '',
                            moveType: "1",
                            startDate: '',
                            endDate: '',
                            intervals: '',
                            greaterThan3: false,
                        });
                        AppActionCreators.reload();
                        APIUtils.initList();
                    } else {
                        alert(msg.message);
                    }
                }.bind(this)
            });
        }
    }


    render() {
        if (!this.props.isCurrent) {
            return null
        }

        let blankForm = this.props.blankForm.entity;
        
        //签批列表
        let signList = blankForm.signList.map((sign, index) => {
            if (!this.state.greaterThan3 && index === 2) {
                return null
            }
            return(
                <li key={index}>
                    {sign.signDepartmentName}
                    <button type="button">待审核</button>
                </li>
            );
        });

        //请假原因
        let leaveReasons = this.props.blankForm.leavetypeList.map((reason, index) => {
            return(
                <li className={this.state.moveType === reason.id ? 'selected' : ''} key={index} data-id={reason.id} onClick={this.selectReason}>{reason.name}</li>
            );
        });

        return (
            <div className="new_business_travel">
                <div className="title_bar">
                    <button type="button" onClick={this.goLists}> </button>
                    <h1>请假申请</h1>
                    <span onClick={this.submit}>提交</span>
                </div>

                <table className="staff_info">
                    <tbody>
                        <tr>
                            <td className="item">姓名：</td>
                            <td>{blankForm.staffName}</td>
                            <td className="item">职位：</td>
                            <td>{blankForm.positionName}</td>
                        </tr>
                        <tr>
                            <td className="item">所在部门：</td>
                            <td>{blankForm.departName}</td>
                        </tr>
                    </tbody>
                </table> 

                <div className="leave_reason">
                    请假原因

                    <ul>
                        {leaveReasons}
                    </ul>
                </div>           

                <textarea className="reason" placeholder="请假事由" onChange={this.changeMemo} value={this.state.memo}></textarea>
                
                <div className="sub_title">请假日期</div>

                <ul className="time">
                    <li>
                        <label>开始时间</label>
                        <input type="text" placeholder="请输入,如2016-01-01" value={this.state.startDate} onChange={this.changeStartDate}/>
                    </li>
                    <li>
                        <label>结束时间</label>
                        <input type="text" placeholder="请输入,如2016-01-03" value={this.state.endDate} onChange={this.changeEndDate}/>
                    </li>
                    <li>
                        <label>时间总计（天）</label>
                        <input type="text" value={this.state.intervals} readOnly="readonly" />
                    </li>
                </ul>

                <ul className="flow">
                    {signList}
                </ul>
            </div>
        );
    };
}