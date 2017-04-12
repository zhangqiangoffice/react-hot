var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

let isLoading = false;      //是否显示遮罩，默认隐藏
let staffid = '35682';        //员工ID
let lists = [[], [], []];     //列表数组，[0]我提交的，[1]提交给我的,[2]归档
let activedListIndex = 0;       //当前活动的列表的索引，0我提交的，1提交给我的
let showController = {      //组件显隐控制器
    isLists: true,
    isNewBusinessTravel: false,
    isBusinessTravel: false,
    isNewOffWork: false,
    isOffWork: false,
    isNewWorkOvertime: false,
    isWorkOvertime: false,
    isBecomeRegular: false,
    isQuitOffice: false,
    isTransaction: false,
    isDocument: false,
};
let applyFormArr = [];      //申请空白表格数组
let canNewApply = [false, false, false, '签报申请', '公出申请', '请假申请', '加班申请'];       //可新增的申请类型
let applyType = '';      //当前激活的申请类型，0:转正申请;1:离职申请;2:人事异动申请;3:签报申请;4:公出申请;5:请假申请;6:加班申请
let activedApplyId = '';        //当前激活申请id
let applyDetailList = [{}, {}, {}];     //详情集合,0:我提交的,1提交给我的:,2归档:
// let applyDealList = {};     //提交给我的列表详情集合
let signContent = '';       //审批意见内容
let signStatus = '1';     //审批意见 1同意 或 2驳回
let signId = '';        //当前审批ID
let isAskingMore1 = true;        //是否正在请求更多list 
let isAskingMore2 = true;        //是否正在请求更多list 
let isAskingMore3 = true;        //是否正在请求更多list 
let page1 = 1;      //我的提交的列表页数
let page2 = 1;      //提交我的列表页数
let page3 = 1;      //归档列表页数


//显示loading遮罩层
function showLoading() {
    isLoading = true;
}

//隐藏loading遮罩层
function hideLoading() {
    isLoading = false;
}

//往list中添加数据
function addList(index, list) {
    lists[index] = lists[index].concat(list);
}

//更新staffid
function updateStaffid(id) {
    staffid = id;
}

//修改当前活动的列表的索引
function updateActivedListIndex(index) {
    activedListIndex = index - 0;
}

//修改组件显示控制器
function showComponent(name) {
    showController.isLists = false;
    showController.isNewBusinessTravel = false;
    showController.isBusinessTravel = false;
    showController.isNewOffWork = false;
    showController.isOffWork = false;
    showController.isNewWorkOvertime = false;
    showController.isWorkOvertime = false;
    showController.isBecomeRegular = false;
    showController.isQuitOffice = false;
    showController.isTransaction = false;
    showController.isDocument = false;

    showController['is' + name] = true;
}

//新增某一类型的申请的空白表格
function addNewBlankForm(index, obj) {
    applyFormArr[index] = obj;
}

//更新当前激活的申请id
function updateActivedApplyId(id) {
    activedApplyId = id;
}

//新增申请详情
function addApplyDetailList(index, id, obj) {
    applyDetailList[index][id] = obj;
}

//新增申请审批详情
function addApplyDealList(id, obj) {
    applyDealList[id] = obj;
}

//修改审批意见内容
function changeSignContent(event) {
    let val = event.target.value.trim();
    let id = event.target.dataset.id;
    signContent = val;
    signId = id;
}

//修改审批意见 同意 或 驳回
function switchSignStatus() {
    signStatus = (signStatus === '1' ? '2' : '1');
}

//更新申请类型
function updateApplyType(type) {
    applyType = type;
}

//更新是否正在请求更多list
function updateIsAskingMore1(flag) {
    isAskingMore1 = flag;
}

//更新是否正在请求更多list
function updateIsAskingMore2(flag) {
    isAskingMore2 = flag;
}

//更新是否正在请求更多list
function updateIsAskingMore3(flag) {
    isAskingMore3 = flag;
}

//page1自增1
function addPage1() {
    page1++;
}

//page2自增2
function addPage2() {
    page2++;
}

//page3自增3
function addPage3() {
    page3++;
}

//reload重新刷新一下页面和数据，用于提交新审批后的页面刷新
function reload() {
    lists = [[], [], []];       //列表内容要清空
    applyDetailList[0] = {};        //我提交的详情内容要清空  
    page1 = 1;      //我的提交的列表页数
    page2 = 1;      //提交我的列表页数
    page3 = 1;      //提交归档页数
}

//根据当前的applyType显示不同的组件
function showApplyment() {
    switch (applyType) {
        case '0':
            showComponent('BecomeRegular');
            break;
        case '1':
            showComponent('QuitOffice');
            break;
        case '2':
            showComponent('Transaction');
            break;
        case '3':
            showComponent('Document');
            break;
        case '4':
            showComponent('BusinessTravel');
            break;
        case '5':
            showComponent('OffWork');
            break;
        case '6':
            showComponent('WorkOvertime');
            break;
        default:
            break;
    }
}

function emitChange() {
    AppStore.emit(CHANGE_EVENT);
}

var AppStore = assign({}, EventEmitter.prototype, {
    
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getStaffid: function() {
        return staffid;
    },

    getIsLoading: function() {
        return isLoading;
    },

    getActivedListIndex: function() {
        return activedListIndex;
    },

    getLists: function() {
        return lists;
    },

    getShowController: function() {
        return showController;
    },

    getApplyType: function() {
        return applyType;
    },

    getApplyFormArr: function() {
        return applyFormArr;
    },

    getApplyDetailList: function() {
        return applyDetailList;
    },

    getActivedApplyId: function() {
        return activedApplyId;
    },

    getApplyDealList: function() {
        return applyDealList;
    },

    getSignContent: function() {
        return signContent;
    },

    getSignStatus: function() {
        return signStatus;
    },

    getSignId: function() {
        return signId;
    },

    getIsAskingMore1: function() {
        return isAskingMore1;
    },

    getIsAskingMore2: function() {
        return isAskingMore2;
    },

    getIsAskingMore3: function() {
        return isAskingMore3;
    },

    getPage1: function() {
        return page1;
    },

    getPage2: function() {
        return page2;
    },

    getPage3: function() {
        return page3;
    },

    getCanNewApply: function() {
        return canNewApply;
    }

});

function handleAction(action) {
    switch (action.type) {
        case 'show_loading':
            showLoading();
            emitChange();
            break;
        case 'hide_loading':
            hideLoading();
            emitChange();
            break;
        case 'add_list':
            addList(action.index, action.list);
            emitChange();
            break;
        case 'update_activedListIndex':
            updateActivedListIndex(action.index);
            emitChange();
            break;
        case 'show_component':
            showComponent(action.name);
            emitChange();
            break;
        case 'addNewBlankForm':
            addNewBlankForm(action.index, action.obj);
            emitChange();
            break;
        case 'update_placeDatas':
            updatePlaceDatas(action.index, action.obj);
            emitChange();
            break;
        case 'addApplyDetailList':
            addApplyDetailList(action.index, action.id, action.obj);
            emitChange();
            break;
        case 'updateActivedApplyId':
            updateActivedApplyId(action.id);
            emitChange();
            break;
        case 'addApplyDealList':
            addApplyDealList(action.id, action.obj);
            emitChange();
            break;
        case 'changeSignContent':
            changeSignContent(action.event);
            emitChange();
            break;
        case 'switchSignStatus':
            switchSignStatus();
            emitChange();
            break;
        case 'updateApplyType':
            updateApplyType(action.apply_type);
            emitChange();
            break;
        case 'updateStaffid':
            updateStaffid(action.id);
            emitChange();
            break;
        case 'updateIsAskingMore1':
            updateIsAskingMore1(action.flag);
            emitChange();
            break;
        case 'updateIsAskingMore2':
            updateIsAskingMore2(action.flag);
            emitChange();
            break;
        case 'updateIsAskingMore3':
            updateIsAskingMore3(action.flag);
            emitChange();
            break;
        case 'addPage1':
            addPage1();
            emitChange();
            break;
        case 'addPage2':
            addPage2();
            emitChange();
            break;
        case 'addPage3':
            addPage3();
            emitChange();
            break;
        case 'reload':
            reload();
            emitChange();
            break;
        case 'showApplyment':
            showApplyment();
            emitChange();
            break;
        default: // ... do nothing
            break;
    }
}

AppStore.dispatchToken = AppDispatcher.register(handleAction);
module.exports = AppStore;

