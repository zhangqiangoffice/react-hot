import React, {Component} from 'react';

import TitleBar from '../public/TitleBar';
import SelectStyle from './SelectStyle';

import zAJAX from 'z-ajax'

export default class App extends Component {
    constructor(props) {
        super(props);

    };

    render() {

        return (
            <div>
                <TitleBar title="选择车型" />
                <SelectStyle />
            </div>
        )
    };
}