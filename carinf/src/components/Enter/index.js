import React, {Component} from 'react';

import TitleBar from '../public/TitleBar';
import Desk from './Desk';

export default class App extends Component {

    render() {
        const imgStyle = {
            width: '100%',
            verticalAlign: 'bottom',
            marginTop: '4.5rem',
        }

        return (
            <div>
                <TitleBar title="快速报价" />
                <img style={imgStyle} src={require('../asset/img/banner.png')} />
                <Desk />
            </div>
        )
    };
}