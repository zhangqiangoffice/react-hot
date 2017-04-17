import React, {Component} from 'react';
import TitleBar from './TitleBar';
import ResultList from './ResultList';

export default class App extends Component {
    render() {
        return (
            <div>
                <TitleBar title="报价结果" />
                <ResultList />
            </div>
        )
    };
}