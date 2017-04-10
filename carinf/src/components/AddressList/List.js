import React, {Component} from 'react';

import Address from './Address';

import APIUtils from '../APIUtils';
import zAJAX from 'z-ajax'
import assign from 'object-assign';

export default class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
           addList: [],
        };

        this.deleteAddress = this.deleteAddress.bind(this)

    };

    componentDidMount() {      
        this.quoteAddress();
    };

    //获取邮寄地址列表
    quoteAddress () {
        this.props.changeIsLoading();
        let data = {
            workNum: APIUtils.getUrlParam('workNum'),
        };

        let cb = msg => {
            this.props.changeIsLoading();
            if (msg.result === 1) {
                this.setState({
                    addList : [ ...msg.list]
                })
            }else{
                alert(msg.message);
            }
        } 

        zAJAX(`${ctx}/carInf/queryAddress`, data, cb)
    };

    //删除一个地址
    deleteAddress(index) {
        let list = [ ...this.state.addList]
        list.splice(index, 1)
        this.setState({
            addList: list
        })
    }

    render() {
        const ulStyle = {
            marginTop: '5rem',
        };

        let listShows = null;
        if (this.state.addList.length) {
            listShows = this.state.addList.map((address, index)=> {
                return (
                    <Address key={address.id} address={address} index={index} changeIsLoading={this.props.changeIsLoading} deleteAddress={this.deleteAddress}/>
                );
            });
        }
        
        return (
            <ul style={ulStyle}>
                {listShows}
            </ul>
        );
    };
}