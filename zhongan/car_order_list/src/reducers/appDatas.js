import { INIT_ORDERS, ADD_ORDERS, CHANGE_INSURANCE_COM, CHANGE_STATUS, END_ASKING, CHANGE_INSURED_ID, CHANGE_SELECTED_ID, INIT_ENTITY, CHANGE_TYPE_DATA, ADD_DELETE, CHANGE_TO_PAY } from '../actions'

//订单数组
export const orders = (state = [], action) => {
  switch (action.type) {
    case CHANGE_INSURANCE_COM :
    case CHANGE_STATUS :
    case INIT_ORDERS :
      return []
    case ADD_ORDERS :
      return state.concat(action.list)
    case ADD_DELETE :
      let list = []
      state.map((order, index) => {
        if (order.id !== action.id) {
          list.push(order)
        } 
      })
      return list
    default: 
      return state
  }
}

//被删除订单的ID数组
export const deleteOrders = (state = [], action) => {
  switch (action.type) {
    case ADD_DELETE :
      return state.concat([action.id])
    case INIT_ORDERS :
      return []
    default:
      return state
  }
}

//查看详情的id
export const selectedId = (state = '', action) => {
  switch (action.type) {
    case CHANGE_SELECTED_ID :
      return action.id
    default:
      return state
  }
}

//查看详情的订单的type ,0 驾乘险， 1 、2个人意外险
export const typeData = (state = '0', action) => {
  switch (action.type) {
    case CHANGE_TYPE_DATA :
      return action.typeData
    default:
      return state
  }
}

export const insuredId = (state = '1', action) => {
  switch (action.type) {
    case CHANGE_INSURED_ID :
      return action.insuredId
    default:
      return state
  }
}

//订单详情实体
export const entity = (state = {}, action) => {
  switch (action.type) {
    case INIT_ENTITY :
      return action.entity
    default:
      return state
  }
}

export const page = (state = 1, action) => {
  switch (action.type) {
    // case CHANGE_INSURANCE_COM :
    // case CHANGE_STATUS :
    case INIT_ORDERS :
      return 1
    case ADD_ORDERS :
      return state + (action.list.length > 0 ? 1 : 0) 
    default:
      return state
  }
}

export const isAsking = (state = false, action) => {
  switch (action.type) {
    case END_ASKING:
      return !action.hasData
    case CHANGE_STATUS :
    case CHANGE_INSURANCE_COM :
      return true
    default:
      return state
  }
}

export const visibilityFilter = (state = '', action) => {
  switch (action.type) {
    case CHANGE_STATUS :
      return action.status
    case CHANGE_INSURANCE_COM :
      return ''
    default:
      return state
  }
}

export const insuranceCom = (state = 3, action) => {
  switch (action.type) {
    case CHANGE_INSURANCE_COM :
      return action.id
    default:
      return state
  }
}

// export const toPayId = (state = '', action) => {
//   switch (action.type) {
//     case CHANGE_TO_PAY:
//       return action.id
//     default:
//       return state
//   }
// }

// export const toPayUrl = (state = '', action) => {
//   switch (action.type) {
//     case CHANGE_TO_PAY :
//       return action.url
//     default:
//       return state
//   }
// }


