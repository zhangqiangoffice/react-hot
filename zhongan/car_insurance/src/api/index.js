import zAJAX from 'z-ajax'
import data from '../reducers/data.json'
import { Toast } from 'antd-mobile';

//根据车型和使用性质，获取但份保费
export const getTotalFee = (carType, usingType, applyNum) => {
  let fee = 0;
  switch (carType) {
    case 0:
      fee = (usingType === 0 ? 110 : 90)
      break;
    case 1:
      fee = (usingType === 0 ? 120 : 100)
      break;
    case 2:
      fee = 180
      break;
    case 3:
      fee = 200
      break;
    case 4:
      fee = 200
      break;
    case 5:
      fee = 130
      break;
    case 6:
      fee = 160
      break;
    case 7:
      fee = 200
      break;
    default:
      fee = 0;
      break;
  }
  return (fee * data.ApplyNum[applyNum]).toFixed(2)  || ''
}

//向后端获取数据
export const sendDate = (state, cb) => {

  //投保人
  let policyHolder = {
    channelUserNo : "sub-01",
    holderType : data.HolderTypeValue[state.holderType],// 投保人类型(公司,个人)1公司 2 个人
  }

  //如果投保人为个人
  if (state.holderType === 0) {

    policyHolder.holderName = state.holderName;// 投保人名称
    policyHolder.holderCertiType = data.HolderCertiTypeValue[state.holderCertiType];// 投保人证件类型 个人： I身份证 
    policyHolder.holderCertiNo = state.holderCertiNo;// 投保人证件号码
    policyHolder.holderBirthday = state.holderBirthday;// 投保人出生日期
    policyHolder.holderGender = data.HolderGenderValue[state.holderGender];// 投保人性别 M男 F女
    policyHolder.contactPhone= state.holderPhone; // 联系电话
    policyHolder.contactEmail= state.holderEmail; // 联系邮箱

  } else {

    policyHolder.holderName = state.companyName;// 投保公司名称
    policyHolder.holderCertiType = data.CompanyCertiTypeValue[state.companyCertiType];// 公司证件类型 公司：T税务登记证 L营业执照 Z组织机构代码 TY统一社会信用代码
    policyHolder.holderCertiNo = state.companyCertiNo;// 公司证件号码
    policyHolder.contactProvinceCode = state.companyProvinceCode;// 省编码
    policyHolder.contactCityCode = state.companyCityCode;// 市编码
    policyHolder.contactCountryCode = state.companyCountryCode;// 区编码
    policyHolder.contactAddress = state.companyAddress;// 详细地址
    
    policyHolder.contactPeople = state.contactPeople;// 企业联系人
    policyHolder.contactCertiType = data.ContactCertiTypeValue[state.contactCertiType]; // 企业联系人证件类型 个人： I身份证 
    policyHolder.contactCertiNo = state.contactCertiNo;// 企业联系人证件号码
    policyHolder.contactPhone = state.contactPhone;// 企业联系人电话
    policyHolder.contactEmail = state.contactEmail;// 企业联系人邮箱

  }
  
  let datas = {
    id: state.orderId,// 订单主键
    holderId : state.holderId,// 投保人id
    insuerId : state.insuerId,// 被保对象id
    insuredId : state.insuredId,// 订单号
    staffId : state.staffId,// 业务员
    effectiveDate : state.effectiveDate, // 保单起期
    expiryDate : state.expiryDate,// 保单止期
    // sumPremium : getTotalFee(state.carType, state.usingType, state.applyNum),// 总保费
    sumPremium: 99.00 * data.ApplyNum[state.applyNum],
    applyNum : data.ApplyNum[state.applyNum],// 份数 1 2 5 10
    policyHolder,
    carInfo : {
      carType : data.CarType[state.carType],// 车辆类型 1 5座及以下客车 2 6-9座客车 3 2吨及以下货车 4 2吨以上~10吨货车 5 10吨以上货车 6 特种车二和三（专用车）7 特种车一（罐装车）8 特种车四或其他特种车
      usingType : data.UsingTypeValue[state.usingType],// 使用性质 Y 营运 N 非营运
      approvedSeats : data.ApprovedSeats[state.approvedSeats],// 座位数 1 2 3 4 5 6 7 8 9
      vinNo : state.vinNo,// 车架号
      engineNumber : state.engineNumber,// 发动机号
      plateNumber : state.plateNumber //车牌号
    }
  }

  zAJAX(`${ctx}/appZhongan/zhonganInsurance/insert_order`, { data: JSON.stringify(datas) }, cb)
}

//根据车牌号获取车辆信息
export const getCarData = (state, cb) => {
  zAJAX(`${ctx}/appZhongan/car_data`, { plateNumber: state.plateNumber }, cb)
}

//数字前补零
const tran_val = (val) => {
  if((val - 0) < 10){
    val = "0" + val;
  }
  return val;
}

//日期转字符串
export const dateToString = (time) => {
  const datenew = new Date(time); 

  const year = datenew.getFullYear(); 
  const month = tran_val(datenew.getMonth() + 1);
  const date = tran_val(datenew.getDate()); 

  return year + '-' + month + '-' + date ;
}

//从地址栏里获取数据
export const getDataFromUrl = (name) => {
  //构造一个含有目标参数的正则表达式对象  
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");  
  //匹配目标参数  
  var r = window.location.search.substr(1).match(reg);  
  //返回参数值  
  if (r!== null) return unescape(r[2]);  
  return null;
}

//初始化省数据
export const getProvincesDate = (state, cb) => {
  zAJAX(`${ctx}/webService/province`, null, cb)
}

//初始化市数据
export const getCitiesDate = (state, cb) => {
  let no = state.companyProvinceCode
  zAJAX(`${ctx}/webService/region`, {id: no}, cb)
}

//初始化区县数据
export const getCountiesDate = (state, cb) => {
  let no = state.companyCityCode
  zAJAX(`${ctx}/webService/county`, {id: no}, cb)
}

//如果是编辑页面，初始化编辑数据
export const getEditDate = (state, id, cb) => {
  zAJAX(`${ctx}/appZhongan/detail`, {id: id}, cb)

}

//校验数据有效性
export const checkData = (str, text) => {
  
  //先验非空
  if (checkNotEmpty(str, text)) {

    //再格式验证
    let reg;
    switch (true) {
      case str.indexOf('姓名') >= 0 :
        reg = /^[\u4e00-\u9fa5]{2,20}$/;
        break;
      case str.indexOf('证件号码') >= 0 :
      case str.indexOf('身份证') >= 0 :
        reg = /(^[1-9]\d{5}[1-2]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|X|x)$)|(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)/;
        break;
      case str.indexOf('日期') >= 0 :
        reg = /^[1-2]\d{3}-[0-1]\d-[0-3]\d$/;
        break;
      case str.indexOf('电话') >= 0 :
      case str.indexOf('手机') >= 0 :
        reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        break;
      case str.indexOf('邮箱') >= 0 :
        reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        break;
      case str.indexOf('卡单卡号') >= 0 :
        reg = /^[a-zA-Z0-9]{12}$/;
        break;
      case str.indexOf('卡单密码') >= 0 :
        reg = /^[a-zA-Z0-9]{6}$/;
        break;
      case str.indexOf('车牌号') >= 0 :
        reg = /^[\u4e00-\u9fa5]{1}[A-Za-z]{1}[A-Za-z0-9]{5}$/;
        break;
      case str.indexOf('车架号') >= 0 :
        reg = /^[A-Z0-9]{17}$/;
        break;
      case str.indexOf('发动机号') >= 0 :
        reg = /^[A-Z0-9]{6,16}$/;
        break;
      case str.indexOf('企业名称') >= 0 :
      case str.indexOf('企业证件') >= 0 :
        reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
        break;
      default:
        reg = /^\w+$/;
        break
    }
    if (!reg.test(text)) {
      Toast.info(`${str} 格式不正确！`, 2);
      return false;
    } 
    return true;
    
  } 
}

//校验数据非空
export const checkNotEmpty = (str, text) => {
  if (text === '') {
    Toast.info(`${str} 不得为空！`, 2);
    return false
  } else {
    return true;
  }
}

//检查去支付的驾乘险是否可支付
export const checkPayData = (state, cb) => {
  zAJAX(`${ctx}/appZhongan/check_pay_data`, {id: state.orderId}, cb)
}