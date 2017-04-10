import React, {Component} from 'react';
import Style from './Style';
import CarStore from '../stores/CarStore';
import Loading from './Loading';

export default class SelectStyle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            styleList: CarStore.getStyleList()
        };

        this.onCarChange = this.onCarChange.bind(this);
    };

    onCarChange() {
        this.setState({
            styleList: CarStore.getStyleList()
        });
    }

    componentDidMount() {      
        CarStore.addChangeListener(this.onCarChange);
    };

    componentWillUnmount() {
        CarStore.removeChangeListener(this.onCarChange);
    };

    render() {

        if (!this.props.isCurrent) {
            return null;
        }

        let listShows = this.state.styleList.map((style, index) => {
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