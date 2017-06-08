import React, {Component} from 'react';
// import appInfo from '../asset/json/appInfo.json';
// import AppActionCreators from '../../actions/AppActionCreators';
// import AppStore from '../../stores/AppStore';
// import InsuranceStore from '../../stores/InsuranceStore';
// import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
// import APIUtils from '../APIUtils'
import TitleBar from '../public/TitleBar'

export default class Out extends TitleBar {
    constructor(props) {
        super(props);

        // this.state = {
        //     // offers: InsuranceStore.getOffers(),  
        //     hasMore: false, 
        //     // edit: AppStore.getEdit(),  
        //     // fromPage: AppStore.getFromPage(),   
        // };

        // this.showOthers = this.showOthers.bind(this);
        // this.askOther = this.askOther.bind(this);
        // this.unOffers = this.unOffers.bind(this);
        // this.onInsuranceChange = this.onInsuranceChange.bind(this);
        // this.onAppChange = this.onAppChange.bind(this);
        // this.goBack = this.goBack.bind(this);
    };

    // onInsuranceChange() {
    //     this.setState({
    //         offers: InsuranceStore.getOffers(),
    //     });
    // };

    // onAppChange() {
    //     this.setState({
    //         edit: AppStore.getEdit(), 
    //         fromPage: AppStore.getFromPage(), 
    //     });
    // };

    // componentDidMount() {      
    //     InsuranceStore.addChangeListener(this.onInsuranceChange);
    //     AppStore.addChangeListener(this.onAppChange);
    // };

    // componentWillUnmount() {
    //     InsuranceStore.removeChangeListener(this.onInsuranceChange);
    //     AppStore.removeChangeListener(this.onAppChange);
    // };

    // //未获取报价的保险公司
    // unOffers() {
    //     let options = [];
    //     let total = appInfo.componies.slice(1, 3);     //不包括太平洋\人保
    //     let len = total.length;
    //     for (let i = 0; i < len; i++) {
    //         let id = total[i].id;
    //         if (!this.state.offers[id]) {
    //             options.push(total[i]);
    //         }
    //     }
    //     return options;
    // }


    //打开其他家保险公司
    // showOthers() {
    //     let options = [];
        // let unOffersArr = this.unOffers();
        // unOffersArr.forEach(function(el){
        //     options.push(el.product);
        // });
        // AppActionCreators.showRadioSelector({
        //     options,
        //     selectedOption: '',
        //     liClickHandle: this.askOther
        // });
    // };

    // //请求其他家数据
    // askOther(index) {
    //     let ids = [];
    //     let unOffersArr = this.unOffers();
    //     let len = unOffersArr.length;
    //     unOffersArr.forEach(function(el){
    //         ids.push(el.id);
    //     });
    //     InsuranceActionCreators.updateInsuranceCom(ids[index]);
    //     APIUtils.quote();

    //     //当请求最后一家其他家报价后，三个点的按钮将不再显示
    //     if (len === 1) {
    //         this.setState({
    //             hasMore: false,
    //         });
    //     }

    // }

    // render() {
    //     return (
    //         <div className="title_bar">
    //             <button id="go_back" type="button" onClick={this.goBack}> </button>
    //             <h1>{this.props.title}</h1>
    //             {this.state.hasMore ? <button type="button" className="others" onClick={this.showOthers}> </button> : null}
    //         </div>
    //     );
    // };
}