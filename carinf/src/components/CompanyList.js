import React, {Component} from 'react';
import Company from './Company';
import appInfo from './json/appInfo.json';

export default class CompanyList extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        if (!this.props.isCurrent) {
            return null
        };

        let listShows = appInfo.componies.map((company, index) => {
            if (index === 3) {
                return null
            } else {
                return (
                    <Company key={index} company={company}/>
                )
            }
        });

        return (
            <ul className="company_list">
                {listShows}
            </ul>
        );
    };
}
