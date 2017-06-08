import AppStore from '../stores/AppStore';
import CarStore from '../stores/CarStore';
import InsuranceStore from '../stores/InsuranceStore';
import CarActionCreators from '../actions/CarActionCreators';
import InsuranceActionCreators from '../actions/InsuranceActionCreators';
import AppActionCreators from '../actions/AppActionCreators';
import { Modal, Toast } from 'antd-mobile';
import  * as mock from './asset/mock/index';
import zAJAX from 'z-ajax';

//从地址栏获取参数
const getUrlParam = function(name){  
    //构造一个含有目标参数的正则表达式对象  
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");  
    //匹配目标参数  
    const r = window.location.search.substr(1).match(reg);  
    //返回参数值  
    if (r!== null) return unescape(r[2]);  
    return null;  
};

//装填保险公司ID
const getCom = function() {
    return 700 + (InsuranceStore.getInsuranceCom() - 0)
}

//将保额转换成适当汉字
export function transformChoice(choice) {
    let label = '';
    switch (true) {
        case choice - 0 === 0:
            label = "投保";
            break;
        case choice - 0 === -1:
            label = "不投保";
            break;
        case choice - 0 >= 10000:
            label = (choice / 10000) + '万'
            break;
        default:
            label = choice;
            break;
    }
    return label;
}

    
//页面一打开即获取url中的参数，并判断下一步去哪里
export function getDataFromUrl() {

    let edit = getUrlParam('edit');
    let position = getUrlParam('position');
    if (position) {
        AppActionCreators.initPosition(position);
    }

    //如果是来自车险订单详情页面，初始化数据，并到保单相关人页面
    if (edit === 'yes') {
        let insuranceCom = getUrlParam('insuranceCom');
        let serial = getUrlParam('serial');
        let fromPage = getUrlParam('fromPage');

        AppActionCreators.startAlertProgress();
        AppActionCreators.stepGoStakeholder(fromPage);

        let datas = {
            company: (insuranceCom - 0) + 700,
            serial,
        }

        let cb = msg => {
            if (msg.result - 0  === 1) {
                AppActionCreators.finishAlertProgress();
                CarActionCreators.initCarEditData(msg);
                InsuranceActionCreators.initInsuranceEditData(insuranceCom, serial, msg);
                window.location = '#/confirm'
            } else {
                AppActionCreators.messageAlertProgress(msg.message);
            }
        }

        zAJAX(`${ctx}/mobile/carInf/order_detail`, datas, cb)

    } else {
        //如果不是来自详情页，则初始化数据，并打开默认步骤
        let cid = getUrlParam('cid');
        let workNum = getUrlParam('workNum');
        AppActionCreators.initAppEditData(cid, workNum);
        let toCom = getUrlParam('toCom');

        //如果存在toCom，则是要跳转到第二页面的
        if (toCom === '702' || toCom === '703') {
            InsuranceActionCreators.updateInsuranceCom((toCom - 0) % 700);
            window.location = '#/enter'
        } else if (toCom === '701') {
            //如果是太平洋保险，则直接跳太平洋的页面
            window.location = '#/subFrame'
            // AppActionCreators.showSubFrame();
            // window.location.href = 'http://ecoop.idoutec.cn/wechatgateway/basic/auth?channel=H5_DBB_MSDL&state=car&userid=' + workNum;
        }

    }
};

//获取车主姓名和证件号
export function getOwnerInfo(plateNo) {
    let cb = msg => {
        if (msg.result === 1 && msg.idCard) {
            CarActionCreators.updateOwner(msg.name, msg.idCard);
            InsuranceActionCreators.updateUnUsedTimes(msg.tpCount, msg.zhCount)
        }
    }

    if (isMock) {
        cb(mock.MgetOwnerInfo)
    } else {

    zAJAX(`${ctx}/carInf/getOwner`, { plateNo, }, cb)
    }
};

//获取行驶证信息
export function cardInfo() {
    AppActionCreators.startAlertProgress();
    let data = {
        insuranceCom: getCom(),
        isHome: CarStore.getIsHome(),
        plateNo: CarStore.getPlateNo(),
        city: CarStore.getCity(),
        name: CarStore.getName(),
        idCard: CarStore.getIdCard(),
        newVhl: CarStore.getIsNewCar() ? '1' : '0',
        tbCity: InsuranceStore.getTbPlace().city.no,
    };

    let cb = msg => {
        if (msg.result === 1) {
            AppActionCreators.finishAlertProgress();
            if (msg.hasRecord === 1) {
                CarActionCreators.updateLincence(msg);
            } else {
                CarActionCreators.clearLincence();
            }
            window.location = '#/car'
        } else {
            AppActionCreators.messageAlertProgress(msg.message);
        }
    } 

    if (isMock) {
        cb(mock.McardInfo)
    } else {
    zAJAX(`${ctx}/carInf/cardInfo`, data, cb)

    }
};

//获取车型信息
export function carModel() {
    AppActionCreators.startAlertProgress();
    let datas = {
        insuranceCom: getCom(),
        isHome: CarStore.getIsHome(),
        plateNo : CarStore.getPlateNo(),
        city: CarStore.getCity(),
        name: CarStore.getName(),
        idCard: CarStore.getIdCard(),

        newVhl: CarStore.getIsNewCar() ? '1' : '0',
        engineNo: CarStore.getEngineNo(),
        vin: CarStore.getVin(),
        brandModel: CarStore.getBrandModel(),
        registerDate: CarStore.getRegisterDate(),
        isTransferOwnership: CarStore.getIsTransferOwnership(),
        issueDate: CarStore.getIssueDate() ? CarStore.getIssueDate() + ' 00:00:00' : '',
        tbCity: InsuranceStore.getTbPlace().city.no,
    }

    let cb = msg => {
        if (msg.result === 1) {
            AppActionCreators.finishAlertProgress();
            CarActionCreators.updateStyleList(msg.list);
            window.location = '#/model'
        }else{
            AppActionCreators.messageAlertProgress(msg.message);
        }
    } 

    if (isMock) {
        cb(mock.McarModel)
    } else {
        zAJAX(`${ctx}/carInf/carModel`, datas, cb)

    }


};

//获取推荐投保日期
export function queryInsuranceDate() {
    AppActionCreators.startAlertProgress();
    let style = CarStore.getStyleList()[CarStore.getStyleIndex()];

    let datas = {
        insuranceCom: getCom(),
        isHome: CarStore.getIsHome(),
        plateNo : CarStore.getPlateNo(),
        tbCity: InsuranceStore.getTbPlace().city.no,
        brandModel: CarStore.getBrandModel(),
        modelCode: style.modelCode,
        purchaseValence: style.purchaseValence,
        passengers: style.passengers,
        carBrand: style.carBrand,
        exhaustScale: style.exhaustScale,
        familyName: style.familyName,
        vin: CarStore.getVin(),
    };

    let cb = msg => {
        if (msg.result === 1) {
            AppActionCreators.finishAlertProgress();
            InsuranceActionCreators.changeTwoBeginDate(msg.LAST_TRA_END, msg.LAST_BUS_END);
            AppActionCreators.saveTempOrderNo(msg.orderNo, msg.csPrice);
            window.location = '#/plan'
        }else{
            AppActionCreators.messageAlertProgress(msg.message);
        }
    } 

    if (isMock) {
        cb(mock.MqueryInsuranceDate)
    } else {
        zAJAX(`${ctx}/carInf/queryInsuranceDate`, datas, cb)

    }

};

//获取报价
export function quote() {
    AppActionCreators.startAlertProgress();
    let style = CarStore.getStyleList()[CarStore.getStyleIndex()];
    let insuranceItems = '';
    InsuranceStore.getThreeSchemeList()[InsuranceStore.getSchemeIndex()].map((value, index) => {
        let choice;
        //国产玻璃为0，进口玻璃为1
        if (value.choice === '国产') {
            choice = 0
        } else if (value.choice === '进口') {
            choice = 1
        } else {
            choice = value.choice
        }
        insuranceItems += value.code + ',' + value.name + ',' + choice + ';';
    });

    let datas = {
        insuranceCom: getCom(),
        isHome: CarStore.getIsHome(),
        plateNo : CarStore.getPlateNo(),
        city: CarStore.getCity(),
        name: CarStore.getName(),
        idCard: CarStore.getIdCard(),
        newVhl: CarStore.getIsNewCar() ? '1' : '0',
        engineNo: CarStore.getEngineNo(),
        vin: CarStore.getVin(),
        brandModel: CarStore.getBrandModel(),
        registerDate: CarStore.getRegisterDate(),
        isTransferOwnership: CarStore.getIsTransferOwnership(),
        issueDate: CarStore.getIssueDate() ? CarStore.getIssueDate() + ' 00:00:00' : '',
        serial: InsuranceStore.getSerial(),

        workNum: AppStore.getWorkNum(),
        cid: AppStore.getCid(),
        biFlag: true,
        ciFlag: InsuranceStore.getCiFlag(),
        insBegin: InsuranceStore.getBeginDate(),
        traffBegin: InsuranceStore.getTraBeginDate(),
        passengers: style.passengers,
        carBrand: style.carBrand,
        purchaseValence: style.purchaseValence,
        exhaustScale: style.exhaustScale,
        familyName: style.familyName,
        modelCode: style.modelCode,
        vehicleType: CarStore.getVehicleType(),
        useCharacter: CarStore.getUseCharacter(),
        insuranceItems: insuranceItems,
        tbCity: InsuranceStore.getTbPlace().city.no,
        orderNo: AppStore.getTempOrderNo(),
        csPrice: AppStore.getCsPrice(),
    };

    let cb = msg => {
        if (msg.result === 1) {
            AppActionCreators.finishAlertProgress();
            InsuranceActionCreators.changeOffers(msg);
            InsuranceActionCreators.updateUnUsedTimes(msg.tpCount, msg.zhCount)
            window.location = '#/results'
        }else{
            AppActionCreators.messageAlertProgress(msg.message);
        }
    } 

    if (isMock) {
        cb(mock.Mquote)
    } else {
        zAJAX(`${ctx}/carInf/quote`, datas, cb)
    }
};

//下单
export function orderOperation(){
    AppActionCreators.startAlertProgress();
    let stakeholder = InsuranceStore.getStakeholder();

    let datas = {
        serial: InsuranceStore.getSerial(),
        name: CarStore.getName(),
        idCard: CarStore.getIdCard(),
        insuranceCom: getCom(),
        orderNo: InsuranceStore.getOffers()[InsuranceStore.getInsuranceCom()].orderNo,

        bbrName: stakeholder.bbrName,                     //被保人姓名
        bbrNo: stakeholder.bbrNo,                     //被保人证件号
        bbrPhone: stakeholder.bbrPhone,                      //被保人电话
        // bbrEmail: stakeholder.bbrEmail,                  //被保人电子邮箱

        tbrName: stakeholder.tbrName,                        //投保人姓名
        tbrNo: stakeholder.tbrNo,                          //投保人证件号
        tbrPhone: stakeholder.tbrPhone,                       //投保人电话
        // tbrEmail: stakeholder.tbrEmail,                       //投保人电子邮箱

        deliveryType: InsuranceStore.getDeliveryType(),                  //配送类型：0快递 1自取
        collectName: stakeholder.collectName,                    //收件人姓名
        collectPhone: stakeholder.collectPhone,                   //收件人电话
        storeId: stakeholder.store.id || '',                        //门店ID
        add_province: stakeholder.add_province,             //收件省
        add_city: stakeholder.add_city,                 //收件市
        add_district: stakeholder.add_district,             //收件区县
        collectAdd: stakeholder.add_province_name + stakeholder.add_city_name + stakeholder.add_district_name + stakeholder.collectAdd,              //收件地址
    };

    if (stakeholder.sameAs) {
        datas.tbrName = datas.bbrName;
        datas.tbrNo = datas.bbrNo;
        datas.tbrPhone = datas.bbrPhone;
    }

    let cb = msg => {
        if (msg.result === 1) {
            AppActionCreators.finishAlertProgress();
            window.location = '#/final'
        }else{
            AppActionCreators.messageAlertProgress(msg.message);
        }
    } 

    if (isMock) {
        cb(mock.MorderOperation)
    } else {
        zAJAX(`${ctx}/carInf/orderOperation`, datas, cb)
    }
};

//支付申请
export function applyPay() {
    AppActionCreators.startAlertProgress();

    let datas = {
        orderNo: InsuranceStore.getOffers()[InsuranceStore.getInsuranceCom()].orderNo,
        serial: InsuranceStore.getSerial(),
        insuranceCom: getCom(),
    };

    let cb = msg => {
        if (msg.result === 1) {
            AppActionCreators.finishAlertProgress();
            if (window.minsheng) {
                window.minsheng.turnToActivity('支付页面', msg.url);
            } else {
                location.href = msg.url;
            }
        }else{
            AppActionCreators.messageAlertProgress(msg.message);
        }
    } 

    zAJAX(`${ctx}/carInf/orderPay`, datas, cb)
};

//申请邮寄地址
export function quoteAddress () {
    AppActionCreators.startAlertProgress();
    let datas = {
        workNum: AppStore.getWorkNum(),
    };

    let cb = msg => {
        if (msg.result === 1) {
            InsuranceActionCreators.changeContactAddress(msg.list)
            InsuranceActionCreators.changeAddressBookShow()
        }else{
            AppActionCreators.messageAlertProgress(msg.message);
        }
    } 

    if (isMock) {
        cb(mock.MqueryAddress)
    } else {
        zAJAX(`${ctx}/carInf/queryAddress`, datas, cb)
    }
};

//获取城市列表
export function getCitiesList(no, cb) {
    if (isMock) {
        cb(mock.Mregion)
    } else {
        zAJAX(`${ctx}/webService/region`, {id: no}, cb)
    }

};

//获取区县列表
export function getCountiesList(no, cb) {
    if (isMock) {
        cb(mock.Mcounty)
    } else {
        zAJAX(`${ctx}/webService/county`, {id: no}, cb)
    }
};

//获取最近使用的车辆信息
export function queryOfferCar(cb) {
    if (isMock) {
        cb(mock.MqueryOfferCar)
    } else {
        zAJAX(`${ctx}/carInf/queryOfferCar`, {workNum: AppStore.getWorkNum()}, cb)
    }
};

//获取邮寄地址列表
export function queryAddress (cb) {
    if (isMock) {
        cb(mock.MqueryAddress)
    } else {
        zAJAX(`${ctx}/carInf/queryAddress`, {workNum: AppStore.getWorkNum()}, cb)
    }
};

//通知后台设定默认地址
export function carAddressDefault(data, cb) {
    if (isMock) {
        cb(mock.MoperationCarAddress)
    } else {
        zAJAX(`${ctx}/carInf/carAddressDefault`, data, cb)
    }
};

//保存地址
export function saveAddress(data) {
    AppActionCreators.startAlertProgress();
    const cb = (msg) => {
        if (msg.result === 1) {
            AppActionCreators.finishAlertProgress();
            window.location = '#/addressList'
        } else {
            AppActionCreators.messageAlertProgress(msg.message);
        }
    }
    if (isMock) {
        cb(mock.Msuccess)
    } else {
        zAJAX(`${ctx}/carInf/operationCarAddress`, data, cb)
    }
};

//删除地址
export function carAddressDelete(id) {
    let data = {
        id,
        workNum: AppStore.getWorkNum(),
    };
    let cb = msg => {if (msg.result !== 1) {Toast.fail('删除操作失败!!!', 2)}}

    if (isMock) {
        cb(mock.MoperationCarAddress)
    } else {
        zAJAX(`${ctx}/carInf/carAddressDelete`, data, cb)
    }
};
