import React, {Component} from 'react';
import Switcher from './Switcher';
import InsuranceActionCreators from '../actions/InsuranceActionCreators';
import AppActionCreators from '../actions/AppActionCreators';
import appInfo from './json/appInfo.json';

export default class InsuranceItem extends Component {
    constructor(props){
        super(props);

        this.toggleDedu = this.toggleDedu.bind(this);
        this.changeInsurance = this.changeInsurance.bind(this);
        this.transformChoice = this.transformChoice.bind(this);
        this.changeInsuranceChoice = this.changeInsuranceChoice.bind(this);
    };

    //更改不计免赔
    toggleDedu() {
        let code = this.props.deductible.code;
        InsuranceActionCreators.toggleDedu(code);
    }

    //转换选项
    transformChoice(choice) {
        let label = '';
        switch (true) {
            case choice - 0 === 0:
                label = "投保";
                break;
            case choice - 0 === -1:
                label = "不投保";
                break;
            case choice - 0 >= 10000:
                label = (choice / 10000) + '万'
                break;
            default:
                label = choice;
                break;
        }
        return label;
    }

    //获取某险种的保额数组
    getItemStr(){
        let code = this.props.insurance.code;
        let itemStr;
        appInfo.insuranceList.map((insurance, index) => {
            if (insurance.code === code) {
                itemStr = insurance.item;
            }
        });
        
        //如果是中华车险，则隐掉 进口玻璃 选项
        if (this.props.insuranceCom === 3) {
            return (itemStr.replace('@进口', '')).split('@')
        }
        return itemStr.split('@');
    }

    //点击修改主险
    changeInsurance() {
        let insurance = this.props.insurance;
        let choice = this.transformChoice(insurance.choice);
        let itemArr = this.getItemStr();

        //保额代码数组转保额字符数组
        itemArr.map((item, index) => {
            //已选择的投保项
            let label = this.transformChoice(item);
            itemArr[index] = label;
        });

        AppActionCreators.showRadioSelector({
            options: itemArr,
            selectedOption: choice,
            liClickHandle: this.changeInsuranceChoice
        });
    }

    //修改主险的选择
    changeInsuranceChoice(index) {
        let code = this.props.insurance.code;
        let itemArr = this.getItemStr();
        InsuranceActionCreators.changeInsuranceItem(code, itemArr[index]);
    }

    render() {
        
        //不计免赔的开关
        let switcher = null;
        if (this.props.deductible) {
                switcher = <Switcher isOn={this.props.deductible.choice === 0} onClick={this.toggleDedu}/>
        }
        
        //已选择的投保项
        let label = this.transformChoice(this.props.insurance.choice);
        
        return (
            <tr>
                <td>{this.props.insurance.name}</td>
                <td onClick={this.changeInsurance}>{label}</td>
                <td>{label === '不投保' ? null : switcher}</td>
            </tr>
        );
    };
}
