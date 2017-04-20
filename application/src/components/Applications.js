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

        if (this.props.list.length === 0 ) {
            return <div className="no_record">暂无记录</div>
        } else {
            return (
                <ul className="applications">
                    {listShows}
                </ul>
            )
        }
        
    };
}