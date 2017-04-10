import React, {Component} from 'react';
import Result from './Result';
import InsuranceStore from '../stores/InsuranceStore';
import Loading from './Loading';
import AppStore from '../stores/AppStore';

export default class ResultList extends Component {
    constructor(props) {
        super(props);

        this.state={
            offers: InsuranceStore.getOffers(),
            isLoading: AppStore.getIsLoading(),        //显示加载中遮罩层
        }
        
        this.onInsuranceChange = this.onInsuranceChange.bind(this);
    };

    onInsuranceChange() {
        this.setState({
            offers: InsuranceStore.getOffers(),
            isLoading: AppStore.getIsLoading(),        //显示加载中遮罩层
        });
    }

    componentDidMount() {      
        InsuranceStore.addChangeListener(this.onInsuranceChange);
    };

    componentWillUnmount() {
        InsuranceStore.removeChangeListener(this.onInsuranceChange);
    };

    render() {
        if (!this.props.isCurrent) {
            return null;
        }

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
