import React from 'react'

const InputBox = ({val, onChangeVal}) => (
  <input type="text" placeholder="请输入" value={val} onChange={e => onChangeVal((e.target.value).trim()) } />
)

export default InputBox