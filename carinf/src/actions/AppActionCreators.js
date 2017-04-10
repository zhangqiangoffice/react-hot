var AppDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {
    changeLoading: function () {
        var action = {
            type: 'changeLoading'
        };
        AppDispatcher.dispatch(action);
    },

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

    stepGoBack: function () {
        var action = {
            type: 'step_go_back'
        };
        AppDispatcher.dispatch(action);
    },

    stepGoStakeholder: function(fromPage) {
        var action = {
            type: 'stepGoStakeholder',
            fromPage,
        };
        AppDispatcher.dispatch(action);
    },

    stepGoFirst: function () {
        var action = {
            type: 'step_go_first'
        };
        AppDispatcher.dispatch(action);
    },

    stepNext: function () {
        var action = {
            type: 'step_next'
        };
        AppDispatcher.dispatch(action);
    },

    showRadioSelector: function (obj) {
        var action = {
            type: 'show_radioSelector',
            obj: obj
        };
        AppDispatcher.dispatch(action);
    },

    hideRadioSelector: function () {
        var action = {
            type: 'hide_radioSelector'
        };
        AppDispatcher.dispatch(action);
    },

    showSubFrame: function () {
        var action = {
            type: 'show_subFrame'
        };
        AppDispatcher.dispatch(action);
    },

    hideSubFrame: function () {
        var action = {
            type: 'hide_subFrame'
        };
        AppDispatcher.dispatch(action);
    },

    initAppEditData: function(cid, workNum) {
        var action = {
            type: 'initAppEditData',
            cid,
            workNum,
        };
        AppDispatcher.dispatch(action);
    },

    initPosition: function(position) {
        var action = {
            type: 'initPosition',
            position,
        };
        AppDispatcher.dispatch(action);
    },

    startAlertProgress: function() {
        var action = {
            type: 'startAlertProgress',
        }
        AppDispatcher.dispatch(action);
    },

    finishAlertProgress: function() {
        var action = {
            type: 'finishAlertProgress',
        }
        AppDispatcher.dispatch(action);
    }, 

    messageAlertProgress: function(msg) {
        var action = {
            type: 'messageAlertProgress',
            msg,
        }
        AppDispatcher.dispatch(action);
    },

    closeAlertProgress: function() {
        var action = {
            type: 'closeAlertProgress',
        }
        AppDispatcher.dispatch(action);
    },

    saveTempOrderNo: function(no, price) {
        var action = {
            type: 'saveTempOrderNo',
            no,
            price,
        }
        AppDispatcher.dispatch(action);
    }
};