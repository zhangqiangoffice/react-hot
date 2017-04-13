import React, {Component} from 'react';

export default class RadioSelector extends Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    };

    //点击事件
    handleClick(event) {
        let index = event.target.dataset.index;
        this.props.onClickHandle(index);
    }
    
    render() {

        let listShows = this.props.options.map((option, index) => {
            let onOrOff = (option === this.props.selectedOption) ? 'on' : 'off';
            return (
                <li key={index} data-index={index} onClick={this.handleClick}><img data-index={index} src={require('../asset/img/radio_' + onOrOff + '.png')} />{option}</li>
            )
                
        });

        return (
            <div className="radio_selector" onClick={this.props.onClose}>
                <ul>
                    {listShows}
                </ul>
            </div>
        );
    };
}
