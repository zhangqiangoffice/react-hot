import React, {Component} from 'react';
import CarActionCreators from '../../actions/CarActionCreators';
import {queryInsuranceDate} from '../APIUtils';
import style from '../asset/css/Model.less'


export default class Style extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    };

    handleClick() {
        CarActionCreators.updateStyleIndex(this.props.index);
        queryInsuranceDate();
    };

    render() {
        let styleObj = this.props.styleObj;
        return (
            <li className={style.one_style} onClick={this.handleClick}>
                <div className={style.style_title}>{styleObj.carBrand + ' ' + styleObj.familyName}</div>
                <div className={style.style_name}>
                    <div>{style.comment}</div>
                    <ul className={style.style_detail}>
                        <li>排量：{styleObj.exhaustScale}</li>
                        <li>座位数：{styleObj.passengers}</li>
                        <li>购置价：{styleObj.purchaseValence}</li>
                    </ul>
                </div>
            </li>
        );
    };
}