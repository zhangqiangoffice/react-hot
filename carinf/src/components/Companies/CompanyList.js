import React, {Component} from 'react';
import Company from './Company';
import { componies } from '../asset/json/appInfo.json';
import style from '../asset/css/Companies.less'

export default class CompanyList extends Component {

    render() {

        let listShows = componies.map((company, index) => {
            //暂不考虑 人保车险、太平洋
            if (index === 3 || index === 0) {
                return null
            } else {
                return <Company key={index} company={company}/>
            }
        });

        return (
            <ul className={style.company_list}>
                {listShows}
            </ul>
        );
    };
}
