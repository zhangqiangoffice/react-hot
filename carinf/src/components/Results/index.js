import React, {Component} from 'react';

import TitleBar from '../public/TitleBar';
import ResultList from './ResultList';

import zAJAX from 'z-ajax'

export default class App extends Component {
    constructor(props) {
        super(props);

    };

    render() {

        return (
            <div>
                <TitleBar title="报价结果" />
                <ResultList isCurrent={true} />
            </div>
        )
    };
}