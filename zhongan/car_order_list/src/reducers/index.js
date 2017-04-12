import { combineReducers } from 'redux'
import { orders, page, isAsking, visibilityFilter, insuranceCom, insuredId, selectedId, typeData, entity, deleteOrders } from './appDatas'
import { showCompanysSelector, isLoading } from './appUI'
import { staffId } from './urlDatas'


const orderListApp = combineReducers({
  showCompanysSelector,
  visibilityFilter,
  insuranceCom,
  orders,
  insuredId,
  selectedId,
  typeData,
  entity,
  page,
  isAsking,
  isLoading,
  staffId,
  deleteOrders,
  // toPayId,
  // toPayUrl,
})

export default orderListApp
