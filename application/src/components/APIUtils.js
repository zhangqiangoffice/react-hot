import AppActionCreators from '../actions/AppActionCreators';
import AppStore from '../stores/AppStore';
import NewBusinessTravel from './NewBusinessTravel';

module.exports = {
    
    //初始化列表信息
    initList: function() {
        AppActionCreators.showLoading();
        
        let datas0 = {
            staffId: AppStore.getStaffid(),
            page: 1,
        };

        //请求第一页我提交的
        $.ajax({
            type: "post",
            url: ctx + "/document_mobile/develop/h5api_send",
            data: datas0,
            dataType: "json",
            success: function(msg) {
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
        });

        //请求第一页提交我的
        $.ajax({
            type: "post",
            url: ctx + "/document_mobile/develop/h5api_receive",
            data: datas0,
            dataType: "json",
            success: function(msg) {
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
        });

        //请求第一页归档
        $.ajax({
            type: "post",
            url: ctx + "/document_mobile/develop/h5api_pigeonhole",
            data: datas0,
            dataType: "json",
            success: function(msg) {
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
        });

        let blankForms = AppStore.getApplyFormArr();

        //如果公出申请的空表格不存在,请求后台数据
        if (!blankForms[4]) {
            let datas4 = {
                staffId: AppStore.getStaffid(),
                applyType: 4,
            };
            $.ajax({
                type: "post",
                url: ctx + "/application_mobile/add_apply",
                data: datas4,
                dataType: "json",
                success: function(msg) {
                    if (msg.result === 1) {
                        AppActionCreators.addNewBlankForm(4, msg);
                    } else {
                        alert(msg.message);
                    }
                }
            });
        }

        //如果请假申请的空表格不存在,请求后台数据
        if (!blankForms[5]) {
            let datas5 = {
                staffId: AppStore.getStaffid(),
                applyType: 5,
            };
            $.ajax({
                type: "post",
                url: ctx + "/application_mobile/add_apply",
                data: datas5,
                dataType: "json",
                success: function(msg) {
                    if (msg.result === 1) {
                        AppActionCreators.addNewBlankForm(5, msg);
                    } else {
                        alert(msg.message);
                    }
                }
            });
        }

        //如果加班申请的空表格不存在,请求后台数据
        if (!blankForms[6]) {
            let datas6 = {
                staffId: AppStore.getStaffid(),
                applyType: 6,
            };
            $.ajax({
                type: "post",
                url: ctx + "/application_mobile/add_apply",
                data: datas6,
                dataType: "json",
                success: function(msg) {
                    if (msg.result === 1) {
                        AppActionCreators.addNewBlankForm(6, msg);
                    } else {
                        alert(msg.message);
                    }
                }
            });
        }
    },

    //更多的我提交的审批
    moreMy: function() {
        AppActionCreators.updateIsAskingMore1(true);
        let datas = {
            staffId: AppStore.getStaffid(),
            page: AppStore.getPage1(),
        };

        $.ajax({
            type: "post",
            url: ctx + "/document_mobile/develop/h5api_send",
            data: datas,
            dataType: "json",
            success: function(msg) {
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
        });
    },

    //更多的提交给我审批
    moreToMe: function() {
        AppActionCreators.updateIsAskingMore2(true);
        let datas = {
            staffId: AppStore.getStaffid(),
            page: AppStore.getPage2(),
        };

        $.ajax({
            type: "post",
            url: ctx + "/document_mobile/develop/h5api_receive",
            data: datas,
            dataType: "json",
            success: function(msg) {
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
        });
    },


    //获取审批的详情
    detail: function(index, id) {
        AppActionCreators.showLoading();
        let urlArr = ['/application_mobile/detail', '/application_mobile/deal', '/document_mobile/develop/detail']
        $.ajax({
            type: "post",
            url: ctx + urlArr[index],
            data: {id: id, staffId: AppStore.getStaffid()},
            dataType: "json",
            success: function(msg) {
                AppActionCreators.hideLoading();
                if (msg.result === 1) {
                    AppActionCreators.addApplyDetailList(index, id, msg);
                    AppActionCreators.showApplyment();
                } else {
                    alert(msg.message);
                }
            }
        });
    },

    //提交审批意见
    deal_application: function() {
        console.log('deal_application');
        if (!AppStore.getSignContent()) {
            alert('签批意见不能为空！');
            return false;
        }

        console.log(123);
        AppActionCreators.showLoading();
        let datas = {
            id: AppStore.getSignId(),
            signStatus: AppStore.getSignStatus(),
            signContent: AppStore.getSignContent(),
            applyId: AppStore.getActivedApplyId(),
            staffId: AppStore.getStaffid(),
            applyType: AppStore.getApplyType(),

        }

        $.ajax({
            type: "post",
            url: ctx + "/application_mobile/deal_application",
            data: datas,
            dataType: "json",
            success: function(msg) {
                if (msg.result === 1) {
                    AppActionCreators.showComponent('Lists');
                    alert('提交成功！');
                    window.location.reload();
                } else {
                    alert(msg.message);
                }
            }
        });
    }
}
