import appInfo from '../components/asset/json/appInfo.json';
import CarStore from './CarStore';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var CHANGE_EVENT = 'change';

//投保日期定在当前日期的后1天
let d = new Date();
d = d.setDate(d.getDate() + 1);;
d = new Date(d);
const year = d.getFullYear();
const month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();

var insuranceCom = 3;       //所选择的保险公司,1太平洋，2太平，3中华，4人保
var tbPlace = {province:{name: '安徽省', no: '340000'}, city: {name: '', no: 0}}       //投保地区
var offers = [];        //保险公司报价结果集合，以公司id做为数组下标
var serial = '';        //民盛串号
var deliveryType = 0;       //配送方式 0:快递， 1：自取
var schemeIndex = 1;        //选中的套餐的索引,默认选择第二套
var beginDate = year + "-" + month + "-" + day + " 00:00:00";       //商业险保险起期
var traBeginDate = year + "-" + month + "-" + day +  " 00:00:00";       //交强险保险起期
var lastBeginDate = '';     //上次商业险到期日期
var lastTraBeginDate = '';      //上次交强险到期日期
var ciFlag = true;      //是否购买交强险
var threeSchemeList = appInfo.threeSchemeList;      //三套备选投保方案
var stakeholder = {         //保单相关方
        bbrName: '',     //被保人姓名
        bbrNo: '',
        bbrPhone: '',
        bbrEmail: '',

        tbrName: '',                        //投保人姓名
        tbrNo: '',                          //投保人证件号
        tbrPhone: '',                       //投保人电话
        tbrEmail: '',                       //投保人电子邮箱

        collectName: '',                    //收件人姓名
        collectPhone: '',                   //收件人电话
        collectAdd: '',              //收件地址

        add_province: '',             //收件省代码
        add_city: '',                 //收件市代码
        add_district: '',             //收件区县代码
        add_province_name: '',             //收件省
        add_city_name: '',                 //收件市
        add_district_name: '',             //收件区县

        store: {name: '', address: '', id: ''},       //取件门店

        sameAs: true,
        provinceDatas: false,       //省数据
        cityDatas: {},      //市数据
        countyDatas: {},        //县数据
        storesList: {},         //门店数据

    };
var contactAddress = [];    //业务员的常用保单投寄地址
var isShowAddress = false;  //是否显示选择地址的框

var unUsedTimes = {tp: 10, zh:10}; //报价次数

//更新投保公司和是否是私家车的时候，要判断保单配送方式，太平中华私家车必须快递0，其他必须自取1
function judgeDeliveryType() {
    let flag = (insuranceCom == 2 || insuranceCom == 3 ) && CarStore.getIsHome() === 1;
    updateDeliveryType(flag ? 0 : 1);
}

//更新所选择的保险公司
function updateInsuranceCom(id) {
    insuranceCom = id;
    // judgeDeliveryType();
}

//保存保险公司报价结果
function changeOffers(offer) {
    offers[insuranceCom] = offer;
    serial = offer.serial;
};

//更新所选投保方案的民盛串号
function updateSerial(num) {
    serial = num;
};

//更新支付方式
function updateDeliveryType(index) {
    deliveryType = index;
}

//更新所选择的保险方案套餐
function updateSchemeIndex(index) {
    schemeIndex = index;
}

//更新起保日期
function updateBeginDate(event) {
    beginDate = event.target.value.trim();
}

//切换是否购买交强险
function toggleCiFlag() {
    ciFlag = !ciFlag;
}

//切换不计免赔
function toggleDedu(code) {
    let index;
    // let index = threeSchemeList[schemeIndex].findIndex((el) => {
    //     return el.code === code;
    // });
    threeSchemeList[schemeIndex].map((el, index2) => {
        if (el.code === code) {
            index = index2;
        }
    });
    let choice = threeSchemeList[schemeIndex][index].choice
    console.log(!!choice);
    threeSchemeList[schemeIndex][index].choice = (choice ? 0 : -1);
}

//改变主险的选项
function changeInsuranceItem(code, item) {
    // let index = threeSchemeList[schemeIndex].findIndex((el) => {
    //     return el.code === code;
    // });
    let index;
    threeSchemeList[schemeIndex].map((el, index2) => {
        if (el.code === code) {
            index = index2;
        }
    });

    //主险之前的选择
    let before = threeSchemeList[schemeIndex][index].choice;
    threeSchemeList[schemeIndex][index].choice = item;

    //对应附加险的索引
    let index4 = false;
    let code2 = code.replace('1', '2');
    threeSchemeList[schemeIndex].map((el2, index3) => {
        if (el2.code === code2) {
            index4 = index3;
        }
    });

    
    //如果主险选择了“不投保”，则不计免赔要改为不投保
    if (item === '-1' && index4) {
        threeSchemeList[schemeIndex][index4].choice = -1;
    }

    console.log('item', item);
    console.log('index4',index4);
    console.log('before',before);
    console.log(item !== '-1' && index4 && before == -1);

    //如果主险选择了投保，则要判断，如果是从不投保转变为投保，不计免赔默认选中
    if (item !== '-1' && index4 && before == -1) {
        threeSchemeList[schemeIndex][index4].choice = 0;
    }
}

//处理input的输入
function handleChange(event, name) {
    let val = event.target.value.trim();
    stakeholder[name] = val;
}

//切换 同投保人
function toggleSameAs() {
    if (stakeholder.sameAs) {
        stakeholder.sameAs = false;
        stakeholder.tbrName = '';                        //投保人姓名
        stakeholder.tbrNo = '';                          //投保人证件号
        stakeholder.tbrPhone = '';                       //投保人电话
        stakeholder.tbrEmail = '';                       //投保人电子邮箱
    } else {
        stakeholder.sameAs = true;
    }
}

//更新省数据
function updateProvinceDatas(msg) {
    stakeholder.provinceDatas = msg;
}

//更新寄送地址省信息
function changeProvince(obj) {
    stakeholder.add_province = obj.no;
    stakeholder.add_province_name = obj.name;
    stakeholder.add_city = '';                //收件市
    stakeholder.add_city_name = '';                //收件市
    stakeholder.add_district = '';            //收件区县
    stakeholder.add_district_name = '';             //收件区县
}

//更新市数据
function updateCityDatas(no, obj) {
    stakeholder.cityDatas[no] = obj;
}

//更新寄送地址市信息
function changeCity(obj) {
    stakeholder.add_city = obj.no;
    stakeholder.add_city_name = obj.name;
    stakeholder.add_district = '';             //收件区县
    stakeholder.add_district_name = '';             //收件区县
}

//更新县数据
function updateCountyDatas(no, msg) {
    stakeholder.countyDatas[no] = msg;
}

//更新寄送地址县信息
function changeCounty(obj) {
    stakeholder.add_district = obj.no;
    stakeholder.add_district_name = obj.name;
}

//清空民盛串号和报价方案数组
function clearQuote() {
    offers = [];
    serial = '';
}

//恢复初始设定的数据
function reset() {
    insuranceCom = 3;       //所选择的保险公司
    offers = [];        //保险公司报价结果集合
    serial = '';        //民盛串号
    deliveryType = 0;       //配送方式0:快递，1自取
    schemeIndex = 1;        //选中的套餐的索引,默认选择第二套
    beginDate = year + "-" + month + "-" + day;       //保险起期
    ciFlag = true;      //是否购买交强险
    threeSchemeList = appInfo.threeSchemeList;      //三套备选投保方案
    stakeholder = {         //保单相关方
        bbrName: '',     //被保人姓名
        bbrNo: '',
        bbrPhone: '',
        bbrEmail: '',

        tbrName: '',                        //投保人姓名
        tbrNo: '',                          //投保人证件号
        tbrPhone: '',                       //投保人电话
        tbrEmail: '',                       //投保人电子邮箱

        collectName: '',                    //收件人姓名
        collectPhone: '',                   //收件人电话
        collectAdd: '',              //收件地址

        add_province: '',             //收件省
        add_city: '',                 //收件市
        add_district: '',             //收件区县
        add_province_name: '',             //收件省
        add_city_name: '',                 //收件市
        add_district_name: '',             //收件区县

        store: {name:'', address:'', id: ''},       //取件门店

        sameAs: true,

    }        
}

//订单详情初始化数据
function initInsuranceEditData (_insuranceCom, _serial, msg) {
    insuranceCom = _insuranceCom - 0;
    serial = _serial;
    stakeholder.bbrName = msg.ownerName;     //被保人姓名
    stakeholder.bbrNo = msg.idCard;
    stakeholder.sameAs = true; 
    tbPlace.city.no = msg.tbCity;
    
    msg.list = msg.bs_list;
    msg.traffRealPrm = msg.bz_list[0].prm || 0;
    msg.taxRealPrm = msg.bz_list[1].prm || 0;

    offers[insuranceCom] = msg;
}

//更新附近门店的数据
function updateStoresList(list) {
    stakeholder.storesList = list;
}

//更新选中的门店
function updateStore(index) {
    stakeholder.store = stakeholder.storesList[index];
}

//初始化被保人，如果被保人为空，则将车主信息注入被保人
function initBBrAsOwner(name, no) {
    // CarStore总是成立一个空对象
    // if (!stakeholder.bbrName) {
    //     console.log(CarStore);
        stakeholder.bbrName = name;
    // }
    // if (!stakeholder.bbrNo) {
        stakeholder.bbrNo = no;
    // }
}


//更改投保地区的省份
function changeTbProvince(obj) {
    tbPlace.province.no = obj.no;
    tbPlace.province.name = obj.name;
}

//更改投保城市
function changeTbCity(obj) {
    tbPlace.city.no = obj.no;
    tbPlace.city.name = obj.name;
}

//从编辑页面过来，初始化投被保人信息
function initTBr(datas) {
    stakeholder.bbrName = datas.bbrName;     //被保人姓名
    stakeholder.bbrNo = datas.bbrNo;
    stakeholder.bbrPhone = datas.bbrPhone;
    stakeholder.bbrEmail = datas.bbrEmail;

    stakeholder.tbrName = datas.tbrName;                        //投保人姓名
    stakeholder.tbrNo = datas.tbrNo;                          //投保人证件号
    stakeholder.tbrPhone = datas.tbrPhone;                       //投保人电话
    stakeholder.tbrEmail = datas.tbrEmail;                       //投保人电子邮箱

    stakeholder.sameAs = false;   

    tbPlace.city.no = datas.tbCity;
}

//当被保人信息为空时，填入车主信息作为被保人信息
function initBlankBbr(datas) {
    stakeholder.bbrName = datas.name;     //被保人姓名
    stakeholder.bbrNo = datas.idCard;
    stakeholder.sameAs = true; 
    tbPlace.city.no = datas.tbCity;
}

//mobiscroll插件修改起保日期
function changeBeginDate(text) {
    beginDate = text;
}

//从后台获取推荐投保日期
function changeTwoBeginDate(tra_date, bus_date) {
    lastBeginDate = bus_date ? bus_date : beginDate;
    lastTraBeginDate = tra_date ? tra_date : traBeginDate;
    if (new Date(lastBeginDate) > new Date(beginDate)) {
        beginDate = lastBeginDate
    }
    if (new Date(lastTraBeginDate) > new Date(traBeginDate)) {
        traBeginDate = lastTraBeginDate
    }

}

//修改交强险起保日期
function changeTraBeginDate(tra_date) {
    traBeginDate = tra_date;
}

//修改地址簿
function changeContactAddress(list) {
    contactAddress = list;
}

function changeAddressBookShow() {
    
    isShowAddress = !isShowAddress
}

//
function updateStakeholderAddress(obj) {
    stakeholder.collectName = obj.name
    stakeholder.collectPhone = obj.phone
    stakeholder.collectAdd = obj.address

    stakeholder.add_province = obj.province
    stakeholder.add_city = obj.region
    stakeholder.add_district = obj.county
    stakeholder.add_province_name = obj.provinceName
    stakeholder.add_city_name = obj.regionName
    stakeholder.add_district_name = obj.countyName
}

//修改已报价次数
function updateUnUsedTimes(tp, zh) {
    unUsedTimes.tp = 10 - tp;
    unUsedTimes.zh = 10 - zh;
    // body...
}

function emitChange() {
    InsuranceStore.emit(CHANGE_EVENT);
};

var InsuranceStore = assign({}, EventEmitter.prototype, {
    
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getInsuranceCom: function () {
        return insuranceCom;
    },

    getOffers: function() {
        return offers;
    },

    getSerial: function() {
        return serial;
    },

    getDeliveryType: function() {
        return deliveryType;
    },

    getSchemeIndex: function() {
        return schemeIndex;
    },

    getBeginDate: function() {
        return beginDate;
    },

    getTraBeginDate: function() {
        return traBeginDate;
    },

    getCiFlag: function() {
        return ciFlag;
    },

    getThreeSchemeList: function() {
        return threeSchemeList;
    },

    getStakeholder: function() {
        return stakeholder;
    },

    getTbPlace: function() {
        return tbPlace;
    },

    getLastBeginDate: function() {
        return lastBeginDate;
    },

    getLastTraBeginDate: function() {
        return lastTraBeginDate;
    },

    getContactAddress: function () {
        return contactAddress;
    },

    getIsShowAddress: function() {
        return isShowAddress;
    },

    getUnUsedTimes: function() {
        return unUsedTimes;
    }

});

function handleAction(action) {
    switch (action.type) {
        case 'update_insuranceCom':
            updateInsuranceCom(action.id);
            emitChange()
            break;
        case 'change_offers':
            changeOffers(action.offer);
            emitChange();
            break;
        case 'update_serial':
            updateSerial(action.num);
            emitChange();
            break;
        case 'update_deliveryType':
            updateDeliveryType(action.index);
            emitChange();
            break;
        case 'update_schemeIndex':
            updateSchemeIndex(action.index);
            emitChange();
            break;
        case 'update_beginDate':
            updateBeginDate(action.event);
            emitChange();
            break;
        case 'toggle_ciFlag':
            toggleCiFlag();
            emitChange();
            break;
        case 'toggle_dedu':
            toggleDedu(action.code);
            emitChange();
            break;
        case 'change_insurance_item':
            changeInsuranceItem(action.code, action.item);
            emitChange();
            break;
        case 'handle_change':
            handleChange(action.event, action.name);
            emitChange();
            break;
        case 'toggle_sameAs':
            toggleSameAs();
            emitChange();
            break;
        case 'updateProvinceDatas':
            updateProvinceDatas(action.msg);
            emitChange();
            break;
        case 'changeProvince':
            changeProvince(action.obj);
            emitChange();
            break;
        case 'updateCityDatas':
            updateCityDatas(action.no, action.obj);
            emitChange();
            break;
        case 'changeCity':
            changeCity(action.obj);
            emitChange();
            break;
        case 'updateCountyDatas':
            updateCountyDatas(action.no, action.obj);
            emitChange();
            break;
        case 'changeCounty':
            changeCounty(action.obj);
            emitChange();
            break;
        case 'clearQuote':
            clearQuote();
            emitChange();
            break;
        case 'reset':
            reset();
            emitChange();
            break;
        case 'initInsuranceEditData':
            initInsuranceEditData(action.insuranceCom, action.serial, action.msg);
            emitChange();
            break;
        case 'updateStoresList':
            updateStoresList(action.list);
            emitChange();
            break;
        case 'updateStore':
            updateStore(action.index);
            emitChange();
            break;
        case 'initTBr':
            console.log('initTBr');
            initTBr(action.datas);
            emitChange();
            break;
        case 'changeBeginDate':
            changeBeginDate(action.text);
            emitChange();
            break;
        case 'initBlankBbr':
            initBlankBbr(action.datas);
            emitChange();
            break;
        case 'changeTbProvince':
            changeTbProvince(action.obj);
            emitChange();
            break;
        case 'changeTbCity':
            changeTbCity(action.obj);
            emitChange();
            break;
        case 'changeTwoBeginDate':
            changeTwoBeginDate(action.tra_date, action.bus_date);
            emitChange();
            break;
        case 'changeTraBeginDate':
            changeTraBeginDate(action.tra_date);
            emitChange();
            break;
        case 'changeContactAddress':
            changeContactAddress(action.list);
            emitChange();
            break;
        case 'changeAddressBookShow':
            changeAddressBookShow();
            emitChange();
            break;
        case 'updateStakeholderAddress':
            updateStakeholderAddress(action.obj);
            emitChange();
            break;
        case 'initBBrAsOwner':
            initBBrAsOwner(action.name, action.no);
            emitChange();
            break;
        case 'updateUnUsedTimes':
            updateUnUsedTimes(action.tp, action.zh);
            emitChange();
            break;
        default: // ... do nothing
            break;
    }
}

InsuranceStore.dispatchToken = AppDispatcher.register(handleAction);
module.exports = InsuranceStore;

