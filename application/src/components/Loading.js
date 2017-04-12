import React, {Component} from 'react';

export default class Loading extends Component {
    constructor(props){
        super(props);
    };

    render() {
        if (!this.props.isLoading) {
            return null;
        }

        return (
            <div className="loading">
                <img src={ctx + '/static/img/public/loading.gif'} />
            </div>
        );
    };
}