import React, {Component} from 'react';
import Switcher from './Switcher';
import appInfo from './json/appInfo.json';
import APIUtils from './APIUtils';
import CarStore from '../stores/CarStore';
import CarActionCreators from '../actions/CarActionCreators';
import AppActionCreators from '../actions/AppActionCreators';
import Loading from './Loading';
import AppStore from '../stores/AppStore';

export default class CarInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: AppStore.getIsLoading(),        //显示加载中遮罩层
            name: CarStore.getName(),
            idCard: CarStore.getIdCard(),
            registerDate: CarStore.getRegisterDate(),
            isTransferOwnership: CarStore.getIsTransferOwnership(),
            issueDate: CarStore.getIssueDate(),
            vehicleTypeName: CarStore.getVehicleTypeName(),
            useCharacterName: CarStore.getUseCharacterName(),
            vin: CarStore.getVin(),
            engineNo: CarStore.getEngineNo(),
            brandModel: CarStore.getBrandModel(),
            isNewCar: CarStore.getIsNewCar(),
        };

        this.selectVehicleType = this.selectVehicleType.bind(this);
        this.selectUseCharacter = this.selectUseCharacter.bind(this);
        this.onCarChange = this.onCarChange.bind(this);
        
    };

    onCarChange() {
        this.setState({
            isLoading: AppStore.getIsLoading(),        //显示加载中遮罩层
            name: CarStore.getName(),
            idCard: CarStore.getIdCard(),
            registerDate: CarStore.getRegisterDate(),
            isTransferOwnership: CarStore.getIsTransferOwnership(),
            issueDate: CarStore.getIssueDate(),
            vehicleTypeName: CarStore.getVehicleTypeName(),
            useCharacterName: CarStore.getUseCharacterName(),
            vin: CarStore.getVin(),
            engineNo: CarStore.getEngineNo(),
            brandModel: CarStore.getBrandModel(),
            isNewCar: CarStore.getIsNewCar(),
        });
    }

    componentDidMount() {      
        CarStore.addChangeListener(this.onCarChange);
    };

    componentWillUnmount() {
        CarStore.removeChangeListener(this.onCarChange);
    };

    // componentDidUpdate() {
    //     var currYear = (new Date()).getFullYear();  

    //     //初始化日期控件
    //     var opt1 = {
    //         preset: 'date', //日期，可选：date\datetime\time\tree_list\image_text\select
    //         theme: 'android-ics light', //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
    //         display: 'modal', //显示方式 ，可选：modal\inline\bubble\top\bottom
    //         mode: 'mixed', //日期选择模式，可选：scroller\clickpick\mixed
    //         lang:'zh',
    //         dateFormat: 'yyyy-mm-dd', // 日期格式
    //         setText: '确定', //确认按钮名称
    //         cancelText: '取消',//取消按钮名籍我
    //         dateOrder: 'yyyymmdd', //面板中日期排列格式
    //         dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
    //         showNow: false,  
    //         nowText: "今",  
    //         startYear:currYear - 15, //开始年份  
    //         maxDate: new Date(),
    //         onChange: function (valueText, inst) {
    //             CarActionCreators.changeRegisterDate(valueText);
    //         }
    //         //endYear:2099 //结束年份
    //     };

    //     var opt2 = {
    //         preset: 'date', //日期，可选：date\datetime\time\tree_list\image_text\select
    //         theme: 'android-ics light', //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
    //         display: 'modal', //显示方式 ，可选：modal\inline\bubble\top\bottom
    //         mode: 'mixed', //日期选择模式，可选：scroller\clickpick\mixed
    //         lang:'zh',
    //         dateFormat: 'yyyy-mm-dd', // 日期格式
    //         setText: '确定', //确认按钮名称
    //         cancelText: '取消',//取消按钮名籍我
    //         dateOrder: 'yyyymmdd', //面板中日期排列格式
    //         dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
    //         showNow: false,  
    //         nowText: "今",  
    //         startYear:currYear - 15, //开始年份  
    //         // endYear: 2099, //结束年份
    //         maxDate: new Date(),
    //         onChange: function (valueText, inst) {
    //             CarActionCreators.changeIssueDate(valueText);
    //         }
    //     };

    //     $("#date_picker1").mobiscroll(opt1);
        
    //     $("#date_picker2").mobiscroll(opt2);

    // }
    
    //点击选择车辆类型
    selectVehicleType() {
        let optionArr = [];
        appInfo.vehicleType.data.map((type, index) => {
            optionArr.push(type.Name);
        });
        AppActionCreators.showRadioSelector({
            options: optionArr,
            selectedOption: this.state.vehicleTypeName,
            liClickHandle: CarActionCreators.updateVehicleType
        });
    };

    //点击选择使用性质
    selectUseCharacter() {
        let optionArr = [];
        appInfo.useCharacter.data.map((type, index) => {
            optionArr.push(type.Name);
        });
        AppActionCreators.showRadioSelector({
            options: optionArr,
            selectedOption: this.state.useCharacterName,
            liClickHandle: CarActionCreators.updateUseCharacter
        });
    }

    render() {
        if (!this.props.isCurrent) {
            return null
        }
        let diffPart;
        if (this.state.isNewCar) {
            diffPart = 
                <ul className="info_ul">
                    <li>
                        <label>车主名</label>
                        <input type="text" placeholder="请输入" value={this.state.name} onChange={CarActionCreators.updateName}/>
                    </li>
                    <li>
                        <label>证件号</label>
                        <input type="text" placeholder="请输入" value={this.state.idCard} onChange={CarActionCreators.updateIdCard}/>
                    </li>
                </ul>
        } else {
            let transferDate = null;
            if (this.state.isTransferOwnership) {
                transferDate = <li>
                                <label>过户日期</label>
                                <input id="date_picker2" type="text" placeholder="请选择" defaultValue={this.state.issueDate} />
                            </li>
                
            }

            diffPart = 
                <ul className="info_ul">
                    
                    <li>
                        <label>是否过户</label>
                        <Switcher isOn={this.state.isTransferOwnership}  onClick={CarActionCreators.toggleOwnership}/>
                    </li>
                    {transferDate}
                </ul>
        }

        let firstPart = null;
        if (!CarStore.getIsHome()) {
            firstPart = 
                <ul className="info_ul">
                    <li onClick={this.selectVehicleType}>
                        <label>车辆类型</label>
                        <span>{this.state.vehicleTypeName}</span>
                    </li>
                    <li onClick={this.selectUseCharacter}>
                        <label>使用性质</label>
                        <span>{this.state.useCharacterName}</span>

                    </li>
                </ul>
        }


        return (
            <div className="car_info">
                <div className="tip">我们确保您的信息仅用于车险报价</div>
                
                {firstPart}

                <ul className="info_ul">
                    <li>
                        <label>车架号</label>
                        <input type="text" placeholder="请输入" value={this.state.vin} onChange={CarActionCreators.updateVin}/>
                    </li>
                    <li>
                        <label>发动机号</label>
                        <input type="text" placeholder="请输入" value={this.state.engineNo} onChange={CarActionCreators.updateEngineNo}/>
                    </li>
                    <li>
                        <label>品牌型号</label>
                        <input type="text" placeholder="请输入" value={this.state.brandModel} onChange={CarActionCreators.updateBrandModel}/>
                    </li>
                    <li>
                        <label>注册日期</label>
                        <input id="date_picker1" placeholder="请选择" defaultValue={this.state.registerDate} />
                    </li>
                </ul>

                {diffPart}

                <button type="button" className="next" onClick={APIUtils.carModel}>下一步</button>
            </div>
        );
    };
}
