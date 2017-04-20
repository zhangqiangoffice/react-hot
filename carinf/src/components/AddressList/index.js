import React, {Component} from 'react';
import TitleBar from '../public/TitleBar';
import List from './List';
import ButtonBottom from '../public/ButtonBottom';
import TopTip from '../public/TopTip'
import AppActionCreators from '../../actions/AppActionCreators';
import { queryAddress } from '../APIUtils';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
           addList: [],
        };
    };

    componentDidMount() {      
        this.quoteAddress();
    };

    //获取邮寄地址列表
    quoteAddress () {
        AppActionCreators.startAlertProgress();
        let cb = msg => {
            if (msg.result === 1) {
                AppActionCreators.finishAlertProgress();
                this.setState({
                    addList : [ ...msg.list]
                })
            }else{
                AppActionCreators.messageAlertProgress(msg.message);
            }
        } 
        queryAddress(cb);
    };

    addNewAddress() {
        window.location = '#/addressEdit'
    };

    render() {
        return (
            <div>
                <TitleBar title="管理配送方式" />
                <TopTip tip={this.state.addList.length ? '下列是您最近使用的地址' : '可点击下方按钮新增地址'} />
                {this.state.addList.length ? <List list={this.state.addList}/> : null}
                <ButtonBottom text='添加新地址' onClickHandle={this.addNewAddress}/>
            </div>
        )
    };
}