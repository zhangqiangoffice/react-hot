var AppDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {
    updateInsuranceCom: function (id) {
        var action = {
            type: 'update_insuranceCom',
            id: id
        };
        AppDispatcher.dispatch(action);
    },

    changeOffers: function (offer) {
        var action = {
            type: 'change_offers',
            offer: offer
        };
        AppDispatcher.dispatch(action);
    },

    updateSerial: function (num) {
        var action = {
            type: 'update_serial',
            num: num
        };
        AppDispatcher.dispatch(action);
    },

    updateDeliveryType: function (index) {
        var action = {
            type: 'update_deliveryType',
            index: index
        };
        AppDispatcher.dispatch(action);
    },

    updateSchemeIndex: function(index) {
        var action = {
            type: 'update_schemeIndex',
            index: index
        };
        AppDispatcher.dispatch(action);
    },

    updateBeginDate: function(event) {
        var action = {
            type: 'update_beginDate',
            event: event
        };
        AppDispatcher.dispatch(action);
    },

    toggleCiFlag: function() {
        var action = {
            type: 'toggle_ciFlag'
        };
        AppDispatcher.dispatch(action);
    },

    toggleDedu: function(code) {
        var action = {
            type: 'toggle_dedu',
            code: code
        };
        AppDispatcher.dispatch(action);
    },

    changeDedu: function(code, flag) {
        var action = {
            type: 'change_dedu',
            code,
            flag,
        };
        AppDispatcher.dispatch(action);
    },

    changeInsuranceItem: function(code, item) {
        var action = {
            type: 'change_insurance_item',
            code: code,
            item: item
        };
        AppDispatcher.dispatch(action);
    },

    handleChange: function(event, name) {
        var action = {
            type: 'handle_change',
            event: event,
            name: name
        };
        AppDispatcher.dispatch(action);
    },

    toggleSameAs: function() {
        var action = {
            type: 'toggle_sameAs'
        };
        AppDispatcher.dispatch(action);
    },

    updateProvinceDatas: function(msg) {
        var action = {
            type: 'updateProvinceDatas',
            msg: msg,
        };
        AppDispatcher.dispatch(action);
    },

    changeProvince: function(obj) {
        var action = {
            type: 'changeProvince',
            obj: obj,
        };
        AppDispatcher.dispatch(action);
    },

    changeTbProvince: function(obj) {
        var action = {
            type: 'changeTbProvince',
            obj: obj,
        };
        AppDispatcher.dispatch(action);
    },

    updateCityDatas: function(no, obj) {
        var action = {
            type: 'updateCityDatas',
            no,
            obj,
        };
        AppDispatcher.dispatch(action);
    },

    changeCity: function(obj) {
        var action = {
            type: 'changeCity',
            obj,
        };
        AppDispatcher.dispatch(action);
    },

    changeTbCity: function(obj) {
        var action = {
            type: 'changeTbCity',
            obj,
        };
        AppDispatcher.dispatch(action);
    },

    updateCountyDatas: function(no, obj) {
        var action = {
            type: 'updateCountyDatas',
            no,
            obj,
        };
        AppDispatcher.dispatch(action);
    },

    changeCounty: function(obj) {
        var action = {
            type: 'changeCounty',
            obj,
        };
        AppDispatcher.dispatch(action);
    },

    clearQuote: function() {
        var action = {
            type: 'clearQuote',
        };
        AppDispatcher.dispatch(action);
    },

    reset: function() {
        var action = {
            type: 'reset',
        };
        AppDispatcher.dispatch(action);
    },

    initInsuranceEditData: function(insuranceCom, serial, msg) {
        var action = {
            type: 'initInsuranceEditData',
            insuranceCom,
            serial,
            msg,
        };
        AppDispatcher.dispatch(action);
    },

    updateStoresList: function(list) {
        var action = {
            type: 'updateStoresList',
            list,
        };
        AppDispatcher.dispatch(action);
    },

    updateStore: function(index) {
        var action = {
            type: 'updateStore',
            index,
        };
        AppDispatcher.dispatch(action);
    },

    initTBr: function(datas) {
        var action = {
            type: 'initTBr',
            datas,
        };
        AppDispatcher.dispatch(action);
    },

    changeBeginDate: function(text) {
        var action = {
            type: 'changeBeginDate',
            text,
        };
        AppDispatcher.dispatch(action);
    },

    initBlankBbr: function(datas) {
        var action = {
            type: 'initBlankBbr',
            datas,
        };
        AppDispatcher.dispatch(action);
    },

    changeTwoBeginDate: function(tra_date, bus_date) {
        var action = {
            type: 'changeTwoBeginDate',
            tra_date,
            bus_date,
        };
        AppDispatcher.dispatch(action);
    },

    changeTraBeginDate: function(tra_date) {
        var action = {
            type: 'changeTraBeginDate',
            tra_date,
        };
        AppDispatcher.dispatch(action);
    },

    changeContactAddress: function(list) {
        var action = {
            type: 'changeContactAddress',
            list,
            
        };
        console.log(list);
        AppDispatcher.dispatch(action);
    },

    changeAddressBookShow: function(list) {
        var action = {
            type: 'changeAddressBookShow' 
        };
        AppDispatcher.dispatch(action);
    },

    updateStakeholderAddress: function(obj) {
        var action = {
            type: 'updateStakeholderAddress',
            obj, 
        };
        AppDispatcher.dispatch(action);
    },

    initBBrAsOwner: function(name, no) {
        var action = {
            type: 'initBBrAsOwner',
            name,
            no, 
        };
        AppDispatcher.dispatch(action);
    },

    updateUsedTimes: function(tp, zh) {
        var action = {
            type: 'updateUsedTimes',
            tp,
            zh, 
        };
        AppDispatcher.dispatch(action);
    },
   
};