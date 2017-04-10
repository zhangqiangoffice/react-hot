import React, {Component} from 'react';
import appInfo from './json/appInfo.json';
import AppStore from '../stores/AppStore';
import AppActionCreators from '../actions/AppActionCreators';
import InsuranceActionCreators from '../actions/InsuranceActionCreators';

export default class Company extends Component {
    constructor(props){
        super(props);

        this.state = {
            workNum: AppStore.getWorkNum(),           //岗位号
        };

        this.onAppChange = this.onAppChange.bind(this);
    };

    onAppChange() {
        this.setState({
            workNum: AppStore.getWorkNum(),           //岗位号
        });
    };

    componentDidMount() {      
        AppStore.addChangeListener(this.onAppChange);
    };

    componentWillUnmount() {
        AppStore.removeChangeListener(this.onAppChange);
    };

    
    handleClick() {
        let id = this.props.company.id;
        if (id === 1) {
            if (window.minsheng) {
                window.minsheng.turnToActivity('太平洋车险', 'http://ecoop.idoutec.cn/wechatgateway/basic/auth?channel=H5_DBB_MSDL&state=car&userid=' + this.state.workNum);
            } else {
                window.location = '#/subFrame'
            }
        } else {
            AppActionCreators.stepNext();
            InsuranceActionCreators.updateInsuranceCom(id); 
            window.location = '#/enter'      
        }
    }

    render() {
        let company = this.props.company;
        return (
            <li onClick={this.handleClick.bind(this)}>
                <img src={ctx + '/static/img/carInf/pic_' + company.spell + '.png'} />
                <section>
                    <p className="title">{company.product}</p>
                    <p className="content">{company.info}</p> 
                    <img src={ctx + '/static/img/carInf/logo_' + company.spell + '.png'} />
                </section>
                <i className="clear"></i>
            </li>
        );
    };
}
