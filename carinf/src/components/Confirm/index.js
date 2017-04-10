import React, {Component} from 'react';

import TitleBar from '../public/TitleBar';
import Stakeholder from './Stakeholder';

export default class App extends Component {
    constructor(props) {
        super(props);

    };

    render() {

        return (
            <div>
                <TitleBar title="投保确认" />
                <Stakeholder />
            </div>
        )
    };
}