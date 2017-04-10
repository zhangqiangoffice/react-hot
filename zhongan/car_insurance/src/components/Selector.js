import React, {Component} from 'react'

export default class OutPut extends Component{
  componentWillUnmount() {
    this.props.onClose()
  }

  render() {
    if (!this.props.showSelector) {
      return null
    }

    return (
      <div className="selector" onClick={this.props.onClose}>
        <ul>
          {this.props.selectorOptions.map((option, index) => 
            <li key={index} onClick={e => this.props.onSelect(this.props.selectorTarget, index)}>{option}<img src={ctx + '/static/img/carInf/radio_' + (index === this.props.selectorSelected ? 'on' : 'off') + '.png'} /></li> 
          )}
        </ul>
      </div>
    )
  }

}