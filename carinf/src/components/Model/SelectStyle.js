import React, {Component} from 'react';
import Style from './Style';
import CarStore from '../../stores/CarStore';

export default class SelectStyle extends Component {

    render() {

        let listShows = CarStore.getStyleList().map((style, index) => {
            return (
                <Style styleObj={style} index={index} key={index} />
            )
        });
        
        return (
            <ul className="select_style">
                {listShows}
            </ul>
        );
    };
}