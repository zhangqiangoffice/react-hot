import React, {Component} from 'react';
import TitleBar from '../public/TitleBar';
import Desk from './Desk';
import style from '../asset/css/Enter.less'

export default class App extends Component {

    render() {
        return (
            <div>
                <TitleBar title="快速报价" />
                <img className={style.banner} src={require('../asset/img/banner.png')} />
                <Desk />
            </div>
        )
    };
}