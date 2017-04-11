import React, {Component} from 'react';
import Switcher from '../Switcher';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import InsuranceStore from '../../stores/InsuranceStore';

import DatePic from '../public/DatePic';

export default class Plan extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            beginDate: InsuranceStore.getBeginDate(),
            traBeginDate: InsuranceStore.getTraBeginDate(),
            lastBeginDate: InsuranceStore.getLastBeginDate(),
            lastTraBeginDate: InsuranceStore.getLastTraBeginDate(),
            ciFlag: InsuranceStore.getCiFlag(),

        };

        this.onInsuranceChange = this.onInsuranceChange.bind(this);
        this.changeBeginDate = this.changeBeginDate.bind(this);
        this.changeTraBeginDate = this.changeTraBeginDate.bind(this);
    };

    onInsuranceChange() {
        this.setState({
            beginDate: InsuranceStore.getBeginDate(),
            traBeginDate: InsuranceStore.getTraBeginDate(),
            lastBeginDate: InsuranceStore.getLastBeginDate(),
            lastTraBeginDate: InsuranceStore.getLastTraBeginDate(),
            ciFlag: InsuranceStore.getCiFlag(),

        });
    }

    componentDidMount() {      
        InsuranceStore.addChangeListener(this.onInsuranceChange);
    };

    componentWillUnmount() {
        InsuranceStore.removeChangeListener(this.onInsuranceChange);
    };

    // componentDidUpdate() {
    //     var that = this;
    //     var currYear = (new Date()).getFullYear(); 
    //     var dd = new Date();
    //     dd.setDate(dd.getDate() + 1);//获取AddDayCount天后的日期
    //     var y = dd.getFullYear();
    //     var m = dd.getMonth();//获取当前月份的日期
    //     var d = dd.getDate();

    //     var opt3 = {
    //         preset: 'date', //日期，可选：date\datetime\time\tree_list\image_text\select
    //         theme: 'android-ics light', //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
    //         display: 'modal', //显示方式 ，可选：modal\inline\bubble\top\bottom
    //         mode: 'mixed', //日期选择模式，可选：scroller\clickpick\mixed
    //         lang:'zh',
    //         dateFormat: 'yyyy-mm-dd', // 日期格式
    //         setText: '确定', //确认按钮名称
    //         cancelText: '取消',//取消按钮名籍我
    //         dateOrder: 'yyyymmdd', //面板中日期排列格式
    //         dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
    //         showNow: false,  
    //         nowText: "今",  
    //         endYear: currYear + 1, //结束年份  
    //         minDate: new Date(this.state.lastBeginDate),
    //         onChange: function (valueText, inst) {
    //             var text ;
    //             if (new Date(valueText + ' 00:00:00') < opt3.minDate ) {
    //                 text = that.state.lastBeginDate;
    //             } else {
    //                 text = valueText + ' 00:00:00'
    //             }
    //             InsuranceActionCreators.changeBeginDate(text);
    //         }
    //         //endYear:2099 //结束年份
    //     };


    //     var opt4 = {
    //         preset: 'date', //日期，可选：date\datetime\time\tree_list\image_text\select
    //         theme: 'android-ics light', //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
    //         display: 'modal', //显示方式 ，可选：modal\inline\bubble\top\bottom
    //         mode: 'mixed', //日期选择模式，可选：scroller\clickpick\mixed
    //         lang:'zh',
    //         dateFormat: 'yyyy-mm-dd', // 日期格式
    //         setText: '确定', //确认按钮名称
    //         cancelText: '取消',//取消按钮名籍我
    //         dateOrder: 'yyyymmdd', //面板中日期排列格式
    //         dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
    //         showNow: false,  
    //         nowText: "今",  
    //         endYear: currYear + 1, //结束年份  
    //         minDate: new Date(this.state.lastTraBeginDate),
    //         onChange: function (valueText, inst) {
    //             var text;
    //             if (new Date(valueText + ' 00:00:00') < opt4.minDate ) {
    //                 text = that.state.lastTraBeginDate;
    //             } else {
    //                 text = valueText + ' 00:00:00'
    //             }
    //             InsuranceActionCreators.changeTraBeginDate(text);
    //         }
    //         //endYear:2099 //结束年份
    //     };
        
    //     $("#date_picker3").mobiscroll(opt3);
    //     $("#date_picker4").mobiscroll(opt4);

    // }

    changeBeginDate(m) {
        let text ;
        if (new Date(m + ' 00:00:00') < new Date(this.state.lastBeginDate) ) {
            text = this.state.lastBeginDate;
        } else {
            text = m + ' 00:00:00'
        }
        InsuranceActionCreators.changeBeginDate(text);
    }

    changeTraBeginDate(m) {
        let text;
        if (new Date(m + ' 00:00:00') < new Date(this.state.lastTraBeginDate) ) {
            text = this.state.lastTraBeginDate;
        } else {
            text = m + ' 00:00:00'
        }
        InsuranceActionCreators.changeTraBeginDate(text);
    }

    render() {

        return (   
            <ul className="insurance_date">
                <li>
                    <label style={{verticalAlign: 'top'}}>商业险起保日期</label>
                    {/*<input type="text" id="date_picker3" placeholder="请选择" defaultValue={(this.state.beginDate).slice(0, 10)} />*/}
                    <div style={{display: 'inline-block'}}>
                        <DatePic title="商业险起保日期" theDate={(this.state.beginDate).slice(0, 10)} minDate={(this.state.beginDate).slice(0, 10)} onChangeDate={this.changeBeginDate}
                        />
                    </div>
                </li>
                <li>
                    交强险
                    <Switcher isOn={this.state.ciFlag} onClick={InsuranceActionCreators.toggleCiFlag}/>
                </li>
                <li className={this.state.ciFlag ? '' : 'hide'}>
                    <label style={{verticalAlign: 'top'}}>交强险起保日期</label>
                    {/*<input type="text" id="date_picker4" placeholder="请选择" defaultValue={(this.state.traBeginDate).slice(0, 10)} />*/}
                    <div style={{display: 'inline-block'}}>
                        <DatePic title="交强险起保日期" theDate={(this.state.traBeginDate).slice(0, 10)} minDate={(this.state.traBeginDate).slice(0, 10)} onChangeDate={this.changeTraBeginDate}
                        />
                    </div>
                </li>
            </ul>
        );
    };
}