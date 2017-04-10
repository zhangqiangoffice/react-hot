import React, { PropTypes } from 'react'

const SubIframe = ({ workNum }) => {
  return (
    <iframe className="sub_iframe" src={`http://ecoop.idoutec.cn/wechatgateway/basic/auth?channel=H5_DBB_MSDL&state=order&userid=${workNum}`}></iframe>
  )
}

SubIframe.propTypes = {
  workNum: PropTypes.string.isRequired,
}

export default SubIframe