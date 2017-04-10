import React, {Component} from 'react';
import CarActionCreators from '../../actions/CarActionCreators';
import AppActionCreators from '../../actions/AppActionCreators';
import APIUtils from '../APIUtils';

export default class Style extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    };

    handleClick() {
        CarActionCreators.updateStyleIndex(this.props.index);
        APIUtils.queryInsuranceDate();
    };

    render() {
        let style = this.props.styleObj;
        return (
            <li className="one_style" onClick={this.handleClick.bind(this)}>
                <div className="style_title">{style.carBrand + ' ' + style.familyName}</div>
                <div className="style_name">
                    <div>{style.comment}</div>
                    <ul className="style_detail">
                        <li>排量：{style.exhaustScale}</li>
                        <li>座位数：{style.passengers}</li>
                        <li>购置价：{style.purchaseValence}</li>
                    </ul>
                </div>
            </li>
        );
    };
}