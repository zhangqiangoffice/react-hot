import React, {Component} from 'react'
import BlankLi from './BlankLi'
import InputBox from './InputBox'
import ClickDiv from './ClickDiv'
import RadioSelector from './RadioSelector'
import data from '../reducers/data.json'


export default class OutPut extends Component {

    // componentDidMount() {
    //     let currYear = (new Date()).getFullYear(); 
    //     let that = this;

    //     var opt2 = {
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
    //         startYear:currYear - 80, //开始年份  
    //         maxDate: new Date(),
    //         onChange: function (valueText, inst) {
    //             that.props.onChangeHolderBirthday(valueText);
    //         }
    //         //endYear:2099 //结束年份
    //     };
        
    //     $("#datePicker2").mobiscroll(opt2);
          // <input id="datePicker2" className="date_picker" placeholder="请选择" value={this.props.holderBirthday} />
    // }

  render() {
    return (
      <ul className="coat_ul">
        <BlankLi item="投保人姓名">
          {this.props.justRead ? this.props.holderName :
          <InputBox val={this.props.holderName} onChangeVal={this.props.onChangeHolderName}/>
          }
        </BlankLi>
        <BlankLi item="证件类型">
          {this.props.justRead ? data.HolderCertiType[this.props.holderCertiType] :
          <ClickDiv val={data.HolderCertiType[this.props.holderCertiType]} onClickHandler={e => this.props.showHolderCertiTypeBox(this.props.holderCertiType)}/>
          }
        </BlankLi>
        <BlankLi item="证件号码">
          {this.props.justRead ? this.props.holderCertiNo :
          <InputBox val={this.props.holderCertiNo} onChangeVal={this.props.onChangeHolderNo}/>
          }
        </BlankLi>
        <BlankLi item="出生日期">
          {this.props.justRead ? this.props.holderBirthday :
          <InputBox val={this.props.holderBirthday} onChangeVal={this.props.onChangeHolderBirthday}/>
          }
        </BlankLi>
        <BlankLi item="投保人性别">
          {this.props.justRead ? data.HolderGender[this.props.holderGender] :
          <RadioSelector a={data.HolderGender[0]} b={data.HolderGender[1]} selected={this.props.holderGender} onSelect={this.props.onChangeHolderGender}/>
          }
        </BlankLi>
        <BlankLi item="投保人电话">
          {this.props.justRead ? this.props.holderPhone :
          <InputBox val={this.props.holderPhone} onChangeVal={this.props.onChangeHolderPhone}/>
          }
        </BlankLi>
        <BlankLi item="投保人邮箱">
          {this.props.justRead ? this.props.holderEmail :
          <InputBox val={this.props.holderEmail} onChangeVal={this.props.onChangeHolderEmail}/>
          }
        </BlankLi>

      </ul>
    )
  };
}