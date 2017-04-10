import React, {Component} from 'react';

export default class TitleBar extends Component {

    //后退一步
    goBack() {
        window.history.back()
    }

    render() {
        return (
            <div className="title_bar">
                <button type="button" onClick={this.goBack} id="go_back"> </button>
                <h1>{this.props.title}</h1>
            </div>
        );
    };
}