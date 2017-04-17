import React, {Component} from 'react';
import TitleBar from '../public/TitleBar';
import AddressForm from './AddressForm';
import TopTip from '../public/TopTip';

export default class App extends Component {
    render() {
        return (
            <div>
                <TitleBar title="编辑配送方式" />
                <TopTip tip="请认真填写" />
                <AddressForm params={this.props.params} />        
            </div>
        )
    };
}