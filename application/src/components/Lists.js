import React, {Component} from 'react';
import Applications from './Applications';
import ChoiceApplyType from './ChoiceApplyType';
import APIUtils from './APIUtils';
import AppActionCreators from '../actions/AppActionCreators';
import AppStore from '../stores/AppStore';

export default class Lists extends Component {
    constructor(props) {
        super(props);
        this.showMy = this.showMy.bind(this);
        this.showToMe = this.showToMe.bind(this);
        this.showPigeonhole = this.showPigeonhole.bind(this);
        this.addNewApply = this.addNewApply.bind(this);
        this.closeApplyType = this.closeApplyType.bind(this);

        this.state = {
            isShow: false,      //是否显示新增申请类型选择框
        }
    };

    //展示我提交的
    showMy() {
        AppActionCreators.updateActivedListIndex(0);
    };

    //展示提交给我的
    showToMe() {
        AppActionCreators.updateActivedListIndex(1);
    };

    //展示归档
    showPigeonhole() {
        AppActionCreators.updateActivedListIndex(2);
    }

    //新增申请
    addNewApply() {
        this.setState({
            isShow: true,
        });
    };

    //关闭选择新增申请类型选择框
    closeApplyType() {
        this.setState({
            isShow: false,
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', function scrollHandler() {
            if ($('#anchor').length) {
                var top = $(document).scrollTop();
                var distance = $('#anchor').offset().top - $(window).height() - 50;
                if (top > distance) {
                    let activedListIndex = AppStore.getActivedListIndex();
                    if (!activedListIndex) {
                        let isAskingMore = AppStore.getIsAskingMore1();
                        if (!isAskingMore) {
                            APIUtils.moreMy();
                        }
                    } else {
                        let isAskingMore = AppStore.getIsAskingMore2();
                        if (!isAskingMore) {
                            APIUtils.moreToMe();
                        }
                    }
                }
            }
        });
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', scrollHandler);
    };

    render() {
        if (!this.props.isCurrent) {
            return null
        }

        return (
            <div className="application_list">
        
                <div className="title_bar">
                    <h1>签批</h1>
                </div>

                <ul className="list_title">
                    <li className={this.props.activedListIndex === 0 ? 'selected' : ''} onClick={this.showMy}>我提交的</li>
                    <li className={this.props.activedListIndex === 1 ? 'selected' : ''} onClick={this.showToMe}>提交给我的</li>
                    <li className={this.props.activedListIndex === 2 ? 'selected' : ''} onClick={this.showPigeonhole}>归档</li>
                </ul>

                <Applications 
                    activedListIndex={this.props.activedListIndex} 
                    list={this.props.list}
                    applyDetailList={this.props.applyDetailList}
                    applyDealList={this.props.applyDealList}
                    />

                <i id="anchor"></i>

                <button className="add_new" type="button" onClick={this.addNewApply}>新增申请</button>

                <ChoiceApplyType isShow={this.state.isShow} closeApplyType={this.closeApplyType}/>
            </div>
        );
    };
}