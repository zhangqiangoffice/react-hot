import React, {Component} from 'react';
import TitleBar from '../public/TitleBar';
import IFrame from './IFrame';

export default class App extends Component {
    
    //设置meta标签的viewPort，用以平衡antd
    setViewPort(scale){
        let doc = window.document
        let metaEl = doc.querySelector('meta[name="viewport"]');
        if (!metaEl) {
            metaEl = doc.createElement('meta');
            metaEl.setAttribute('name', 'viewport');
            doc.head.appendChild(metaEl);
        }
        metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
    }

    componentDidMount() {      
        this.setViewPort('1')
    };

    componentWillUnmount() {
        this.setViewPort('0.5')
    };

    render() {
        return (
            <div>
                <TitleBar title="太平洋车险" />
                <IFrame />
            </div>
        )
    };
}