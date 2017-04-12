import React, {Component} from 'react';
import APIUtils from './APIUtils';
import AppActionCreators from '../actions/AppActionCreators';
import AppStore from '../stores/AppStore';


export default class AppLi extends Component {
    constructor(props) {
        super(props);

        this.askDetail = this.askDetail.bind(this);
    };

    askDetail() {
        let type = this.props.apply.applyType;
        let id = this.props.apply.id;
        let staffId = AppStore.getStaffid();

        //判断是否是签报,不是就进行React，是就进行页面跳转
        if (type - 0 < 3) {
            AppActionCreators.updateActivedApplyId(id);
            AppActionCreators.updateApplyType(type);
            
            //判断内存中是否有detail记录
            if (this.props.applyDetailList[this.props.activedListIndex][id]) {
                AppActionCreators.showApplyment();
            } else {
                APIUtils.detail(this.props.activedListIndex, id);
            }
        } else {
            AppActionCreators.showLoading();
            //签报，归档的去detail页面，提交给我的去add页面，我提交的要根据modifyFlag === “1”去detail,或者modify_document
            switch (this.props.activedListIndex) {
                case 0:
                    if (this.props.apply.modifyFlag === "1") {
                        window.location.href = `${ctx}/document_mobile/develop/detail/${id}?from=${this.props.activedListIndex}&staffId=${staffId}`;
                    } else {
                        window.location.href = `${ctx}/document_mobile/develop/modify_document/${id}?staffId=${staffId}`;
                    }
                    break;
                case 1:
                    window.location.href = `${ctx}/document_mobile/develop/add/${id}?staffId=${staffId}`;
                    break;
                case 2:
                    window.location.href = `${ctx}/document_mobile/develop/detail/${id}?from=${this.props.activedListIndex}&staffId=${staffId}`;
                    break;
                default:
                    break;
            }
        }
    }

    render() {
        let apply = this.props.apply;
        let state = ['处理中', '已完成', '驳回', '审批通过'];
        let stateClass = ['handle', 'success', 'reject', 'passed'];

        //拼接岗位信息，只有提交给我的显示
        let str = null;
        if (this.props.activedListIndex) {
            let departNameArr = apply.departmentName.split(',');
            let positionNameArr = apply.positionName.split(',');
            let departs = [];
            departNameArr.map((depart, index) => {
                departs.push(depart + '-' + positionNameArr[index]);
            });

            str =   <div className="applyer_lay">
                        <ul className="department">
                            {
                                departs.map((depart, index) => {
                                    return(<li key={index}>{depart}</li>)
                                })
                            }
                        </ul>
                        <div className="applyer">申请人：<span>{apply.staffName}</span></div>
                    </div>
        }

        return (
            <li onClick={this.askDetail}>
                <div className="first_lay">
                    <div className="apply_type">{apply.applyTypeName}</div>
                    <div className={'state ' + stateClass[apply.dealStatus]}>{state[apply.dealStatus]}</div>
                </div>
                {str}
                <div className="date_lay">{apply.createTime}</div>
            </li> 
        );
    };
}