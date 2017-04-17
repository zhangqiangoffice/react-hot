import React, {Component} from 'react';

export default class Out extends Component {

    render() {
        return (
            <div className={this.props.fixed ? 'button_fixed' : 'button_bottom'} >
                <button type="button" onClick={this.props.onClickHandle}>{this.props.text ? this.props.text : '下一步'}</button>   
            </div>
        );
    };
}