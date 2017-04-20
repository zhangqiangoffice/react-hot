import React, {Component} from 'react';
import CarActionCreators from '../../actions/CarActionCreators';
import {queryInsuranceDate} from '../APIUtils';

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
        let style = this.props.styleObj;
        return (
            <li className="one_style" onClick={this.handleClick}>
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