import AppActionCreators from '../actions/AppActionCreators';
import AppStore from '../stores/AppStore';
import NewBusinessTravel from './NewBusinessTravel';
import zAJAX from 'z-ajax'

module.exports = {
    
    //初始化列表信息
    initList: function() {
        AppActionCreators.showLoading();
        
        let datas0 = {
            staffId: AppStore.getStaffid(),
            page: 1,
        };

        //请求第一页我提交的
        let cb0 = msg => {
            AppActionCreators.hideLoading();
            if (msg.result === 1) {
                if (msg.list.length) {
                    AppActionCreators.updateIsAskingMore1(false);
                    AppActionCreators.addPage1();
                    AppActionCreators.addList(0, msg.list);
                }
            } else {
                alert(msg.message);
            }
        }

        zAJAX(`${ctx}/document_mobile/develop/h5api_send`, datas0, cb0)

        //请求第一页提交我的
        let cb1 = msg => {
            if (msg.result === 1) {
                if (msg.list.length) {
                    AppActionCreators.updateIsAskingMore2(false);
                    AppActionCreators.addPage2();
                    AppActionCreators.addList(1, msg.list);
                }
            } else {
                alert(msg.message);
            }
        }

        zAJAX(`${ctx}/document_mobile/develop/h5api_receive`, datas0, cb1)

        //请求第一页归档
        let cb2 = msg => {
            if (msg.result === 1) {
                if (msg.list.length) {
                    AppActionCreators.updateIsAskingMore3(false);
                    AppActionCreators.addPage3();
                    AppActionCreators.addList(2, msg.list);
                }
            } else {
                alert(msg.message);
            }
        }

        zAJAX(`${ctx}/document_mobile/develop/h5api_pigeonhole`, datas0, cb2)

        let blankForms = AppStore.getApplyFormArr();

        //如果公出申请的空表格不存在,请求后台数据
        if (!blankForms[4]) {
            let datas4 = {
                staffId: AppStore.getStaffid(),
                applyType: 4,
            };

            let cb = msg => {
                if (msg.result === 1) {
                    AppActionCreators.addNewBlankForm(0, msg);
                } else {
                    alert(msg.message);
                }
            }

            zAJAX(`${ctx}/application_mobile/add_apply`, datas4, cb)
        }

        //如果请假申请的空表格不存在,请求后台数据
        if (!blankForms[5]) {
            let datas5 = {
                staffId: AppStore.getStaffid(),
                applyType: 5,
            };

            let cb = msg => {
                if (msg.result === 1) {
                    AppActionCreators.addNewBlankForm(1, msg);
                } else {
                    alert(msg.message);
                }
            }

            zAJAX(`${ctx}/application_mobile/add_apply`, datas5, cb)

        }

        //如果加班申请的空表格不存在,请求后台数据
        if (!blankForms[6]) {
            let datas6 = {
                staffId: AppStore.getStaffid(),
                applyType: 6,
            };

            let cb = msg => {
                if (msg.result === 1) {
                    AppActionCreators.addNewBlankForm(2, msg);
                } else {
                    alert(msg.message);
                }
            }

            zAJAX(`${ctx}/application_mobile/add_apply`, datas6, cb)

        }

        let cb3 = msg => {
            if (msg.result === '1') {
                AppActionCreators.extendCanNewApply(msg.categorys);
            } else {
                alert(msg.message);
            }
        }

        //获取签报大类
        zAJAX(`${ctx}/document_mobile/develop/get_categorys`, {staffId: AppStore.getStaffid()}, cb3)
    },

    //更多的我提交的审批
    moreMy: function() {
        AppActionCreators.updateIsAskingMore1(true);
        let datas = {
            staffId: AppStore.getStaffid(),
            page: AppStore.getPage1(),
        };

        let cb = msg => {
            if (msg.result === 1) {
                if (msg.list.length) {
                    AppActionCreators.updateIsAskingMore1(false);
                    AppActionCreators.addPage1();
                    AppActionCreators.addList(0, msg.list);
                }
            } else {
                alert(msg.message);
            }
        }

        zAJAX(`${ctx}/document_mobile/develop/h5api_send`, datas, cb)
    },

    //更多的提交给我审批
    moreToMe: function() {
        AppActionCreators.updateIsAskingMore2(true);
        let datas = {
            staffId: AppStore.getStaffid(),
            page: AppStore.getPage2(),
        };

        let cb = msg => {
            if (msg.result === 1) {
                if (msg.list.length) {
                    AppActionCreators.updateIsAskingMore2(false);
                    AppActionCreators.addPage2();
                    AppActionCreators.addList(1, msg.list);
                }
            } else {
                alert(msg.message);
            } 
        }

        zAJAX(`${ctx}/document_mobile/develop/h5api_receive`, datas, cb)
    },


    //获取审批的详情
    detail: function(index, id) {
        AppActionCreators.showLoading();
        let urlArr = ['/application_mobile/detail', '/application_mobile/deal', '/document_mobile/develop/detail']
        let cb = msg => {
            AppActionCreators.hideLoading();
            if (msg.result === 1) {
                AppActionCreators.addApplyDetailList(index, id, msg);
                AppActionCreators.showApplyment();
            } else {
                alert(msg.message);
            } 
        }

        zAJAX(ctx + urlArr[index], {id: id, staffId: AppStore.getStaffid()}, cb)
    },

    //提交审批意见
    deal_application: function() {
        if (!AppStore.getSignContent()) {
            alert('签批意见不能为空！');
            return false;
        }

        AppActionCreators.showLoading();
        let datas = {
            id: AppStore.getSignId(),
            signStatus: AppStore.getSignStatus(),
            signContent: AppStore.getSignContent(),
            applyId: AppStore.getActivedApplyId(),
            staffId: AppStore.getStaffid(),
            applyType: AppStore.getApplyType(),

        }

        let cb = msg => {
            AppActionCreators.hideLoading();
            if (msg.result === 1) {
                // AppActionCreators.showComponent('Lists');
                alert('提交成功！');
                let first = (window.location.href).split('?')[0];
                window.location.href = `${first}?staffId=${AppStore.getStaffid()}`;
                // window.location.reload();
            } else {
                alert(msg.message);
            }  
        }

        zAJAX(`${ctx}/application_mobile/deal_application`, datas, cb)
    }
}
