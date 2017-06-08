import React, {Component} from 'react'
import style from './asset/css/index.less'

export default class OutPut extends Component{
  componentWillUnmount() {
    
    //当页面卸载时，要关闭选择器
    this.props.onClose()
  }

  render() {
    if (!this.props.showLiSelector) {
      return null
    }

    if (this.props.liSelectorOptions.length === 0) {
      return (
        <div className={style.li_selector} onClick={this.props.onClose}>
          <ul>
            <li>
              {this.props.liSelectorTarget === 'region' ? '请先选择省' : ''}
              {this.props.liSelectorTarget === 'county' ? '请先选择市' : ''}
            </li>
          </ul>
        </div>

      )
    }

    return (
      <div className={style.li_selector} onClick={this.props.onClose}>
        <ul>
          {this.props.liSelectorOptions.map((option, index) => 
            <li 
              key={index} 
              className={this.props.liSelectorSelected === option[this.props.liSelectorTarget + 'Name'] ? style.selected : ''} 
              onClick={e => this.props.onSelect(this.props.liSelectorTarget, option[this.props.liSelectorTarget + 'Name'], option[this.props.liSelectorTarget + 'No'])}>
              {option[this.props.liSelectorTarget + 'Name']}
            </li> 
          )}
        </ul>
      </div>
    )
  }
}