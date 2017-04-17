import React, {Component} from 'react';

export default class Out extends Component {

    render() {
        if (!this.props.isShow) {
            return null;
        }

        let listShows = this.props.options.map((text, index)=> {
            return (
                <li key={index} className={text === this.props.selected ? 'selected' : ''} onClick={e => this.props.onSelect({text, index,})}>{text}</li>
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