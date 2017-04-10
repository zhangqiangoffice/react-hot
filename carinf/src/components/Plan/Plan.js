import React, {Component} from 'react';
import InsuranceItem from '../InsuranceItem';
import APIUtils from '../APIUtils';
import Switcher from '../Switcher';
import ApplyScheme from '../ApplyScheme';
import SchemeSwitcher from '../SchemeSwitcher';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import InsuranceStore from '../../stores/InsuranceStore';
import AppStore from '../../stores/AppStore';

import RadioSelector from '../RadioSelector';
import InsuranceDate from './InsuranceDate'

export default class Plan extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            insuranceCom: InsuranceStore.getInsuranceCom(),
            schemeIndex: InsuranceStore.getSchemeIndex(),
            beginDate: InsuranceStore.getBeginDate(),
            traBeginDate: InsuranceStore.getTraBeginDate(),
            lastBeginDate: InsuranceStore.getLastBeginDate(),
            lastTraBeginDate: InsuranceStore.getLastTraBeginDate(),
            ciFlag: InsuranceStore.getCiFlag(),
            threeSchemeList: InsuranceStore.getThreeSchemeList(),

            isRadioSelector: AppStore.getIsRadioSelector(),
            options: AppStore.getOptions(), 
            selectedOption: AppStore.getSelectedOption(),
            liClickHandle: AppStore.getLiClickHandle(),
        };

        this.onInsuranceChange = this.onInsuranceChange.bind(this);
        this.quote = this.quote.bind(this);
    };

    onInsuranceChange() {
        this.setState({
            insuranceCom: InsuranceStore.getInsuranceCom(),
            schemeIndex: InsuranceStore.getSchemeIndex(),
            beginDate: InsuranceStore.getBeginDate(),
            traBeginDate: InsuranceStore.getTraBeginDate(),
            lastBeginDate: InsuranceStore.getLastBeginDate(),
            lastTraBeginDate: InsuranceStore.getLastTraBeginDate(),
            ciFlag: InsuranceStore.getCiFlag(),
            threeSchemeList: InsuranceStore.getThreeSchemeList(),

            isRadioSelector: AppStore.getIsRadioSelector(),
            options: AppStore.getOptions(), 
            selectedOption: AppStore.getSelectedOption(),
            liClickHandle: AppStore.getLiClickHandle()
        });
    }

    componentDidMount() {      
        InsuranceStore.addChangeListener(this.onInsuranceChange);
    };

    componentWillUnmount() {
        InsuranceStore.removeChangeListener(this.onInsuranceChange);
    };

    //请求报价方案
    quote() {
        InsuranceActionCreators.clearQuote();
        APIUtils.quote();
    }

    render() {

        return (
            <div className="plan">
                <SchemeSwitcher schemeIndex={this.state.schemeIndex} />
                
                <InsuranceDate />

                <ApplyScheme scheme={this.state.threeSchemeList[this.state.schemeIndex]} insuranceCom={this.state.insuranceCom}/>

               {/* <RadioSelector 
                                   isRadioSelector={this.state.isRadioSelector} 
                                   options={this.state.options} 
                                   selectedOption={this.state.selectedOption}
                                   liClickHandle={this.state.liClickHandle} 
               
                                   /> */}
                    
                <button type="button" className="next fixed" onClick={this.quote}>下一步</button>
            </div>
        );
    };
}