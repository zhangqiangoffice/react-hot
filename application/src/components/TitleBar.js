import React, {Component} from 'react';

export default class TitleBar extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div className="title_bar">
                <button type="button" onClick={AppActionCreators.stepGoBack}> </button>
                <h1>{this.props.title}</h1>
            </div>
        );
    };
}