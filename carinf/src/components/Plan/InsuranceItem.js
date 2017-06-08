import React, {Component} from 'react';
import Switcher from '../public/Switcher';
import SelectorRadio from '../public/SelectorRadio';
import InsuranceActionCreators from '../../actions/InsuranceActionCreators';
import { insuranceList } from '../asset/json/appInfo.json';
import InsuranceStore from '../../stores/InsuranceStore';
import { transformChoice } from '../APIUtils'

export default class InsuranceItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            showSelector: false,
        };

        this.toggleDedu = this.toggleDedu.bind(this);
        this.changeInsuranceChoice = this.changeInsuranceChoice.bind(this);
        this.toggleSelectorShow = this.toggleSelectorShow.bind(this);
    };

    //更改不计免赔
    toggleDedu() {
        let code = this.props.deductible.code;
        InsuranceActionCreators.toggleDedu(code);
    }

    //获取某险种的保额数组
    getItemStr(){
        let code = this.props.insurance.code;
        let itemStr;
        insuranceList.map((insurance, index) => {
            if (insurance.code === code) {
                itemStr = insurance.item;
            }
        });
        
        //如果是中华车险，则隐掉 进口玻璃 选项
        if (InsuranceStore.getInsuranceCom() === 3) {
            return (itemStr.replace('@进口', '')).split('@')
        }
        return itemStr.split('@');
    }

    toggleSelectorShow() {
        //因为SelectorRadio包含在了td内部，而td绑定了点击事件，但当点击SelectorRadio时，发生事件冒泡，所以又执行了一遍该函数，从而关闭了SelectorRadio
        this.setState({
            showSelector: !this.state.showSelector,
        })
    }

    //修改主险的选择
    changeInsuranceChoice(obj) {
        let code = this.props.insurance.code;
        let itemArr = this.getItemStr();
        InsuranceActionCreators.changeInsuranceItem(code, itemArr[obj.index]);
    }

    render() {
        
        let insurance = this.props.insurance;
        let deductible = this.props.deductible;
        let label = transformChoice(insurance.choice);
        let itemArr = this.getItemStr();
        //保额代码数组转保额字符数组
        itemArr.map((item, index) => {
            //已选择的投保项
            let label = transformChoice(item);
            itemArr[index] = label;
        });
        
        return (
            <tr>
                <td>{insurance.name}</td>
                <td onClick={this.toggleSelectorShow}>
                    <span>{label}</span>
                    <SelectorRadio isShow={this.state.showSelector}
                        options={itemArr}
                        selectedOption={label}
                        onClickHandle={this.changeInsuranceChoice}
                        />
                </td>
                <td>{label === '不投保' || !deductible ? null : <Switcher isOn={(deductible.choice - 0) === 0} onClick={this.toggleDedu}/>}</td>
            </tr>
        );
    };
}
