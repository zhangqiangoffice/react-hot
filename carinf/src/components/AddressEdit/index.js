import React, {Component} from 'react';

import TitleBar from '../public/TitleBar';
import AddressForm from './AddressForm';
import Loading from '../public/Loading';
import SelectorInLine from '../public/SelectorInLine';

import zAJAX from 'z-ajax'
// import AppStore from '../../stores/AppStore';
// import AppActionCreators from '../../actions/AppActionCreators';
// import APIUtils from '../APIUtils';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,        //显示加载中遮罩层
        };

        this.changeIsLoading = this.changeIsLoading.bind(this);

    };

    changeIsLoading() {
        this.setState(prevState => ({
          isLoading: !prevState.isLoading
        }));
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <TitleBar title="编辑配送方式" />
                <AddressForm 
                    changeIsLoading={this.changeIsLoading}
                    params={this.props.params} 
                     />
                <Loading isLoading={this.state.isLoading}/>
                
            </div>
        )
    };
}