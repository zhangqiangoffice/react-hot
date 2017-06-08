import React, {Component} from 'react';
import TitleBar from '../public/TitleBar';
import SelectStyle from './SelectStyle';
import TopTip from '../public/TopTip';

export default class Out extends Component {

    render() {

        return (
            <div>
                <TitleBar title="选择车型" />
                <TopTip tip="从列表中选择您的车型" />
                <SelectStyle />
            </div>
        )
    };
}