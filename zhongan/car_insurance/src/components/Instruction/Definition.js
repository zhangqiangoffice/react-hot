import React, {Component} from 'react'
import ShowController from './ShowController'
import style from '../asset/css/index.less'
import { Icon } from 'antd-mobile';


export default class Out extends Component {
    constructor(props){
        super(props);
        this.state = {
          show: false,
        }

        this.toggleShow = this.toggleShow.bind(this)
    }

    toggleShow() {
      this.setState({
        show: !this.state.show
      })
    }

    render(){ 
      return (
        <div className={style.definition}>
          <p className={this.state.show ? style.all : ''}>        
            1、非营运车辆是指不以直接或间接方式收取运费、租金或其他收入的车辆；<br/>
            2、营运车辆是指以直接或间接方式收取运费、租金或其他收入的车辆；<br/>
            3、客车是指以载运人员为主要使用用途的车辆；<br/>
            4、货车是指以载运货物为主要使用用途的车辆（挂车，重型半挂牵引车属于货车）；<br/>
            5、特种车二和三(专用车): 特种车二：专用净水车、特种车一以外的罐式货车，以及用于清障、清扫、清洁、起重、装卸、升降、搅拌、挖掘、推土、冷藏、保温等的各种专用机动车； 特种车三：装有固定专用仪器设备从事专业工作的监测、消防、运钞、医疗、电视转播等的各种专用机动车；<br/>
            6、特种车一：油罐车、汽罐车、液罐车；<br/>
            7、特种车四及拖拉机 特种车四：集装箱拖头。 拖拉机：兼用型拖拉机和运输型拖拉机； 兼用性拖拉机：为保监会公布的《机动车交通事故责任强制保险费率方案中 农用型拖拉机的定义，是指以田间作业为主，通过铰接连接牵引挂车可进行运输作业的拖拉机。兼用型拖拉机包括各种收割机运输型拖拉机：指货箱与底盘一体，不通过牵引挂车可运输作业的拖拉机。<br/>
            8、车辆类型以车辆行驶证标明的车辆类型为准；<br/>
            9、车辆座位数以车辆行驶证标明的核定载人数为准；<br/>
            10、货车吨位数以车辆行驶证标明的核定载质量为准。
          </p>
          <ShowController show={this.state.show} onToggleShow={this.toggleShow} />
        </div>
      )
    }
}