import React from 'react'
import TitleBarContainer from '../containers/TitleBarContainer'
import OrderListContainer from '../containers/OrderListContainer'
import LoadingContainer from '../containers/LoadingContainer'
import SubIframeContainer from '../containers/SubIframeContainer'

const App = () => (
  <div>
    <TitleBarContainer/>
    <OrderListContainer />
    <LoadingContainer />
  </div>
)

export default App