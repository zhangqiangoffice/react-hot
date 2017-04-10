import React from 'react'

const ClickDiv = ({val, isOpen, onClickHandler}) => (
  <div className={'click_div' + (isOpen ? ' open' : '')} onClick={onClickHandler}>
    {val === '' || val === undefined || val === null ? <span>请选择</span> : val}
  </div>
)

export default ClickDiv