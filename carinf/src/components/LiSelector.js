import React, {Component} from 'react';

export default class Out extends Component {
    constructor(props){
        super(props);

        this.clickHandle = this.clickHandle.bind(this);
    };

    //点击事件
    clickHandle(event) {
        let index = event.target.dataset.index;
        this.props.clickHandle(index);
    }

    render() {
        if (!this.props.isShow) {
            return null;
        }

        let listShows = this.props.options.map((str, index)=> {
            return (
                <li key={index} className={str === this.props.selected ? 'selected' : ''} data-index={index} onClick={this.clickHandle}>{str}</li>
            );
        });

        return (
            <div className="li_selector" onClick={this.props.clickClose}>
                <ul>
                    {listShows}
                </ul>
            </div>
        );
    };
}