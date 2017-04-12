import React, {Component} from 'react';
import AppLi from './AppLi';

export default class Applications extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        let listShows = this.props.list.map((apply, index) => {
            return (
                <AppLi key={index} apply={apply} 
                    activedListIndex={this.props.activedListIndex} 
                    applyDetailList={this.props.applyDetailList}
                    applyDealList={this.props.applyDealList}
                    />
            );
        });

        return (
            
            <ul className="applications">
                {listShows}
            </ul>
        );
    };
}