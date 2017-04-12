import React, { PropTypes, Component } from 'react'
import Order from './Order'

class OrderList extends Component {

  componentWillUnmount() {      
    this.props.onPostDeleteList()
  };

  render() {
    
    if(!this.props.orders.length) {
      return (<p className="nothing"></p>)
    }

    let listShows = this.props.orders.map((order, index) => {
      return (
        <Order 
          key={index} 
          order={order} 
          onAcceptance={this.props.onAcceptance} 
          onGetDetail={this.props.onGetDetail}
          onGoToPay={this.props.onGoToPay}
          onEdit={this.props.onEdit}
          onDeleteOrder={this.props.onDeleteOrder}
          />
      )
    });

    return (
      <ul className="order_list" onTouchStart={this.props.isAsking ? null : this.props.handler}> 
        {listShows} 
        <i id="anchor" ref="anchor"></i>
      </ul>
    )
  }
}

export default OrderList