import React, { PropTypes } from 'react'

const Link = ({ active, children, onClick }) => {

  if (active) {
    return <li className="selected">{children}</li>
  }

  return (
    <li
       onClick={e => {
         onClick()
       }}
    >
      {children}
    </li>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Link