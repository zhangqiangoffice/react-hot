import React, {Component} from 'react';
import Result from './Result';
import InsuranceStore from '../../stores/InsuranceStore';

export default class ResultList extends Component {

    render() {
        let listShows = InsuranceStore.getOffers().map((result, index) => {
            if (result) {
                return (
                    <Result key={index} index={index} result={result} />
                )
            }
        });

        return (
            <ul className="result">
                {listShows}
            </ul>
        );
    };
}
