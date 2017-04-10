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
        if (!this.props.isLoading) {
            return null;
        }

        const divStyle = {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '100',
            backgroundColor: 'rgba(0,0,0,.5)',
        }

        const imgStyle = {
            position: 'fixed',
            width: '25%',
            top: '50%',
            left: '50%',
            margin: '-12.5% 0 0 -12.5%',
        }

        return (
            <div style={divStyle} onClick={this.clickHandle}>
                <img src={ctx + '/static/img/public/loading.gif'} style={imgStyle}/>
            </div>
        );
    };
}

export default Loading