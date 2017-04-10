import AppStore from '../stores/AppStore';
import CarStore from '../stores/CarStore';
import InsuranceStore from '../stores/InsuranceStore';
import CarActionCreators from '../actions/CarActionCreators';
import InsuranceActionCreators from '../actions/InsuranceActionCreators';
import AppActionCreators from '../actions/AppActionCreators';

import zAJAX from 'z-ajax'

module.exports = {
    
    //页面一打开即获取url中的参数，并判断下一步去哪里
    getDataFromUrl: function() {

        //获取url参数 方法
        let getUrlParam = function(name){  
            //构造一个含有目标参数的正则表达式对象  
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");  
            //匹配目标参数  
            var r = window.location.search.substr(1).match(reg);  
            //返回参数值  
            if (r!== null) return unescape(r[2]);  
            return null;  
        }

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

            AppActionCreators.showLoading();
            AppActionCreators.stepGoStakeholder(fromPage);

            let datas = {
                company: (insuranceCom - 0) + 700,
                serial,
            }

            let cb = msg => {
                if (msg.result - 0  === 1) {
                    
                    CarActionCreators.initCarEditData(msg);
                    InsuranceActionCreators.initInsuranceEditData(insuranceCom, serial, msg);

                } else {
                    alert(msg.message);
                }
                AppActionCreators.hideLoading();
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
                AppActionCreators.stepNext();
                InsuranceActionCreators.updateInsuranceCom((toCom - 0) % 700);
                window.location = '#/enter'
            } else if (toCom === '701') {
                //如果是太平洋保险，则直接跳太平洋的页面
                window.location = '#/subFrame'
                // AppActionCreators.showSubFrame();
                // window.location.href = 'http://ecoop.idoutec.cn/wechatgateway/basic/auth?channel=H5_DBB_MSDL&state=car&userid=' + workNum;
            }

        }
    },

    //获取最近门店地址数据
    getStoresNearby: function() {
        
        //从url中获取手机所在经纬度，默认使用润安大厦地址
        // let position = AppStore.getPosition() || '117.284115,31.877174';
        // let datas = {
        //     company: 700 + (InsuranceStore.getInsuranceCom() - 0),
        //     position,
        // }

        // let cb = msg => {
        //     if (msg.result === 1) {
        //         InsuranceActionCreators.updateStoresList(msg.list);
        //     }else{
        //         alert(msg.message);
        //     }
        // } 
        // zAJAX(`${ctx}/mobile/carInf/getLatelyStore`, datas, cb)

    },

    //获取车主姓名和证件号
    getOwnerInfo: function(plateNo) {
        let datas = {
            plateNo,
        }

        let cb = msg => {
            if (msg.result === 1 && msg.idCard) {
                CarActionCreators.updateOwner(msg.name, msg.idCard);
            }
        }

        zAJAX(`${ctx}/carInf/getOwner`, datas, cb)
    },



    //获取行驶证信息
    cardInfo: function() {
        // AppActionCreators.showLoading();
        AppActionCreators.startAlertProgress();
        let datas = {
            insuranceCom: 700 + (InsuranceStore.getInsuranceCom() - 0),
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
                AppActionCreators.stepNext();
            } else {
                AppActionCreators.messageAlertProgress(msg.message);
                // alert(msg.message);
            }
            // AppActionCreators.hideLoading();
        } 

        zAJAX(`${ctx}/carInf/cardInfo`, datas, cb)

    },

    //获取车型信息
    carModel: function() {
        // AppActionCreators.showLoading();
        AppActionCreators.startAlertProgress();
        let datas = {
            insuranceCom: 700 + InsuranceStore.getInsuranceCom(),
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
                AppActionCreators.stepNext();
                window.location = '#/model'
            }else{
                AppActionCreators.messageAlertProgress(msg.message);
                // alert(msg.message);
            }
            // AppActionCreators.hideLoading();
        } 

        zAJAX(`${ctx}/carInf/carModel`, datas, cb)

    },

    //获取推荐投保日期
    queryInsuranceDate: function() {

        AppActionCreators.startAlertProgress();
        let style = CarStore.getStyleList()[CarStore.getStyleIndex()];

        let datas = {
            insuranceCom: 700 + InsuranceStore.getInsuranceCom(),
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
                AppActionCreators.stepNext();
                window.location = '#/plan'
            }else{
                AppActionCreators.messageAlertProgress(msg.message);
                // alert(msg.message);
            }
        } 

        zAJAX(`${ctx}/carInf/queryInsuranceDate`, datas, cb)

    },

    //获取报价
    quote: function() {
        // AppActionCreators.showLoading();
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
            insuranceCom: 700 + InsuranceStore.getInsuranceCom(),
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
                AppActionCreators.stepNext();
                window.location = '#/results'
            }else{
                AppActionCreators.messageAlertProgress(msg.message);
                // alert(msg.message);
            }
            // AppActionCreators.hideLoading();
        } 

        zAJAX(`${ctx}/carInf/quote`, datas, cb)
    },

    //获取报价
    quote2: function() {
        // AppActionCreators.showLoading();
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
            insuranceCom: 700 + InsuranceStore.getInsuranceCom(),
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
                // AppActionCreators.stepNext();
            }else{
                // alert(msg.message);
                AppActionCreators.messageAlertProgress(msg.message);
            }
            // AppActionCreators.hideLoading();
        } 

        zAJAX(`${ctx}/carInf/quote`, datas, cb)
    },


    //下单
    orderOperation: function(){
        // AppActionCreators.showLoading();
        AppActionCreators.startAlertProgress();
        let stakeholder = InsuranceStore.getStakeholder();

        let datas = {
            serial: InsuranceStore.getSerial(),
            name: CarStore.getName(),
            idCard: CarStore.getIdCard(),
            insuranceCom: 700 + InsuranceStore.getInsuranceCom(),
            orderNo: InsuranceStore.getOffers()[InsuranceStore.getInsuranceCom()].orderNo,

            bbrName: stakeholder.bbrName,                     //被保人姓名
            bbrNo: stakeholder.bbrNo,                     //被保人证件号
            bbrPhone: stakeholder.bbrPhone,                      //被保人电话
            bbrEmail: stakeholder.bbrEmail,                  //被保人电子邮箱

            tbrName: stakeholder.tbrName,                        //投保人姓名
            tbrNo: stakeholder.tbrNo,                          //投保人证件号
            tbrPhone: stakeholder.tbrPhone,                       //投保人电话
            tbrEmail: stakeholder.tbrEmail,                       //投保人电子邮箱

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
            datas.tbrEmail = datas.bbrEmail;
        }

        let cb = msg => {
            if (msg.result === 1) {
                AppActionCreators.finishAlertProgress();
                AppActionCreators.stepNext();
                window.location = '#/final'
            }else{
                // alert(msg.message);
                AppActionCreators.messageAlertProgress(msg.message);
            }
            // AppActionCreators.hideLoading();
        } 

        zAJAX(`${ctx}/carInf/orderOperation`, datas, cb)

    },

    //支付申请
    applyPay: function() {
        // AppActionCreators.showLoading();
        AppActionCreators.startAlertProgress();

        let datas = {
            orderNo: InsuranceStore.getOffers()[InsuranceStore.getInsuranceCom()].orderNo,
            serial: InsuranceStore.getSerial(),
            insuranceCom: 700 + InsuranceStore.getInsuranceCom(),
        };

        let cb = msg => {
            if (msg.result === 1) {
                AppActionCreators.finishAlertProgress();
                AppActionCreators.stepNext();
                if (window.minsheng) {
                    window.minsheng.turnToActivity('支付页面', msg.url);
                } else {
                    location.href = msg.url;
                }
            }else{
                AppActionCreators.messageAlertProgress(msg.message);
                // alert(msg.message);
            }
            // AppActionCreators.hideLoading();
        } 

        zAJAX(`${ctx}/carInf/orderPay`, datas, cb)
    },

    //申请邮寄地址
    quoteAddress: function () {
        // AppActionCreators.showLoading();
        AppActionCreators.startAlertProgress();
        let datas = {
            workNum: AppStore.getWorkNum(),
        };

        let cb = msg => {
            if (msg.result === 1) {
                console.log(msg.list);
                InsuranceActionCreators.changeContactAddress(msg.list)
                InsuranceActionCreators.changeAddressBookShow()
            }else{
                AppActionCreators.messageAlertProgress(msg.message);
                // alert(msg.message);
            }
            // AppActionCreators.hideLoading();
        } 

        zAJAX(`${ctx}/carInf/queryAddress`, datas, cb)
    },

    //删除邮寄地址
    carAddressDelete: function(id) {
        let datas = {
            id,
            workNum: AppStore.getWorkNum(),
        };

        let cb = msg => {
            if (msg.result === 1) {
                // InsuranceActionCreators.changeContactAddress(msg.list)
                // InsuranceActionCreators.changeAddressBookShow()
            }else{
                alert(msg.message);
            }
            AppActionCreators.hideLoading();
        } 
        console.log(datas);

        // zAJAX(`${ctx}/carInf/carAddressDelete`, datas, cb)
    },

    //获取url参数 方法
    getUrlParam : function(name){  
        //构造一个含有目标参数的正则表达式对象  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");  
        //匹配目标参数  
        var r = window.location.search.substr(1).match(reg);  
        //返回参数值  
        if (r!== null) return unescape(r[2]);  
        return null;  
    }
}
