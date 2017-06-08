import React, {Component} from 'react';
import Address from './Address';
import style from '../asset/css/AddressList.less'

export default class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
           addList: this.props.list
        };

        this.deleteAddress = this.deleteAddress.bind(this)
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
        let listShows = this.state.addList.map((address, index)=> {
                return (
                    <Address key={address.id} address={address} index={index} deleteAddress={this.deleteAddress}/>
                );
            });
        
        return (
            <ul className={style.address_ul}>
                {listShows}
            </ul>
        );
    };
}