import React, {Component} from 'react';
import APIUtils from '../APIUtils';
import ApplyScheme from './ApplyScheme';
import SchemeSwitcher from './SchemeSwitcher';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import InsuranceStore from '../../stores/InsuranceStore';
import InsuranceDate from './InsuranceDate'
import ButtonBottom from '../public/ButtonBottom';

export default class Plan extends Component {
    constructor(props){
        super(props);
        
        this.state = this.getData();

        this.onInsuranceChange = this.onInsuranceChange.bind(this);
    };

    getData() {
        return {
            schemeIndex: InsuranceStore.getSchemeIndex(),
            beginDate: InsuranceStore.getBeginDate(),
            traBeginDate: InsuranceStore.getTraBeginDate(),
            lastBeginDate: InsuranceStore.getLastBeginDate(),
            lastTraBeginDate: InsuranceStore.getLastTraBeginDate(),
            ciFlag: InsuranceStore.getCiFlag(),
            threeSchemeList: InsuranceStore.getThreeSchemeList(),
        }
    }

    onInsuranceChange() {
        this.setState(this.getData());
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
                
                <InsuranceDate 
                    beginDate={this.state.beginDate}
                    traBeginDate={this.state.traBeginDate}
                    lastBeginDate={this.state.lastBeginDate}
                    lastTraBeginDate={this.state.lastTraBeginDate}
                    ciFlag={this.state.ciFlag}
                />

                <ApplyScheme scheme={this.state.threeSchemeList[this.state.schemeIndex]}/>
                
                <ButtonBottom onClickHandle={this.quote} fixed={true}/>
            </div>
        );
    };
}