import zAJAX from 'z-ajax'

//获取订单列表
export const getOrders = (state, cb) => {
  let datas = {
    staffId: state.staffId,
    page: state.page,
  }

  zAJAX(`${ctx}/appZhongan/app_order_list`, {data: JSON.stringify(datas)}, cb)
}

//去承保
export const acceptance = (state, cb) => {
  let datas = {
    insuredId: state.insuredId,
  }

  zAJAX(`${ctx}/appZhongan/zhonganInsurance/accept_insurance_order`, datas, cb)
}

//获取详情
export const getDetail = (state, cb) => {
  let datas = {
    id: state.selectedId,
  }
  if (state.typeData === "0") {
    zAJAX(`${ctx}/appZhongan/detail`, datas, cb)
  } else {
    zAJAX(`${ctx}/appZhongan/personal/detail`, datas, cb)
  }
}

//获取下载保单的地址
export const getPolicyUrl = (state, cb) => {
  let datas = {
    policyNo: state.entity.policyNo,
    type: state.entity.type
  }

  zAJAX(`${ctx}/appZhongan/policy_url`, datas, cb)
}

//通知后台删除订单
export const postDeleteList = (state, cb) => {
  if (state.deleteOrders.length) {
    zAJAX(`${ctx}/appZhongan/personal/removeOrders`, {orderIds: state.deleteOrders.join(',')}, cb)
  }
}


