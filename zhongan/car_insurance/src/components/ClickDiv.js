import React from 'react'

const ClickDiv = ({val, onClickHandler}) => (
  <div className="click_div" onClick={onClickHandler}>
    {val === '' || val === undefined || val === null ? <span>请选择</span> : val}
  </div>
)

export default ClickDiv