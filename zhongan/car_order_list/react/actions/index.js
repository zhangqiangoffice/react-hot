import * as api from '../api'

export const INIT_URL_DATAS = 'INIT_URL_DATAS'
export const INIT_ORDERS = 'INIT_ORDERS'
export const ADD_ORDERS = 'ADD_ORDERS'
export const SWITCH_COMPANYS_SHOW = 'SWITCH_COMPANYS_SHOW'
export const CHANGE_INSURANCE_COM = 'CHANGE_INSURANCE_COM'
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const END_ASKING = 'END_ASKING'
export const CHANGE_INSURED_ID = 'CHANGE_INSURED_ID'
export const CHANGE_SELECTED_ID = 'CHANGE_SELECTED_ID'
export const CHANGE_TYPE_DATA = 'CHANGE_TYPE_DATA'
export const CHANGE_IS_LOADING = 'CHANGE_IS_LOADING'
export const INIT_ENTITY = 'INIT_ENTITY'
export const ADD_DELETE = 'ADD_DELETE'
// export const CHANGE_TO_PAY = 'CHANGE_TO_PAY'

export const initUrlDatas = () => ({
  type: INIT_URL_DATAS,
})

export const initOrders = () => ({
  type: INIT_ORDERS,
})

//修改遮罩层的显隐
export const changeIsLoading = (flag) => ({
  type: CHANGE_IS_LOADING,
  flag,
})

export const askOrders = () => (dispatch, getState) => {
  
  //首先改变isAsking,从而阻止重复申请订单
  dispatch(endAsking(false))
  api.getOrders(getState(), msg => {
      dispatch(endAsking(msg.list.length > 0))
      dispatch(changeIsLoading(false))
      if (msg.result === 1) {
        dispatch(addOrders(msg.list));
      }else{
        alert(msg.message);
      }
  })
}

//修改选中的订单的ID
export const changeInsuredId = (insuredId) => ({
  type: CHANGE_INSURED_ID,
  insuredId,
})

//修改要查看的订单的id
export const changeSelectedId = (id) => ({
  type: CHANGE_SELECTED_ID,
  id,
})

//修改要查看详情的订单的type
export const changeTypeData = (typeData) => ({
  type: CHANGE_TYPE_DATA,
  typeData,
})

//去承保
export const acceptance = () => (dispatch, getState) => {
  dispatch(changeIsLoading(true))
  api.acceptance(getState(), msg => {
    dispatch(changeIsLoading(false))
    if (msg.result === 1) {
      window.location.reload()
    } else {
      alert(msg.message)
    }
  })
}

//查看详情
export const getDetail = () => (dispatch, getState) => {
  dispatch(changeIsLoading(true))
  api.getDetail(getState(), msg => {
      dispatch(initEntity(msg.entity))
  })
}

//初始化订单详情实体
export const initEntity = (entity) => ({
  type: INIT_ENTITY,
  entity,
})

//获取下载保单的地址
export const getPolicyUrl = () => (dispatch, getState) => {
  dispatch(changeIsLoading(true))
  api.getPolicyUrl(getState(), msg => {
    dispatch(changeIsLoading(false))
    if (msg.result === 1) {
      window.location.href = msg.policyUrl
    }
  })
}

export const addOrders = (list) => ({
  type: ADD_ORDERS,
  list,
})

export const endAsking = (hasData) => ({
  type: END_ASKING,
  hasData,
})

export const changeStatus = (status) => ({
  type: CHANGE_STATUS,
  status
})

export const showCompanysSelector = () => ({
  type: SWITCH_COMPANYS_SHOW,
})

export const changeInsuranceCom = (id, name) => ({
  type: CHANGE_INSURANCE_COM,
  id,
  name,
})

export const addDelete = (id) => ({
  type: ADD_DELETE,
  id,
})

// //点去支付按钮，存储临时的id和url
// export const changeToPay = (id, url) => ({
//   type: CHANGE_TO_PAY,
//   id,
//   url,
// })

//通知后台被删除的订单
export const postDeleteList = () => (dispatch, getState) => {
  api.postDeleteList(getState(), msg => {
    if (msg.result === 1) {
      dispatch(initOrders())
      dispatch(askOrders())
    } else {
      alert(msg.message)
    }
  })
}

// //驾乘险检查是否可去支付
// export const checkPayData = () => (dispatch, getState) => {
//   dispatch(changeIsLoading(true));
//   let state = getState();
//   api.checkPayData(state, msg => {
//     if (msg.result === 1) {
//       window.location.href = state.toPayUrl;
//     } else {
//       alert(msg.message)
//       dispatch(changeIsLoading(false));
//     }
//   })
// }
