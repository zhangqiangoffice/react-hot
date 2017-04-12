import React, {Component} from 'react'
import BlankLi from './BlankLi'
import InputBox from './InputBox'
import DatePic from './DatePic';

export default class OutPut extends Component {
    // constructor(props) {
    //     super(props);


    // };

    // componentDidMount() {
    //     // let currYear = (new Date()).getFullYear(); 
    //     let that = this;
    //     let dd = new Date();
    //     dd.setDate(dd.getDate() + 1);//获取AddDayCount天后的日期 

    //     //初始化日期控件
    //     let opt1 = {
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
    //         // startYear:currYear - 15, //开始年份  
    //         minDate: dd,
    //         onChange: function (valueText, inst) {
    //             that.props.onChangeEffectiveDate(valueText);
    //         }
    //     };

        // var opt2 = {
        //     preset: 'date', //日期，可选：date\datetime\time\tree_list\image_text\select
        //     theme: 'android-ics light', //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
        //     display: 'modal', //显示方式 ，可选：modal\inline\bubble\top\bottom
        //     mode: 'mixed', //日期选择模式，可选：scroller\clickpick\mixed
        //     lang:'zh',
        //     dateFormat: 'yyyy-mm-dd', // 日期格式
        //     setText: '确定', //确认按钮名称
        //     cancelText: '取消',//取消按钮名籍我
        //     dateOrder: 'yyyymmdd', //面板中日期排列格式
        //     dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
        //     showNow: false,  
        //     nowText: "今",  
        //     startYear:currYear - 15, //开始年份  
        //     maxDate: new Date(),
        //     onChange: function (valueText, inst) {
        //         CarActionCreators.changeIssueDate(valueText);
        //     }
        //     //endYear:2099 //结束年份
        // };

    //     $("#datePicker1").mobiscroll(opt1);

    // }

  render() {
    const spanStyle={
        display: 'inline-block',
        marginLeft: '1.4rem',
        verticalAlign: 'top',
    }

    let dd = new Date();
    dd.setDate(dd.getDate() + 1);//获取AddDayCount天后的日期 

    return (
      <ul className="coat_ul">
        <BlankLi item="保险名称">
          众安驾乘意外伤害保险
        </BlankLi>
        <BlankLi item="保险起期">
          {this.props.justRead ? <span className="date_span">{this.props.effectiveDate}</span> :
          <div style={{display: 'inline-block'}}>
            <DatePic title="保险起期" theDate={this.props.effectiveDate} minDate={dd} onChangeDate={this.props.onChangeEffectiveDate}
            />
          </div>
          }
          <span style={spanStyle}>零时</span>
        </BlankLi>
        <BlankLi item="保险止期">
          <span className="date_span">{this.props.expiryDate}</span>
          <span style={spanStyle}>24时</span>
        </BlankLi>
      </ul>
    )
  };
}