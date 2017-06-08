import React, {Component} from 'react';
import Items from './Items';
import style from '../asset/css/Confirm.less'


export default class out extends Component {
    constructor(props){
        super(props);

        this.state = {
            showItems: false,
        };

        this.toggleShowItems = this.toggleShowItems.bind(this);
    };

    toggleShowItems() {
        this.setState({
            showItems: !this.state.showItems
        })
    }

    render() {

        return (
            <div className={style.notice}>
                <div className={style.notice_title}>重要提示</div>
                <div className={style.notice_item}>
                    <span className={this.props.hasNoticed ? style.selected : style.agree} onClick={this.props.toggleHasNoticed}> </span>
                    <span>保险人已明确说明</span>
                    <span className={style.a} onClick={this.toggleShowItems}>保险条款内容</span>
                    <span>的含义及法律后果全部内容</span>
                </div>
                <Items isShow={this.state.showItems} onClose={this.toggleShowItems}/>
            </div>
        );
    };
}
