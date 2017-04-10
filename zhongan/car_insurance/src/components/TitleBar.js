import React from 'react'

const TitleBar = ({title, step, isEdit, staffId, onGoBack}) => (
  <div className="title_bar">
    <button className="go_back" id="go_back" type="button" onClick={e => onGoBack(step - 1, isEdit, staffId)}> </button>
    <h1>{title}</h1>
  </div>
)

export default TitleBar