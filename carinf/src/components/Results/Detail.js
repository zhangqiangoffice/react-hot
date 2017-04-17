import React, {Component} from 'react';
import Type from './Type';
import Tra from './Tra';
import Busi from './Busi';

export default class Out extends Component {
    render() {
        let result = this.props.result;
        return (  
            <div>
                <Type result={result} />
                <Tra result={result} />
                <Busi result={result} />
            </div>
        );
    };
}