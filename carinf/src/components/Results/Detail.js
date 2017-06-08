import React, {Component} from 'react';
import Type from './Type';
import Tra from './Tra';
import Busi from './Busi';
import style from '../asset/css/Results.less'

export default class Out extends Component {
    render() {
        let result = this.props.result;
        return (  
            <div className={style.detail_tables}>
                <Type result={result} />
                <Tra result={result} />
                <Busi result={result} />
            </div>
        );
    };
}