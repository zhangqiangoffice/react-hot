import React, {Component} from 'react';
import Company from './Company';
import { componies } from '../asset/json/appInfo.json';

export default class CompanyList extends Component {

    render() {

        let listShows = componies.map((company, index) => {
            //暂不考虑 人保车险
            if (index === 3) {
                return null
            } else {
                return <Company key={index} company={company}/>
            }
        });

        return (
            <ul className="company_list">
                {listShows}
            </ul>
        );
    };
}
