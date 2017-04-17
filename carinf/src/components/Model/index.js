import React, {Component} from 'react';
import TitleBar from '../public/TitleBar';
import SelectStyle from './SelectStyle';

export default class Out extends Component {

    render() {

        return (
            <div>
                <TitleBar title="选择车型" />
                <SelectStyle />
            </div>
        )
    };
}