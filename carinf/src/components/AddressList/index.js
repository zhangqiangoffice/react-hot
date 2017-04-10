import React, {Component} from 'react';

import TitleBar from '../public/TitleBar';
import List from './List';
import ButtonBottom from '../public/ButtonBottom';
import Loading from '../public/Loading';

import zAJAX from 'z-ajax'



export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,        //显示加载中遮罩层
            
        };

        this.changeIsLoading = this.changeIsLoading.bind(this);
        this.addNewAddress = this.addNewAddress.bind(this);

    };

    changeIsLoading() {
        this.setState(prevState => ({
          isLoading: !prevState.isLoading
        }));
    };

    addNewAddress() {
        window.location = '#/addressEdit'
    };

    render() {
        return (
            <div>
                <TitleBar title="管理配送方式" />
                <List 
                    changeIsLoading={this.changeIsLoading}
                     />
                <Loading isLoading={this.state.isLoading}/>

                <ButtonBottom text='添加新地址' onClickHandle={this.addNewAddress}/>
                
            </div>
        )
    };
}