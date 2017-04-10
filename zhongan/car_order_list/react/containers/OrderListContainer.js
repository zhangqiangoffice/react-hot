import { connect } from 'react-redux'
import { askOrders, acceptance, changeInsuredId, getDetail, changeSelectedId, changeTypeData, addDelete, postDeleteList } from '../actions'
import OrderList from '../components/OrderList'

const mapStateToProps = (state) => ({
  orders: state.orders,
  insuranceCom: state.insuranceCom,
  isAsking: state.isAsking,
})

const mapDispatchToProps = (dispatch) => ({
  handler: () => {
    function getOffset(Node, offsetTop) {
        if (!offsetTop) {
            offsetTop = 0;
        }
        if (Node == document.body) {//当该节点为body节点时，结束递归
            return offsetTop;
        }
        offsetTop += Node.offsetTop;
        return getOffset(Node.offsetParent, offsetTop);//向上累加offset里的值
    }
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    let top = getOffset(document.getElementById('anchor'))
    let distance = top - height - 200
    if (scrollTop > distance) {
      dispatch(askOrders())
    }
  },
  //去承保
  onAcceptance: (insuredId) => {
    dispatch(changeInsuredId(insuredId))
    dispatch(acceptance())
  },
  //查看详情
  onGetDetail: (id, typeData) => {
    dispatch(changeSelectedId(id))
    dispatch(changeTypeData(typeData))
    dispatch(getDetail())
  },

  //跳转支付页面
  onGoToPay: (id, type) => {
    let location = '';
    if (type === '0') {
      //驾乘险投保支付页面step4
      location = `car?id=${id}#/step4`
      // dispatch(changeToPay(id, url));
      // dispatch(checkPayData());
    } else {
      //个意险投保支付页面step4
      location = `personal/personal_info?id=${id}#/step4`
    }
    window.location.href = location
  },
  //去到编辑页面
  onEdit: (id, type) => {
    let typeName = 'personal/personal_info'
    if (type === '0') {
      typeName = 'car'
    }
    window.location.href = `${typeName}?id=${id}#/step1`
  },
  //删除订单
  onDeleteOrder: (id) => {
    if(confirm('您确定要删除该订单？')){
      dispatch(addDelete(id));     
    }
  },

  //通知后台要删除的订单
  onPostDeleteList: () => {
    dispatch(postDeleteList());
  }
})
  
const OrderListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList)

export default OrderListContainer