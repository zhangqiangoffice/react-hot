import React, {Component} from 'react';

class Loading extends Component {
    constructor(props){
        super(props);

        this.clickHandle = this.clickHandle.bind(this);
    };

    clickHandle() {
        return false;
    }

    render() {
        // if (!this.props.isLoading) {
        //     return null;
        // }

        return (
            <div className="loading" >
                <img src={ctx + '/static/img/public/loading.gif'} />
            </div>
        );
    };
}

export default Loading