import React, {Component} from 'react';
import InsuranceItem from './InsuranceItem';
import APIUtils from './APIUtils';
import Switcher from './Switcher';
import ApplyScheme from './ApplyScheme';
import SchemeSwitcher from './SchemeSwitcher';
import InsuranceActionCreators from '../actions/InsuranceActionCreators';
import InsuranceStore from '../stores/InsuranceStore';
import AppStore from '../stores/AppStore';

import Loading from './Loading';
import RadioSelector from './RadioSelector';

export default class Plan extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            isLoading: AppStore.getIsLoading(),        //显示加载中遮罩层
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
            isLoading: AppStore.getIsLoading(),        //显示加载中遮罩层
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

    componentDidUpdate() {
        var that = this;
        var currYear = (new Date()).getFullYear(); 
        var dd = new Date();
        dd.setDate(dd.getDate() + 1);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth();//获取当前月份的日期
        var d = dd.getDate();

        var opt3 = {
            preset: 'date', //日期，可选：date\datetime\time\tree_list\image_text\select
            theme: 'android-ics light', //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
            display: 'modal', //显示方式 ，可选：modal\inline\bubble\top\bottom
            mode: 'mixed', //日期选择模式，可选：scroller\clickpick\mixed
            lang:'zh',
            dateFormat: 'yyyy-mm-dd', // 日期格式
            setText: '确定', //确认按钮名称
            cancelText: '取消',//取消按钮名籍我
            dateOrder: 'yyyymmdd', //面板中日期排列格式
            dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
            showNow: false,  
            nowText: "今",  
            endYear: currYear + 1, //结束年份  
            minDate: new Date(this.state.lastBeginDate),
            onChange: function (valueText, inst) {
                var text ;
                if (new Date(valueText + ' 00:00:00') < opt3.minDate ) {
                    text = that.state.lastBeginDate;
                } else {
                    text = valueText + ' 00:00:00'
                }
                InsuranceActionCreators.changeBeginDate(text);
            }
            //endYear:2099 //结束年份
        };


        var opt4 = {
            preset: 'date', //日期，可选：date\datetime\time\tree_list\image_text\select
            theme: 'android-ics light', //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
            display: 'modal', //显示方式 ，可选：modal\inline\bubble\top\bottom
            mode: 'mixed', //日期选择模式，可选：scroller\clickpick\mixed
            lang:'zh',
            dateFormat: 'yyyy-mm-dd', // 日期格式
            setText: '确定', //确认按钮名称
            cancelText: '取消',//取消按钮名籍我
            dateOrder: 'yyyymmdd', //面板中日期排列格式
            dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
            showNow: false,  
            nowText: "今",  
            endYear: currYear + 1, //结束年份  
            minDate: new Date(this.state.lastTraBeginDate),
            onChange: function (valueText, inst) {
                var text;
                if (new Date(valueText + ' 00:00:00') < opt4.minDate ) {
                    text = that.state.lastTraBeginDate;
                } else {
                    text = valueText + ' 00:00:00'
                }
                InsuranceActionCreators.changeTraBeginDate(text);
            }
            //endYear:2099 //结束年份
        };
        
        $("#date_picker3").mobiscroll(opt3);
        $("#date_picker4").mobiscroll(opt4);

    }

    //请求报价方案
    quote() {
        InsuranceActionCreators.clearQuote();
        APIUtils.quote();
    }

    render() {

        if (!this.props.isCurrent) {
            return null;
        }

        return (
            <div className="plan">
                <SchemeSwitcher schemeIndex={this.state.schemeIndex} />
                
                <ul className="insurance_date">
                    <li>
                        <label>商业险起保日期</label>
                        <input type="text" id="date_picker3" placeholder="请选择" defaultValue={(this.state.beginDate).slice(0, 10)} />
                    </li>
                    <li>
                        交强险
                        <Switcher isOn={this.state.ciFlag} onClick={InsuranceActionCreators.toggleCiFlag}/>
                    </li>
                    <li className={this.state.ciFlag ? '' : 'hide'}>
                        <label>交强险起保日期</label>
                        <input type="text" id="date_picker4" placeholder="请选择" defaultValue={(this.state.traBeginDate).slice(0, 10)} />
                    </li>
                </ul>

                <ApplyScheme scheme={this.state.threeSchemeList[this.state.schemeIndex]} insuranceCom={this.state.insuranceCom}/>

                <Loading isLoading={this.state.isLoading} />

                <RadioSelector 
                    isRadioSelector={this.state.isRadioSelector} 
                    options={this.state.options} 
                    selectedOption={this.state.selectedOption}
                    liClickHandle={this.state.liClickHandle} 

                    /> 
                    
                <button type="button" className="next fixed" onClick={this.quote}>下一步</button>
            </div>
        );
    };
}