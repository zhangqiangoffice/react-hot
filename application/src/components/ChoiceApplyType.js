import React, {Component} from 'react';
import APIUtils from './APIUtils';
import AppActionCreators from '../actions/AppActionCreators';
import AppStore from '../stores/AppStore';
import style from '../asset/css/ChoiceApplyType.less'

export default class ChoiceApplyType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            canNewApply : AppStore.getCanNewApply(),
        };

        this.showBlankForm = this.showBlankForm.bind(this);
    };

    //显示新增申请
    showBlankForm(index, text) {
        AppActionCreators.updateApplyType(index);
        switch (index) {
            case 0:
                AppActionCreators.showComponent('NewBusinessTravel');
                break;
            case 1:
                AppActionCreators.showComponent('NewOffWork');
                break;
            case 2:
                AppActionCreators.showComponent('NewWorkOvertime');
                break;
            default:
                AppActionCreators.showLoading();
                window.location.href = `${ctx}/document_mobile/develop/add_new_document?staffId=${AppStore.getStaffid()}&category=${text}`;
                break;
        }
        this.props.closeApplyType();
    }

    render() {
        if (!this.props.isShow) {
            return null
        }

        let listShows = AppStore.getCanNewApply().map((name, index) => {
            if (!!name) {
                return (
                    <button type="button" key={index} onClick={e => this.showBlankForm(index, name)}>{name}</button>
                ); 
            } 
        });

        return (
            <div className="cover">
                <div className={style.box}>
                    <h1>请选择申请表类型</h1>

                    {listShows}
                    
                    <button className={style.cancel} type="button" onClick={this.props.closeApplyType}>取消</button>
                </div>
            </div>      
        );
    };
}