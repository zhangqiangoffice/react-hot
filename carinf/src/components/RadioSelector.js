import React, {Component} from 'react';
import AppActionCreators from '../actions/AppActionCreators';

export default class RadioSelector extends Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.close = this.close.bind(this);
    };

    //点击事件
    handleClick(event) {
        this.close();
        let index = event.target.dataset.index;
        this.props.liClickHandle(index);
    }

    //关闭弹出框
    close() {
        AppActionCreators.hideRadioSelector();
    }
    
    render() {
        if (!this.props.isRadioSelector) {
            return null
        }

        let listShows = this.props.options.map((option, index) => {
            let onOrOff = (option === this.props.selectedOption) ? 'on' : 'off';
            return (
                <li key={index} data-index={index} onClick={this.handleClick}>{option}<img data-index={index} src={ctx + '/static/img/carInf/radio_' + onOrOff + '.png'} /></li>
            )
                
        });

        return (
            <div className="radio_selector" onClick={this.close}>
                <ul>
                    {listShows}
                </ul>
            </div>
        );
    };
}
