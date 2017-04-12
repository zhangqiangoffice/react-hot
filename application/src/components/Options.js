import React, {Component} from 'react';
import OptionLi from './OptionLi';
import AppActionCreators from '../actions/AppActionCreators';


export default class AppLi extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        let listShows = this.props.signList.map((sign, index) => {
            return(
                <OptionLi key={index} sign={sign} signContent={this.props.signContent} signStatus={this.props.signStatus}/>
            );
        });

        return (
            <ul className="options">
                {listShows}
            </ul>
        );
    };
}