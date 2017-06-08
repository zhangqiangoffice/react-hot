import React, {Component} from 'react';
import TitleBar from '../public/TitleBar';
import Stakeholder from './Stakeholder';
import TopTip from '../public/TopTip';

export default class Out extends Component {

    render() {

        return (
            <div>
                <TitleBar title="投保确认" />
                <TopTip tip="认真填写并确认保单信息" />
                <Stakeholder />
            </div>
        )
    };
}