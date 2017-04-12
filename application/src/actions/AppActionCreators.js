var AppDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {
    showLoading: function () {
        var action = {
            type: 'show_loading'
        };
        AppDispatcher.dispatch(action);
    },

    hideLoading: function () {
        var action = {
            type: 'hide_loading'
        };
        AppDispatcher.dispatch(action);
    },

    updateStaffid: function (id) {
        var action = {
            type: 'updateStaffid',
            id,
        };
        AppDispatcher.dispatch(action);
    },

    addList: function(index, list) {
        var action = {
            type: 'add_list',
            index: index,
            list: list
        };
        AppDispatcher.dispatch(action);
    },

    updateActivedListIndex: function(index) {
        var action = {
            type: 'update_activedListIndex',
            index: index
        };
        AppDispatcher.dispatch(action);
    },

    showComponent: function(name) {
        var action = {
            type: 'show_component',
            name: name
        };
        AppDispatcher.dispatch(action);
    },

    addNewBlankForm: function(index, obj) {
        var action = {
            type: 'addNewBlankForm',
            obj: obj,
            index: index
        };
        AppDispatcher.dispatch(action);
    },

    updatePlaceDatas: function(index, obj) {
        var action = {
            type: 'update_placeDatas',
            index: index,
            obj: obj
        };
        AppDispatcher.dispatch(action);
    },

    addApplyDetailList: function(index, id, obj) {
        var action = {
            type: 'addApplyDetailList',
            index,
            id,
            obj
        };
        AppDispatcher.dispatch(action);
    },

    updateActivedApplyId: function(id) {
        var action = {
            type: 'updateActivedApplyId',
            id
        };
        AppDispatcher.dispatch(action);
    },

    addApplyDealList: function(id, obj) {
        var action = {
            type: 'addApplyDealList',
            id,
            obj
        };
        AppDispatcher.dispatch(action);
    },

    changeSignContent: function(event) {
        var action = {
            type: 'changeSignContent',
            event,
        };
        AppDispatcher.dispatch(action);
    },

    switchSignStatus: function() {
        var action = {
            type: 'switchSignStatus',
        };
        AppDispatcher.dispatch(action);
    },

    updateApplyType: function(apply_type) {
        var action = {
            type: 'updateApplyType',
            apply_type,
        };
        AppDispatcher.dispatch(action);
    },

    updateIsAskingMore1: function(flag) {
        var action = {
            type: 'updateIsAskingMore1',
            flag,
        };
        AppDispatcher.dispatch(action);
    },

    updateIsAskingMore2: function(flag) {
        var action = {
            type: 'updateIsAskingMore2',
            flag,
        };
        AppDispatcher.dispatch(action);
    },

    updateIsAskingMore3: function(flag) {
        var action = {
            type: 'updateIsAskingMore3',
            flag,
        };
        AppDispatcher.dispatch(action);
    },

    addPage1: function() {
        var action = {
            type: 'addPage1',
        };
        AppDispatcher.dispatch(action);
    },

    addPage2: function() {
        var action = {
            type: 'addPage2',
        };
        AppDispatcher.dispatch(action);
    },

    addPage3: function() {
        var action = {
            type: 'addPage3',
        };
        AppDispatcher.dispatch(action);
    },

    reload: function() {
        var action = {
            type: 'reload',
        };
        AppDispatcher.dispatch(action);
    },

    showApplyment: function() {
        var action = {
            type: 'showApplyment',
        };
        AppDispatcher.dispatch(action);
    },
    
};