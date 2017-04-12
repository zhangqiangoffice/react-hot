import React, {Component} from 'react';
import APIUtils from './APIUtils';
import AppActionCreators from '../actions/AppActionCreators';
import AppStore from '../stores/AppStore';

export default class ChoiceApplyType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            canNewApply : AppStore.getCanNewApply(),
        };

        this.showBlankForm = this.showBlankForm.bind(this);
    };

    //显示新增申请
    showBlankForm(event) {
        let index = Number.parseInt(event.target.dataset.index);
        AppActionCreators.updateApplyType(index);
        switch (index) {
            case 3:
                AppActionCreators.showLoading();
                window.location.href = ctx + '/document_mobile/develop/add_new_document?staffId=' + AppStore.getStaffid();
                break;
            case 4:
                AppActionCreators.showComponent('NewBusinessTravel');
                break;
            case 5:
                AppActionCreators.showComponent('NewOffWork');
                break;
            case 6:
                AppActionCreators.showComponent('NewWorkOvertime');
                break;
            default:
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
                    <li key={index}><button data-index={index} type="button" onClick={this.showBlankForm}>{name}</button></li>
                ); 
            } 
        });

        return (
            <div className="choice_apply_type">
                <div className="type_box">
                    <h1 className="type_title">
                        请选择申请表类型
                    </h1>

                    <ul className="type_list">
                        {listShows}
                    </ul>
                    <button className="cancel" type="button" onClick={this.props.closeApplyType}>取消</button>
                </div>
            </div>      
        );
    };
}