import React, {Component} from 'react';

export default class Loading extends Component {
    constructor(props){
        super(props);

        this.clickHandle = this.clickHandle.bind(this);
    };

    //点击事件
    clickHandle(str, index) {
        this.props.onSelect({text: str, index,});
    }

    render() {
        if (!this.props.isShow) {
            return null;
        }

        let listShows = this.props.options.map((str, index)=> {
            return (
                <li key={index} className={str === this.props.selected ? 'selected' : ''} onClick={e => this.clickHandle(str, index)}>{str}</li>
            );
        });

        return (
            <div className="li_selector" onClick={this.props.onClose}>
                <ul>
                    {listShows}
                </ul>
            </div>
        );
    };
}