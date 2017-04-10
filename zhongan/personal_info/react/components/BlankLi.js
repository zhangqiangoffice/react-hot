import React from 'react';

const BlankLi = ({children, item}) => (
  <li className="blank_li">
    <label>{item}</label>
    {children}
  </li>
)

export default BlankLi