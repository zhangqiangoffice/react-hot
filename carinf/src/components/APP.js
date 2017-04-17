import React, {Component} from 'react';

import AlertProgress from './public/AlertProgress'

import AppStore from '../stores/AppStore';
import RadioSelector from './RadioSelector';
import APIUtils from './APIUtils';
import style from './asset/css/index.less'
import initial from './asset/css/mobile_initial.css'


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAlertProgress: AppStore.getIsAlertProgress(),
            isFinished: AppStore.getIsFinished(),
            msg: AppStore.getMsg(),
            isRadioSelector: AppStore.getIsRadioSelector(),
            options: AppStore.getOptions(), 
            selectedOption: AppStore.getSelectedOption(),
            liClickHandle: AppStore.getLiClickHandle()       
        };

        this.onAppChange = this.onAppChange.bind(this);
    };

    onAppChange() {
        this.setState({  
            isAlertProgress: AppStore.getIsAlertProgress(),
            isFinished: AppStore.getIsFinished(),
            msg: AppStore.getMsg(),
            isRadioSelector: AppStore.getIsRadioSelector(),
            options: AppStore.getOptions(), 
            selectedOption: AppStore.getSelectedOption(),
            liClickHandle: AppStore.getLiClickHandle()   
               
        });
    };

    componentDidMount() {      
        AppStore.addChangeListener(this.onAppChange);
        APIUtils.getDataFromUrl();

    };

    componentWillUnmount() {
        AppStore.removeChangeListener(this.onAppChange);
    };

    render() {

        return (
            <div>
                <AlertProgress isShow={this.state.isAlertProgress}  message={this.state.msg} isFinished={this.state.isFinished}/>
                <RadioSelector 
                    isRadioSelector={this.state.isRadioSelector} 
                    options={this.state.options} 
                    selectedOption={this.state.selectedOption}
                    liClickHandle={this.state.liClickHandle} 

                /> 

                {this.props.children}
            </div>
        );
    };
}