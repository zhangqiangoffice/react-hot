import React, {Component} from 'react';

import TitleBar from '../public/TitleBar';
import Final from './Final';

import zAJAX from 'z-ajax'

export default class App extends Component {
    constructor(props) {
        super(props);

    };

    render() {

        return (
            <div>
                <TitleBar title="订单结果" />
                <Final />
            </div>
        )
    };
}