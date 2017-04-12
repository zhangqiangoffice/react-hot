import React, {Component} from 'react';
import NewBusinessTravel from './NewBusinessTravel';
import NewOffWork from './NewOffWork';
import NewWorkOvertime from './NewWorkOvertime';
import NewDocument from './NewDocument';
import BusinessTravel from './BusinessTravel';
import OffWork from './OffWork';
import WorkOvertime from './WorkOvertime';
import Document from './Document';
import BecomeRegular from './BecomeRegular';
import QuitOffice from './QuitOffice';
import Transaction from './Transaction';
import Lists from './Lists';
import Loading from './Loading';
import AppStore from '../stores/AppStore';
import APIUtils from './APIUtils';
import AppActionCreators from '../actions/AppActionCreators';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            staffId: AppStore.getStaffid(),
            isLoading: AppStore.getIsLoading(),        //显示加载中遮罩层
            activedListIndex: AppStore.getActivedListIndex(),
            lists: AppStore.getLists(),
            showController: AppStore.getShowController(),
            applyFormArr: AppStore.getApplyFormArr(),
            applyType: AppStore.getApplyType(),
            applyDetailList: AppStore.getApplyDetailList(),
            activedApplyId: AppStore.getActivedApplyId(),
            signContent: AppStore.getSignContent(),
            signStatus: AppStore.getSignStatus(),
        };

        this.onAppChange = this.onAppChange.bind(this);
        this.getUrlParam = this.getUrlParam.bind(this);
    };

    onAppChange() {
        this.setState({
            staffId: AppStore.getStaffid(),
            isLoading: AppStore.getIsLoading(),        //显示加载中遮罩层
            activedListIndex: AppStore.getActivedListIndex(),
            lists: AppStore.getLists(),
            showController: AppStore.getShowController(),
            applyFormArr: AppStore.getApplyFormArr(),
            applyType: AppStore.getApplyType(),
            applyDetailList: AppStore.getApplyDetailList(),
            activedApplyId: AppStore.getActivedApplyId(),
            signContent: AppStore.getSignContent(),
            signStatus: AppStore.getSignStatus(),
        });
    };

    getUrlParam(name){  
        //构造一个含有目标参数的正则表达式对象  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");  
        //匹配目标参数  
        var r = window.location.search.substr(1).match(reg);  
        //返回参数值  
        if (r!== null) return unescape(r[2]);  
        return null;  
    };

    componentDidMount() {      
        AppStore.addChangeListener(this.onAppChange);

        let notice = this.getUrlParam('notice');
        let staffId = this.getUrlParam('staffId');
        AppActionCreators.updateStaffid(staffId);

        //判断是进入我提交的、提交给我的、归档列表
        let to = this.getUrlParam('to');
        if (to - 0 ) {
            AppActionCreators.updateActivedListIndex(to);
        }
    
        //如果是来自通知的请求，要打开对应的详情页
        if (notice === 'yes') {
            let activedListIndex = this.getUrlParam('activedListIndex') - 0;
            let applyType = this.getUrlParam('applyType');
            let activedApplyId = this.getUrlParam('activedApplyId');

            AppActionCreators.updateActivedListIndex(activedListIndex);
            AppActionCreators.updateActivedApplyId(activedApplyId);
            AppActionCreators.updateApplyType(applyType);

            //判断是否是签报,不是就进行React，是就进行页面跳转
            if (applyType !== '3') {
                
                //显示detail记录
                APIUtils.detail(activedListIndex, activedApplyId);
            } else {
                AppActionCreators.showLoading();
                //签报，归档的去detail页面，提交给我的去add页面，我提交的要根据modifyFlag === “1”去detail,或者modify_document
                switch (activedListIndex) {
                    case 0:
                        window.location.href = `${ctx}/document_mobile/develop/modify_document/${activedApplyId}?staffId=${staffId}`;
                        break;
                    case 1:
                        window.location.href = `${ctx}/document_mobile/develop/add/${activedApplyId}?staffId=${staffId}`;
                        break;
                    case 2:
                        window.location.href = `${ctx}/document_mobile/develop/detail/${activedApplyId}?from=${activedListIndex}&staffId=${staffId}`;
                        break;
                    default:
                        break;
                }
            }
        } else {
            APIUtils.initList();
        }
    };

    componentWillUnmount() {
        AppStore.removeChangeListener(this.onAppChange);
    };

    render() {
        return (
            <div>
                <Lists 
                    isCurrent={this.state.showController.isLists}
                    activedListIndex={this.state.activedListIndex} 
                    list={this.state.lists[this.state.activedListIndex]}
                    applyDetailList={this.state.applyDetailList}
                    />

                <NewBusinessTravel
                    isCurrent={this.state.showController.isNewBusinessTravel} 
                    blankForm={this.state.applyFormArr[this.state.applyType]}
                    />

                <BusinessTravel
                    isCurrent={this.state.showController.isBusinessTravel} 
                    activedListIndex={this.state.activedListIndex} 
                    detail={this.state.applyDetailList[this.state.activedListIndex][this.state.activedApplyId]}
                    staffId={this.state.staffId} 
                    signContent={this.state.signContent}
                    signStatus={this.state.signStatus}
                    />

                <NewOffWork
                    isCurrent={this.state.showController.isNewOffWork} 
                    blankForm={this.state.applyFormArr[this.state.applyType]}
                    />

                <OffWork
                    isCurrent={this.state.showController.isOffWork} 
                    activedListIndex={this.state.activedListIndex} 
                    detail={this.state.applyDetailList[this.state.activedListIndex][this.state.activedApplyId]}
                    staffId={this.state.staffId} 
                    signContent={this.state.signContent}
                    signStatus={this.state.signStatus}
                    />

                <NewWorkOvertime
                    isCurrent={this.state.showController.isNewWorkOvertime} 
                    blankForm={this.state.applyFormArr[this.state.applyType]}
                    />

                <WorkOvertime
                    isCurrent={this.state.showController.isWorkOvertime} 
                    activedListIndex={this.state.activedListIndex} 
                    detail={this.state.applyDetailList[this.state.activedListIndex][this.state.activedApplyId]}
                    staffId={this.state.staffId} 
                    signContent={this.state.signContent}
                    signStatus={this.state.signStatus}
                    />

                <BecomeRegular
                    isCurrent={this.state.showController.isBecomeRegular} 
                    activedListIndex={this.state.activedListIndex} 
                    detail={this.state.applyDetailList[this.state.activedListIndex][this.state.activedApplyId]}
                    staffId={this.state.staffId} 
                    signContent={this.state.signContent}
                    signStatus={this.state.signStatus}
                    />

                <QuitOffice
                    isCurrent={this.state.showController.isQuitOffice} 
                    activedListIndex={this.state.activedListIndex} 
                    detail={this.state.applyDetailList[this.state.activedListIndex][this.state.activedApplyId]}
                    staffId={this.state.staffId} 
                    signContent={this.state.signContent}
                    signStatus={this.state.signStatus}
                    />

                <Transaction
                    isCurrent={this.state.showController.isTransaction} 
                    activedListIndex={this.state.activedListIndex} 
                    detail={this.state.applyDetailList[this.state.activedListIndex][this.state.activedApplyId]}
                    staffId={this.state.staffId} 
                    signContent={this.state.signContent}
                    signStatus={this.state.signStatus}
                    />

                <NewDocument
                    isCurrent={this.state.showController.isNewDocument} 
                    blankForm={this.state.applyFormArr[this.state.applyType]}
                    />

                <Document
                    isCurrent={this.state.showController.isDocument} 
                    activedListIndex={this.state.activedListIndex} 
                    detail={this.state.applyDetailList[this.state.activedListIndex][this.state.activedApplyId]}
                    staffId={this.state.staffId} 
                    signContent={this.state.signContent}
                    signStatus={this.state.signStatus}
                    />


                <Loading isLoading={this.state.isLoading} />

            </div>
        );
    };
}