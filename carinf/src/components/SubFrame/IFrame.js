import React, {Component} from 'react';
import AppStore from '../../stores/AppStore';

class SubFrame extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            <iframe className="sub_frame" src={`http://ecoop.idoutec.cn/wechatgateway/basic/auth?channel=H5_DBB_MSDL&state=car&userid=${AppStore.getWorkNum()}`} id="sub_frame"></iframe>
        );
    };
}

export default SubFrame