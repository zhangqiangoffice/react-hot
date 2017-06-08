import React, {Component} from 'react';
import LiSelector from './LiSelector';
import APIUtils from './APIUtils';
import AppActionCreators from '../actions/AppActionCreators';
import AppStore from '../stores/AppStore';
import DatePic from './public/DatePic';
import zAJAX from 'z-ajax'

export default class NewBusinessTravel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            memo: '',
            placeArr: [{name: '请选择省份'}, {name: '请选择城市'}, {name: '请选择县区'}],
            provinceDatas: false,
            cityDatas: {},
            countyDatas: {},
            isShow: false,
            options: [],
            selected: '',
            clickHandle: {},
            movePlace: '',
            dxqList: [],
            businessPlace: '',
            startDate: '',
            endDate: '',
            intervals: '',
            greaterThan3: false

        }

        this.changeMemo = this.changeMemo.bind(this);
        this.goLists = this.goLists.bind(this);
        this.clickProvince = this.clickProvince.bind(this);
        this.province = this.province.bind(this);
        this.city = this.city.bind(this);
        this.county = this.county.bind(this);
        this.showProvinceSelector = this.showProvinceSelector.bind(this);
        this.showCitySelector = this.showCitySelector.bind(this);
        this.showCountySelector = this.showCountySelector.bind(this);
        this.selectProvince = this.selectProvince.bind(this);
        this.selectCity = this.selectCity.bind(this);
        this.selectCounty = this.selectCounty.bind(this);
        this.clickCity = this.clickCity.bind(this);
        this.clickCounty = this.clickCounty.bind(this);
        this.changeMovePlace = this.changeMovePlace.bind(this);
        this.search = this.search.bind(this);
        this.choiceDxq = this.choiceDxq.bind(this);
        this.submit = this.submit.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.countDays = this.countDays.bind(this);
        this.checkData = this.checkData.bind(this);
        
    };

    //页面打开滑动到顶部
    componentWillReceiveProps(nextProps) {
        if (nextProps.isCurrent) {
            window.scrollTo(0, 0)
        }
    }

    //修改外出原因
    changeMemo(event) {
        let val = event.target.value;
        this.setState({
            memo: val
        });
    }

    //获取省列表
    province() {
        AppActionCreators.showLoading();

        // $.ajax({
        //     type: "post",
        //     url: ctx + "/webService/province",
        //     dataType: "json",
        //     success: function(msg) {
        //         AppActionCreators.hideLoading();
        //         this.setState({
        //             provinceDatas: msg
        //         });
        //         this.showProvinceSelector();
        //     }.bind(this)
        // });

        let cb = msg => {
            AppActionCreators.hideLoading();
            this.setState({
                provinceDatas: msg
            });
            this.showProvinceSelector();
        }

        zAJAX(`${ctx}/webService/province`, {}, cb)
    }

    //获取城市
    city() {
        AppActionCreators.showLoading();
        let no = this.state.placeArr[0].no;

        // $.ajax({
        //     type: "post",
        //     url: ctx + "/webService/region",
        //     data: {id: no},
        //     dataType: "json",
        //     success: function(msg) {
        //         AppActionCreators.hideLoading();
        //         let obj = this.state.cityDatas;
        //         obj[no] = msg
        //         this.setState({
        //             cityDatas: obj
        //         });
        //         this.showCitySelector();
        //     }.bind(this)
        // });

        let cb = msg => {
            AppActionCreators.hideLoading();
            let obj = this.state.cityDatas;
            obj[no] = msg
            this.setState({
                cityDatas: obj
            });
            this.showCitySelector();
        }

        zAJAX(`${ctx}/webService/region`, {id: no}, cb)
    }

    //获取区县
    county() {
        AppActionCreators.showLoading();
        let no = this.state.placeArr[1].no;

        // $.ajax({
        //     type: "post",
        //     url: ctx + "/webService/county",
        //     data: {id: no},
        //     dataType: "json",
        //     success: function(msg) {
        //         AppActionCreators.hideLoading();
        //         let obj = this.state.countyDatas;
        //         obj[no] = msg
        //         this.setState({
        //             countyDatas: obj
        //         });
        //         this.showCountySelector();
        //     }.bind(this)
        // });

        let cb = msg => {
            AppActionCreators.hideLoading();
            let obj = this.state.countyDatas;
            obj[no] = msg
            this.setState({
                countyDatas: obj
            });
            this.showCountySelector();
        }

        zAJAX(`${ctx}/webService/county`, {id: no}, cb)
    }

    //通过index选择省
    selectProvince(index) {
        let pro = this.state.provinceDatas[index];
        let obj = {
            name: pro.provinceName,
            no: pro.provinceNo
        }
        let arr = this.state.placeArr;
        arr[0] = obj;
        this.setState({
            isShow:false,
            placeArr: arr
        });
    }

    //通过index选择市
    selectCity(index) {
        let no = this.state.placeArr[0].no
        let city = this.state.cityDatas[no][index];
        let obj = {
            name: city.regionName,
            no: city.regionNo
        }
        let arr = this.state.placeArr;
        arr[1] = obj;
        this.setState({
            isShow: false,
            placeArr: arr
        });
    }

    //通过index选择区县
    selectCounty(index) {
        let no = this.state.placeArr[1].no
        let county = this.state.countyDatas[no][index];
        let obj = {
            name: county.countyName,
            no: county.countyNo
        }
        let arr = this.state.placeArr;
        arr[2] = obj;
        this.setState({
            isShow: false,
            placeArr: arr
        });
    }

    //显示省选择器
    showProvinceSelector() {
        let arr = [];
        for (let obj of this.state.provinceDatas) {
            arr.push(obj.provinceName);
        }
        this.setState({
            isShow:true,
            options: arr,
            selected: this.state.placeArr[0].name,
            clickHandle: this.selectProvince
        });
    }

    //显示城市选择器
    showCitySelector() {
        let arr = [];
        let no = this.state.placeArr[0].no;
        for (let obj of this.state.cityDatas[no]) {
            arr.push(obj.regionName);
        }
        this.setState({
            isShow:true,
            options: arr,
            selected: this.state.placeArr[1].name,
            clickHandle: this.selectCity
        });
    }

    //显示区县选择器
    showCountySelector() {
        let arr = [];
        let no = this.state.placeArr[1].no;
        for (let obj of this.state.countyDatas[no]) {
            arr.push(obj.countyName);
        }
        this.setState({
            isShow:true,
            options: arr,
            selected: this.state.placeArr[2].name,
            clickHandle: this.selectCounty
        });
    }

    //返回列表页面
    goLists() {
        AppActionCreators.showComponent('Lists');
    }

    //点击选择省
    clickProvince() {
        if(!this.state.provinceDatas) {
            this.province();
        } else {
            this.showProvinceSelector();
        }
    }

    //点击选择城市
    clickCity() {
        let provinceNo = this.state.placeArr[0].no;
        if (provinceNo) {
            if (!this.state.cityDatas[provinceNo]) {
                this.city();
            } else {
                this.showCitySelector();
            }
        } else {
            alert('请先选择省份');
        }
    }

    //点击选择区县
    clickCounty() {
        let no = this.state.placeArr[1].no;
        if (no) {
            if (!this.state.countyDatas[no]) {
                this.county();
            } else {
                this.showCountySelector();
            }
        } else {
            alert('请先选择城市');
        }
    }

    //督训区输入
    changeMovePlace(event) {
        let val = event.target.value;
        this.setState({
            movePlace: val,
            businessPlace: '',
        })
    }

    //点击搜索按钮
    search() {
        let move = this.state.movePlace.trim();
        if (move.length > 1) {
            AppActionCreators.showLoading();
            // $.ajax({
            //     type: "post",
            //     url: ctx + "/application_mobile/getdxq",
            //     data: {movePlace: this.state.movePlace},
            //     dataType: "json",
            //     success: function(msg) {
            //         AppActionCreators.hideLoading();
            //         if (msg.result === 1) {
            //             if (msg.list.length) {
            //                 this.setState({
            //                     dxqList: msg.list
            //                 })
            //             } else {
            //                 alert('未找到，请更改搜索条件！');
            //             }
            //         } else {
            //             alert(msg.message);
            //         }
            //     }.bind(this)
            // }); 

            let cb = msg => {
                AppActionCreators.hideLoading();
                if (msg.result === 1) {
                    if (msg.list.length) {
                        this.setState({
                            dxqList: msg.list
                        })
                    } else {
                        alert('未找到，请更改搜索条件！');
                    }
                } else {
                    alert(msg.message);
                }
            }

            zAJAX(`${ctx}/application_mobile/getdxq`, {movePlace: this.state.movePlace}, cb)
        } else {
            alert('至少输入两个汉字');
        }
    }

    //选择督训区
    choiceDxq(event) {
        let name = event.target.innerHTML;
        let id = event.target.dataset.id;
        this.setState({
            businessPlace: id,
            movePlace: name,
            dxqList: []
        });
    }

    //计算日期之间的天数
    countDays(sStr = this.state.startDate, eStr = this.state.endDate) {
        let s = new Date(sStr);
        let e = new Date(eStr);
        let d = (e - s) / (24 * 60 * 60 * 1000) + 1;
        this.setState({
            intervals: d > 0 ? d : '',
            greaterThan3: d >= 3
        });
        if (d <= 0) {
            alert ('结束时间必须大于开始时间！');
        }
    }

    //修改结束日期
    changeEndDate(val) {
        this.setState({
            endDate: val
        });
        this.countDays(undefined, val);
    }

    //修改开始日期
    changeStartDate(val) {
        this.setState({
            startDate: val
        });
        this.countDays(val, );
    }

    //检查数据是否满足提交要求
    checkData() {
        if (!this.state.memo) {
            alert('请填写 外出事由!');
            return false;
        }

        if (!this.state.movePlace) {
            alert('督训区名称 不得为空！');
            return false;
        }

        if (!this.state.intervals) {
            alert('外出时间 输入不正确');
            return false;
        }

        return true;
    }

    //提交公出申请
    submit() {
        if (this.checkData()) {
            let datas = {
                staffId: AppStore.getStaffid(),
                applyType: 4,
                memo: this.state.memo,
                provinceId: this.state.placeArr[0].no,
                regionId: this.state.placeArr[1].no,
                countyId: this.state.placeArr[2].no,
                movePlace: this.state.movePlace,
                businessPlace: this.state.businessPlace,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                intervals: this.state.intervals,
            }

            AppActionCreators.showLoading();
            // $.ajax({
            //     type: "post",
            //     url: ctx + "/application_mobile/add_application",
            //     data: {data: JSON.stringify(datas)},
            //     dataType: "json",
            //     success: function(msg) {
            //         AppActionCreators.hideLoading();
            //         if (msg.result === 1) {
            //             alert('提交成功！');
            //             this.goLists();
            //             this.setState({
            //                 memo: '',
            //                 movePlace: '',
            //                 businessPlace: '',
            //                 startDate: '',
            //                 endDate: '',
            //                 intervals: '',
            //                 greaterThan3: false,
            //             });
            //             AppActionCreators.reload();
            //             APIUtils.initList();
            //         } else {
            //             alert(msg.message);
            //         }
            //     }.bind(this)
            // });

            let cb = msg => {
                AppActionCreators.hideLoading();
                if (msg.result === 1) {
                    alert('提交成功！');
                    this.goLists();
                    this.setState({
                        memo: '',
                        movePlace: '',
                        businessPlace: '',
                        startDate: '',
                        endDate: '',
                        intervals: '',
                        greaterThan3: false,
                    });
                    AppActionCreators.reload();
                    APIUtils.initList();
                } else {
                    alert(msg.message);
                }
            }

            zAJAX(`${ctx}/application_mobile/add_application`, {data: JSON.stringify(datas)}, cb)
        }
    }


    render() {
        if (!this.props.isCurrent) {
            return null
        }

        let blankForm = this.props.blankForm.entity;
        let signList = blankForm.signList.map((sign, index) => {
            if (!this.state.greaterThan3 && index === 2) {
                return null
            }
            return(
                <li key={index}>
                    {sign.signDepartmentName}
                    <button type="button">待审核</button>
                </li>
            );
        });

        let dxqList = this.state.dxqList.map((dxq, index) => {
            return(
                <button type="button" key={index} data-id={dxq.id} onClick={this.choiceDxq}>{dxq.name}</button>
            );
        });

        return (
            <div className="new_business_travel">
                <div className="title_bar">
                    <button type="button" onClick={this.goLists}> </button>
                    <h1>签报申请</h1>
                    <span onClick={this.submit}>提交</span>
                </div>

                <table className="staff_info">
                    <tbody>
                        <tr>
                            <td className="item">姓名：</td>
                            <td>{blankForm.staffName}</td>
                            <td className="item">职位：</td>
                            <td>{blankForm.positionName}</td>
                        </tr>
                        <tr>
                            <td className="item">所在部门：</td>
                            <td>{blankForm.departName}</td>
                        </tr>
                    </tbody>
                </table>            

                <textarea className="reason" placeholder="外出事由" onChange={this.changeMemo} value={this.state.memo}></textarea>
                
                <div className="sub_title">外出地点</div>

                <ul className="place">
                    <li>
                        <div className={'selector ' + (this.state.placeArr[0].no ? 'checked' : '')} onClick={this.clickProvince}>{this.state.placeArr[0].name}</div>
                        <div className={'selector ' + (this.state.placeArr[1].no ? 'checked' : '')} onClick={this.clickCity}>{this.state.placeArr[1].name}</div>
                        <div className={'selector ' + (this.state.placeArr[2].no ? 'checked' : '')} onClick={this.clickCounty}>{this.state.placeArr[2].name}</div>
                    </li>
                    <li>
                        <input type="text" placeholder="请输入督训区名称" value={this.state.movePlace} onChange={this.changeMovePlace}/>
                        <button type="button" onClick={this.search}>搜索</button>
                    </li>
                </ul>

                <div className="dxq">
                    {dxqList}
                </div>

                <div className="sub_title">外出时间</div>

                <ul className="time">
                    <DatePic title="开始时间" 
                        theDate={this.state.startDate} 
                        minDate="2016-01-01" 
                        onChangeDate={this.changeStartDate}
                    />
                    <DatePic title="结束时间" 
                        theDate={this.state.endDate} 
                        minDate="2016-01-01" 
                        onChangeDate={this.changeEndDate}
                    />

                    <li>
                        <label>时间总计（天）</label>
                        <input type="text" value={this.state.intervals} readOnly="readonly" />
                    </li>
                </ul>

                <ul className="flow">
                    {signList}
                </ul>

                <LiSelector 
                    isShow={this.state.isShow} 
                    options={this.state.options} 
                    selected={this.state.selected}
                    clickHandle={this.state.clickHandle}
                    />
            </div>
        );
    };
}