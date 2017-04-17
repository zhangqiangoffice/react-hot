import React, {Component} from 'react';
import TitleBar from '../public/TitleBar';
import Desk from './Desk';

export default class App extends Component {

    render() {
        return (
            <div>
                <TitleBar title="快速报价" />
                <img className="banner" src={require('../asset/img/banner.png')} />
                <Desk />
            </div>
        )
    };
}