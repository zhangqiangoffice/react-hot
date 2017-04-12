import React from 'react'
import FilterLink from '../containers/FilterLink'

const Controller = () => (
    <ul className="controller">
        <FilterLink status="">
            全部
        </FilterLink>

        <FilterLink status="1">
            已报价
        </FilterLink>

        <FilterLink status="2">
            核保失败
        </FilterLink>

        <FilterLink status="4">
            待付款
        </FilterLink>

        <FilterLink status="7">
            已结算
        </FilterLink>
    </ul>
)

export default Controller