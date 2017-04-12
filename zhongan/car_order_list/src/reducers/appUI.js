import { SWITCH_COMPANYS_SHOW, CHANGE_INSURANCE_COM, CHANGE_STATUS, END_ASKING, CHANGE_IS_LOADING, INIT_ENTITY, CHANGE_INSURED_ID } from '../actions'


export const isLoading = (state = true, action) => {
  switch (action.type) {
    // case END_ASKING :
    case INIT_ENTITY :
      return false
    case CHANGE_INSURED_ID :
      return true
    case CHANGE_IS_LOADING:
      return action.flag
    default:
      return state
  }
}

export const showCompanysSelector = (state = true, action) => {
  switch (action.type) {
    case SWITCH_COMPANYS_SHOW :
      return true
    case CHANGE_INSURANCE_COM :
      return false
    default:
      return state
  }
}