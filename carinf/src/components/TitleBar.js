import React, {Component} from 'react';
import appInfo from './json/appInfo.json';
import AppActionCreators from '../actions/AppActionCreators';
import AppStore from '../stores/AppStore';
import InsuranceStore from '../stores/InsuranceStore';
import InsuranceActionCreators from '../actions/InsuranceActionCreators';
import APIUtils from './APIUtils'

export default class TitleBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offers: InsuranceStore.getOffers(),  
            hasMore: true, 
            edit: AppStore.getEdit(),  
            fromPage: AppStore.getFromPage(),   
        };

        this.showOthers = this.showOthers.bind(this);
        this.askOther = this.askOther.bind(this);
        this.unOffers = this.unOffers.bind(this);
        this.onInsuranceChange = this.onInsuranceChange.bind(this);
        this.onAppChange = this.onAppChange.bind(this);
        this.goBack = this.goBack.bind(this);
    };

    onInsuranceChange() {
        this.setState({
            offers: InsuranceStore.getOffers(),
        });
    };

    onAppChange() {
        this.setState({
            edit: AppStore.getEdit(), 
            fromPage: AppStore.getFromPage(), 
        });
    };

    componentDidMount() {      
        InsuranceStore.addChangeListener(this.onInsuranceChange);
        AppStore.addChangeListener(this.onAppChange);
    };

    componentWillUnmount() {
        InsuranceStore.removeChangeListener(this.onInsuranceChange);
        AppStore.removeChangeListener(this.onAppChange);
    };

    //后退一步
    goBack() {
        if (this.props.step === 0) {
            if (!window.minsheng) {
                alert('请使用手机的返回键');
            } else {
                window.minsheng.clickOnAndroid();
            }
        } else {
            
            //如果是从订单详情页过来的，就回退到订单详情页
            if (this.props.step === 6 && this.state.edit === 'yes') {
                
                //如果来自订单详情页，则地址栏后退一步，如果是列表页，则关闭当前webView
                if (this.state.fromPage === 'detail') {
                    window.history.back();
                } else {
                    if (!window.minsheng) {
                        alert('请使用手机的返回键');
                    } else {
                        window.minsheng.clickOnAndroid();
                    }
                }
            } else {
                AppActionCreators.stepGoBack();
            }
        }
    }

    //未获取报价的保险公司
    unOffers() {
        let options = [];
        let total = appInfo.componies.slice(1, 3);     //不包括太平洋\人保
        let len = total.length;
        for (let i = 0; i < len; i++) {
            let id = total[i].id;
            if (!this.state.offers[id]) {
                options.push(total[i]);
            }
        }
        return options;
    }


    //打开其他家保险公司
    showOthers() {
        let options = [];
        let unOffersArr = this.unOffers();
        unOffersArr.forEach(function(el){
            options.push(el.product);
        });
        AppActionCreators.showRadioSelector({
            options,
            selectedOption: '',
            liClickHandle: this.askOther
        });
    };

    //请求其他家数据
    askOther(index) {
        let ids = [];
        let unOffersArr = this.unOffers();
        let len = unOffersArr.length;
        unOffersArr.forEach(function(el){
            ids.push(el.id);
        });
        InsuranceActionCreators.updateInsuranceCom(ids[index]);
        APIUtils.quote2();

        //当请求最后一家其他家报价后，三个点的按钮将不再显示
        if (len === 1) {
            this.setState({
                hasMore: false,
            });
        }

    }

    render() {
        let title = appInfo.titles[this.props.step];
        return (
            <div className="title_bar">
                <button id="go_back" type="button" onClick={this.goBack}> </button>
                <h1>{title}</h1>
                <button type="button" className={'others ' + (this.props.step === 5 && this.state.hasMore ? '' : 'hide')} onClick={this.showOthers}> </button>
            </div>
        );
    };
}