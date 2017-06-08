import React, {Component} from 'react';
import style from '../asset/css/index.less'

export default class out extends Component {

    render() {
        if (!this.props.isShow) {
            return null
        }

        return (
            <div className="cover">
                <div className={style.paper}>
                    <div className={style.title}>
                        {this.props.title}
                        <div className={style.close} onClick={this.props.onClose}>&times;</div>
                    </div>
                    <div className={style.body}>
                        <header>总则</header>
                        <section>
                            <p><label>第一条</label>本保险条款分为主险、附加险。</p>
                            <p>主险包括机动车损失保险、机动车第三者责任保险、机动车车上人员责任保险、机动车全车盗抢保险共四个独立的险种，投保人可以选择投保全部险种，也可以选择投保其中部分险种。保险人依照本保险合同的约定，按照承保险种分别承担保险责任。</p>
                            <p>附加险不能独立投保。附加险条款与主险条款相抵触之处，以附加险条款为准，附加险条款未尽之处，以主险条款为准。</p>
                        </section>
                        <section>
                            <p><label>第二条</label>本保险合同中的被保险机动车是指在中华人民共和国境内（不含港、澳、台地区）行驶，以动力装置驱动或者牵引，上道路行驶的供人员乘用或者用于运送物品以及进行专项作业的轮式车辆（含挂车）、履带式车辆和其他运载工具，但不包括摩托车、拖拉机、特种车。</p>
                        </section>
                        <section>
                            <p><label>第三条</label>本保险合同中的第三者是指因被保险机动车发生意外事故遭受人身伤亡或者财产损失的人，但不包括被保险机动车本车车上人员、被保险人。</p>
                        </section>
                        <section>
                            <p><label>第四条</label>本保险合同中的各方权利和义务，由保险人、投保人遵循公平原则协商确定。保险人、投保人自愿订立本保险合同。</p>
                            <p>除本保险合同另有约定外，投保人应在保险合同成立时一次交清保险费。保险费未交清前，本保险合同不生效。</p>
                        </section>
                        <section>
                        <p><label>第五条</label>本保险合同中的各方权利和义务，由保险人、投保人遵循公平原则协商确定。保险人、投保人自愿订立本保险合同。
                        除本保险合同另有约定外，投保人应在保险合同成立时一次交清保险费。保险费未交清前，本保险合同不生效。</p>
                        </section>

                        <header>第一章 机动车损失保险</header>
                        <header>保险责任</header>
                        <section>
                        <p><label>第六条</label>保险期间内，被保险人或其允许的驾驶人在使用被保险机动车过程中，因下列原因造成被保险机动车的直接损失，且不属于免除保险人责任的范围，保险人依照本保险合同的约定负责赔偿：</p>
                        <p>（一） 碰撞、倾覆、坠落；</p>
                        <p>（二） 火灾、爆炸；</p>
                        <p>（三） 外界物体坠落、倒塌；</p>
                        <p>（四） 雷击、暴风、暴雨、洪水、龙卷风、冰雹、台风、热带风暴；</p>
                        <p>（五） 地陷、崖崩、滑坡、泥石流、雪崩、冰陷、暴雪、冰凌、沙尘暴；</p>
                        <p>（六） 受到被保险机动车所载货物、车上人员意外撞击；</p>
                        <p>（七） 载运被保险机动车的渡船遭受自然灾害（只限于驾驶人随船的情形）。</p>
                        </section>
                        <section>
                        <p><label>第七条</label>发生保险事故时，被保险人或其允许的驾驶人为防止或者减少被保险机动车的损失所支付的必要的、合理的施救费用，由保险人承担；施救费用数额在被保险机动车损失赔偿金额以外另行计算，最高不超过保险金额的数额。</p>
                        </section>
                        <header>责任免除</header>
                        <section>
                        <p><label>第八条</label>在上述保险责任范围内，下列情况下，不论任何原因造成被保险机动车的任何损失和费用，保险人均不负责赔偿：</p>
                        <p>（一）事故发生后，被保险人或其允许的驾驶人故意破坏、伪造现场、毁灭证据；</p>
                        <p>（二）驾驶人有下列情形之一者：</p>
                        <p>1、事故发生后，在未依法采取措施的情况下驾驶被保险机动车或者遗弃被保险机动车离开事故现场；</p>
                        <p>2、饮酒、吸食或注射毒品、服用国家管制的精神药品或者麻醉药品；</p>
                        <p>3、无驾驶证，驾驶证被依法扣留、暂扣、吊销、注销期间；</p>
                        <p>4、驾驶与驾驶证载明的准驾车型不相符合的机动车；</p>
                        <p>5、实习期内驾驶公共汽车、营运客车或者执行任务的警车、载有危险物品的机动车或牵引挂车的机动车；</p>
                        <p>6、驾驶出租机动车或营业性机动车无交通运输管理部门核发的许可证书或其他必备证书；</p>
                        <p>7、学习驾驶时无合法教练员随车指导；</p>
                        <p>8、非被保险人允许的驾驶人；</p>
                        <p>（三）被保险机动车有下列情形之一者：</p>
                        <p>１、发生保险事故时被保险机动车行驶证、号牌被注销的，或未按规定检验或检验不合格；</p>
                        <p>2、被扣押、收缴、没收、政府征用期间；</p>
                        <p>3、在竞赛、测试期间，在营业性场所维修、保养、改装期间；</p>
                        <p>4、被保险人或其允许的驾驶人故意或重大过失，导致被保险机动车被利用从事犯罪行为。</p>
                        </section>
                        <section>
                        <p><label>第九条</label>下列原因导致的被保险机动车的损失和费用，保险人不负责赔偿：</p>
                        <p>（一）地震及其次生灾害；</p>
                        <p>（二）战争、军事冲突、恐怖活动、暴乱、污染（含放射性污染）、核反应、核辐射；</p>
                        <p>（三）人工直接供油、高温烘烤、自燃、不明原因火灾；</p>
                        <p>（四）违反安全装载规定；</p>
                        <p>（五）被保险机动车被转让、改装、加装或改变使用性质等，被保险人、受让人未及时通知保险人，且因转让、改装、加装或改变使用性质等导致被保险机动车危险程度显著增加；</p>
                        <p>（六）被保险人或其允许的驾驶人的故意行为。</p>
                        </section>
                        <section>
                        <p><label>第十条</label>下列损失和费用，保险人不负责赔偿：</p>
                        <p>（一）因市场价格变动造成的贬值、修理后因价值降低引起的减值损失；</p>
                        <p>（二）自然磨损、朽蚀、腐蚀、故障、本身质量缺陷；</p>
                        <p>（三）遭受保险责任范围内的损失后，未经必要修理并检验合格继续使用，致使损失扩大的部分；</p>
                        <p>（四）投保人、被保险人或其允许的驾驶人知道保险事故发生后，故意或者因重大过失未及时通知，致使保险事故的性质、原因、损失程度等难以确定的，保险人对无法确定的部分，不承担赔偿责任，但保险人通过其他途径已经及时知道或者应当及时知道保险事故发生的除外；</p>
                        <p>（五）因被保险人违反本条款第十六条约定，导致无法确定的损失；</p>
                        <p>（六）被保险机动车全车被盗窃、被抢劫、被抢夺、下落不明，以及在此期间受到的损坏，或被盗窃、被抢劫、被抢夺未遂受到的损坏，或车上零部件、附属设备丢失；</p>
                        <p>（七）车轮单独损坏，玻璃单独破碎，无明显碰撞痕迹的车身划痕，以及新增设备的损失；</p>
                        <p>（八）发动机进水后导致的发动机损坏。</p>
                        </section>
                        <header>免赔率与免赔额</header>
                        <section>
                        <p><label>第十一条</label>保险人在依据本保险合同约定计算赔款的基础上，按照下列方式免赔：</p>
                        <p>（一）被保险机动车一方负次要事故责任的，实行5%的事故责任免赔率；负同等事故责任的，实行10%的事故责任免赔率；负主要事故责任的，实行15%的事故责任免赔率；负全部事故责任或单方肇事事故的，实行20%的事故责任免赔率；</p>
                        <p>（二）被保险机动车的损失应当由第三方负责赔偿，无法找到第三方的，实行30%的绝对免赔率；</p>
                        <p>（三）违反安全装载规定、但不是事故发生的直接原因的，增加10%的绝对免赔率；</p>
                        <p>（四）对于投保人与保险人在投保时协商确定绝对免赔额的，本保险在实行免赔率的基础上增加每次事故绝对免赔额。</p>
                        </section>
                        <header>保险金额</header>
                        <section>
                        <p><label>第十二条</label>保险金额按投保时被保险机动车的实际价值确定。
                        投保时被保险机动车的实际价值由投保人与保险人根据投保时的新车购置价减去折旧金额后的价格协商确定或其他市场公允价值协商确定。
                        折旧金额可根据本保险合同列明的参考折旧系数表确定。
                        </p>
                        </section>
                        <header>赔偿处理</header>
                        <section>
                        <p><label>第十三条</label>发生保险事故时，被保险人或其允许的驾驶人应当及时采取合理的、必要的施救和保护措施，防止或者减少损失，并在保险事故发生后48小时内通知保险人。被保险人或其允许的驾驶人根据有关法律法规规定选择自行协商方式处理交通事故的，应当立即通知保险人。</p>
                        </section>
                        <section>
                        <p><label>第十四条</label>被保险人或其允许的驾驶人根据有关法律法规规定选择自行协商方式处理交通事故的，应当协助保险人勘验事故各方车辆、核实事故责任，并依照《道路交通事故处理程序规定》签订记录交通事故情况的协议书。</p>
                        </section>
                        <section>
                        <p><label>第十五条</label>被保险人索赔时，应当向保险人提供与确认保险事故的性质、原因、损失程度等有关的证明和资料。</p>
                        <p>被保险人应当提供保险单、损失清单、有关费用单据、被保险机动车行驶证和发生事故时驾驶人的驾驶证。</p>
                        <p>属于道路交通事故的，被保险人应当提供公安机关交通管理部门或法院等机构出具的事故证明、有关的法律文书（判决书、调解书、裁定书、裁决书等）及其他证明。被保险人或其允许的驾驶人根据有关法律法规规定选择自行协商方式处理交通事故的，被保险人应当提供依照《道路交通事故处理程序规定》签订记录交通事故情况的协议书。</p>
                        </section>
                        <section>
                        <p><label>第十六条</label>因保险事故损坏的被保险机动车，应当尽量修复。修理前被保险人应当会同保险人检验，协商确定修理项目、方式和费用。对未协商确定的，保险人可以重新核定。</p>
                        </section>
                        <section>
                        <p><label>第十七条</label>被保险机动车遭受损失后的残余部分由保险人、被保险人协商处理。如折归被保险人的，由双方协商确定其价值并在赔款中扣除。</p>
                        </section>
                        <section>
                        <p><label>第十八条</label>因第三方对被保险机动车的损害而造成保险事故，被保险人向第三方索赔的，保险人应积极协助；被保险人也可以直接向本保险人索赔，保险人在保险金额内先行赔付被保险人，并在赔偿金额内代位行使被保险人对第三方请求赔偿的权利。</p>
                        <p>被保险人已经从第三方取得损害赔偿的，保险人进行赔偿时，相应扣减被保险人从第三方已取得的赔偿金额。</p>
                        <p>保险人未赔偿之前，被保险人放弃对第三方请求赔偿的权利的，保险人不承担赔偿责任。</p>
                        <p>被保险人故意或者因重大过失致使保险人不能行使代位请求赔偿的权利的，保险人可以扣减或者要求返还相应的赔款。</p>
                        <p>保险人向被保险人先行赔付的，保险人向第三方行使代位请求赔偿的权利时，被保险人应当向保险人提供必要的文件和所知道的有关情况。</p>
                        </section>
                        <section>
                        <p><label>第十九条</label>机动车损失赔款按以下方法计算：</p>
                        <p>（一）全部损失</p>
                        <p>赔款＝（保险金额－被保险人已从第三方获得的赔偿金额 ）×（1－事故责任免赔率）×（1－绝对免赔率之和）－绝对免赔额</p>
                        <p>（二）部分损失</p>
                        <p>被保险机动车发生部分损失，保险人按实际修复费用在保险金额内计算赔偿：
                        赔款＝（实际修复费用－被保险人已从第三方获得的赔偿金额）×（1－事故责任免赔率）×（1－绝对免赔率之和）－绝对免赔额
                        </p>
                        <p>（三）施救费</p>
                        <p>施救的财产中，含有本保险合同未保险的财产，应按本保险合同保险财产的实际价值占总施救财产的实际价值比例分摊施救费用。</p>
                        </section>
                        <section>
                        <p><label>第二十条</label>保险人受理报案、现场查勘、核定损失、参与诉讼、进行抗辩、要求被保险人提供证明和资料、向被保险人提供专业建议等行为，均不构成保险人对赔偿责任的承诺。</p>
                        </section>
                        <section>
                        <p><label>第二十一条</label>被保险机动车发生本保险事故，导致全部损失，或一次赔款金额与免赔金额之和（不含施救费）达到保险金额，保险人按本保险合同约定支付赔款后，本保险责任终止，保险人不退还机动车损失保险及其附加险的保险费。</p>
                        </section>
                        <header>第二章 机动车第三者责任保险</header>
                        <header>保险责任</header>
                        <section>
                        <p><label>第二十二条</label>保险期间内，被保险人或其允许的驾驶人在使用被保险机动车过程中发生意外事故，致使第三者遭受人身伤亡或财产直接损毁，依法应当对第三者承担的损害赔偿责任，且不属于免除保险人责任的范围，保险人依照本保险合同的约定，对于超过机动车交通事故责任强制保险各分项赔偿限额的部分负责赔偿。</p>
                        </section>
                        <section>
                        <p><label>第二十三条</label>保险人依据被保险机动车一方在事故中所负的事故责任比例，承担相应的赔偿责任。</p>
                        <p>被保险人或被保险机动车一方根据有关法律法规规定选择自行协商或由公安机关交通管理部门处理事故未确定事故责任比例的，按照下列规定确定事故责任比例</p>
                        <p>被保险机动车一方负主要事故责任的，事故责任比例为70%；</p>
                        <p>被保险机动车一方负同等事故责任的，事故责任比例为50%；</p>
                        <p>被保险机动车一方负次要事故责任的，事故责任比例为30%。</p>
                        <p>涉及司法或仲裁程序的，以法院或仲裁机构最终生效的法律文书为准。</p>
                        </section>
                        <header>责任免除</header>
                        <section>
                        <p><label>第二十四条</label>在上述保险责任范围内，下列情况下，不论任何原因造成的人身伤亡、财产损失和费用，保险人均不负责赔偿：</p>
                        <p>（一）事故发生后，被保险人或其允许的驾驶人故意破坏、伪造现场、毁灭证据；</p>
                        <p>（二）驾驶人有下列情形之一者：</p>
                        <p>1、事故发生后，在未依法采取措施的情况下驾驶被保险机动车或者遗弃被保险机动车离开事故现场；</p>
                        <p>2、饮酒、吸食或注射毒品、服用国家管制的精神药品或者麻醉药品；</p>
                        <p>3、无驾驶证，驾驶证被依法扣留、暂扣、吊销、注销期间；</p>
                        <p>4、驾驶与驾驶证载明的准驾车型不相符合的机动车；</p>
                        <p>5、实习期内驾驶公共汽车、营运客车或者执行任务的警车、载有危险物品的机动车或牵引挂车的机动车；</p>
                        <p>6、驾驶出租机动车或营业性机动车无交通运输管理部门核发的许可证书或其他必备证书；</p>
                        <p>7、学习驾驶时无合法教练员随车指导；</p>
                        <p>8、非被保险人允许的驾驶人；</p>
                        </section>
                        <section>
                        <p>（三）被保险机动车有下列情形之一者：</p>
                        <p>１、发生保险事故时被保险机动车行驶证、号牌被注销的，或未按规定检验或检验不合格；</p>
                        <p>2、被扣押、收缴、没收、政府征用期间；</p>
                        <p>3、在竞赛、测试期间，在营业性场所维修、保养、改装期间；</p>
                        <p>4、全车被盗窃、被抢劫、被抢夺、下落不明期间。</p>
                        </section>
                        <section>
                        <p><label>第二十五条</label>下列原因导致的人身伤亡、财产损失和费用，保险人不负责赔偿：</p>
                        <p>（一）地震及其次生灾害、战争、军事冲突、恐怖活动、暴乱、污染（含放射性污染）、核反应、核辐射；</p>
                        <p>（二）第三者、被保险人或其允许的驾驶人的故意行为、犯罪行为，第三者与被保险人或其他致害人恶意串通的行为；</p>
                        <p>（三）被保险机动车被转让、改装、加装或改变使用性质等，被保险人、受让人未及时通知保险人，且因转让、改装、加装或改变使用性质等导致被保险机动车危险程度显著增加。</p>

                        </section>
                        <section>
                        <p><label>第二十六条</label>下列人身伤亡、财产损失和费用，保险人不负责赔偿：</p>
                        <p>（一）被保险机动车发生意外事故，致使任何单位或个人停业、停驶、停电、停水、停气、停产、通讯或网络中断、电压变化、数据丢失造成的损失以及其他各种间接损失；</p>
                        <p>（二）第三者财产因市场价格变动造成的贬值，修理后因价值降低引起的减值损失；</p>
                        <p>（三）被保险人及其家庭成员、被保险人允许的驾驶人及其家庭成员所有、承租、使用、管理、运输或代管的财产的损失，以及本车上财产的损失；</p>
                        <p>（四）被保险人、被保险人允许的驾驶人、本车车上人员的人身伤亡；</p>
                        <p>（五）停车费、保管费、扣车费、罚款、罚金或惩罚性赔款；</p>
                        <p>（六）超出《道路交通事故受伤人员临床诊疗指南》和国家基本医疗保险同类医疗费用标准的费用部分；</p>
                        <p>（七）律师费，未经保险人事先书面同意的诉讼费、仲裁费；</p>
                        <p>（八）投保人、被保险人或其允许的驾驶人知道保险事故发生后，故意或者因重大过失未及时通知，致使保险事故的性质、原因、损失程度等难以确定的，保险人对无法确定的部分，不承担赔偿责任，但保险人通过其他途径已经及时知道或者应当及时知道保险事故发生的除外；</p>
                        <p>（九）因被保险人违反本条款第三十四条约定，导致无法确定的损失；</p>
                        <p>（十）精神损害抚慰金；</p>
                        <p>（十一）应当由机动车交通事故责任强制保险赔偿的损失和费用；
                        保险事故发生时，被保险机动车未投保机动车交通事故责任强制保险或机动车交通事故责任强制保险合同已经失效的，对于机动车交通事故责任强制保险责任限额以内的损失和费用，保险人不负责赔偿。
                        </p>
                        </section>
                        <header>免赔率</header>
                        <section>
                        <p><label>第二十七条</label>保险人在依据本保险合同约定计算赔款的基础上，在保险单载明的责任限额内，按照下列方式免赔：</p>
                        <p>（一）被保险机动车一方负次要事故责任的，实行5%的事故责任免赔率；负同等事故责任的，实行10%的事故责任免赔率；负主要事故责任的，实行15%的事故责任免赔率；负全部事故责任的，实行20%的事故</p>
                        </section>
                        <header>责任免赔率；</header>
                        <section>
                        <p>（二） 违反安全装载规定的，实行10%的绝对免赔率。</p>
                        </section>
                        <header>责任限额</header>
                        <section>
                        <p><label>第二十八条</label>每次事故的责任限额，由投保人和保险人在签订本保险合同时协商确定。</p>
                        </section>
                        <section>
                        <p><label>第二十九条</label>主车和挂车连接使用时视为一体，发生保险事故时，由主车保险人和挂车保险人按照保险单上载明的机动车第三者责任保险责任限额的比例，在各自的责任限额内承担赔偿责任，但赔偿金额总和以主车的责任限额为限。</p>
                        </section>
                        <header>赔偿处理</header>
                        <section>
                        <p><label>第三十条</label>发生保险事故时，被保险人或其允许的驾驶人应当及时采取合理的、必要的施救和保护措施，防止或者减少损失，并在保险事故发生后48小时内通知保险人。被保险人或其允许的驾驶人根据有关法律法规规定选择自行协商方式处理交通事故的，应当立即通知保险人。</p>
                        </section>
                        <section>
                        <p><label>第三十一条</label>被保险人或其允许的驾驶人根据有关法律法规规定选择自行协商方式处理交通事故的，应当协助保险人勘验事故各方车辆、核实事故责任，并依照《道路交通事故处理程序规定》签订记录交通事故情况的协议书。</p>
                        </section>
                        <section>
                        <p><label>第三十二条</label>被保险人索赔时，应当向保险人提供与确认保险事故的性质、原因、损失程度等有关的证明和资料。</p>
                        <p>被保险人应当提供保险单、损失清单、有关费用单据、被保险机动车行驶证和发生事故时驾驶人的驾驶证。</p>
                        <p>属于道路交通事故的，被保险人应当提供公安机关交通管理部门或法院等机构出具的事故证明、有关的法律文书（判决书、调解书、裁定书、裁决书等）及其他证明。被保险人或其允许的驾驶人根据有关法律法规规定选择自行协商方式处理交通事故的，被保险人应当提供依照《道路交通事故处理程序规定》签订记录交通事故情况的协议书。</p>
                        </section>
                        <section>
                        <p><label>第三十三条</label>保险人对被保险人给第三者造成的损害，可以直接向该第三者赔偿。</p>
                        <p>被保险人给第三者造成损害，被保险人对第三者应负的赔偿责任确定的，根据被保险人的请求，保险人应当直接向该第三者赔偿。被保险人怠于请求的，第三者有权就其应获赔偿部分直接向保险人请求赔偿。</p>
                        <p>被保险人给第三者造成损害，被保险人未向该第三者赔偿的，保险人不得向被保险人赔偿。</p>
                        </section>
                        <section>
                        <p><label>第三十四条</label>因保险事故损坏的第三者财产，应当尽量修复。修理前被保险人应当会同保险人检验，协商确定修理项目、方式和费用。对未协商确定的，保险人可以重新核定。</p>
                        </section>
                        <section>
                        <p><label>第三十五条</label>赔款计算</p>
                        <p>1、当（依合同约定核定的第三者损失金额－机动车交通事故责任强制保险的分项赔偿限额）×事故责任比例 等于或高于每次事故赔偿限额时：赔款=每次事故赔偿限额×（1－事故责任免赔率）×（1－绝对免赔率之和）</p>
                        <p>2、当（依合同约定核定的第三者损失金额－机动车交通事故责任强制保险的分项赔偿限额）×事故责任比例低于每次事故赔偿限额时：</p>
                        <p>赔款＝（依合同约定核定的第三者损失金额－机动车交通事故责任强制保险的分项赔偿限额）×事故责任比例×（1－事故责任免赔率）×（1－绝对免赔率之和）</p>
                        </section>
                        <section>
                        <p><label>第三十六条</label>保险人按照《道路交通事故受伤人员临床诊疗指南》和国家基本医疗保险的同类医疗费用标准核定医疗费用的赔偿金额。</p>
                        <p>未经保险人书面同意，被保险人自行承诺或支付的赔偿金额，保险人有权重新核定。不属于保险人赔偿范围或超出保险人应赔偿金额的，保险人不承担赔偿责任。</p>
                        </section>
                        <section>
                        <p><label>第三十七条</label>保险人受理报案、现场查勘、核定损失、参与诉讼、进行抗辩、要求被保险人提供证明和资料、向被保险人提供专业建议等行为，均不构成保险人对赔偿责任的承诺。</p>
                        </section>
                        <header>第三章 机动车车上人员责任保险</header>
                        <header>保险责任</header>
                        <section>
                        <p><label>第三十八条</label>保险期间内，被保险人或其允许的驾驶人在使用被保险机动车过程中发生意外事故，致使车上人员遭受人身伤亡，且不属于免除保险人责任的范围，依法应当对车上人员承担的损害赔偿责任，保险人依照本保险合同的约定负责赔偿。</p>
                        </section>
                        <section>
                        <p><label>第三十九条</label>保险人依据被保险机动车一方在事故中所负的事故责任比例，承担相应的赔偿责任。</p>
                        <p>被保险人或被保险机动车一方根据有关法律法规规定选择自行协商或由公安机关交通管理部门处理事故未确定事故责任比例的，按照下列规定确定事故责任比例：</p>
                        <p>被保险机动车一方负主要事故责任的，事故责任比例为70%；</p>
                        <p>被保险机动车一方负同等事故责任的，事故责任比例为50%；</p>
                        <p>被保险机动车一方负次要事故责任的，事故责任比例为30%。</p>
                        <p>涉及司法或仲裁程序的，以法院或仲裁机构最终生效的法律文书为准。</p>
                        </section>
                        <header>责任免除</header>
                        <section>
                        <p><label>第四十条</label>在上述保险责任范围内，下列情况下，不论任何原因造成的人身伤亡，保险人均不负责赔偿：</p>
                        <p>（一）事故发生后，被保险人或其允许的驾驶人故意破坏、伪造现场、毁灭证据；</p>
                        <p>（二）驾驶人有下列情形之一者：</p>
                        <p>1、事故发生后，在未依法采取措施的情况下驾驶被保险机动车或者遗弃被保险机动车离开事故现场；</p>
                        <p>2、饮酒、吸食或注射毒品、服用国家管制的精神药品或者麻醉药品；</p>
                        <p>3、无驾驶证，驾驶证被依法扣留、暂扣、吊销、注销期间；</p>
                        <p>4、驾驶与驾驶证载明的准驾车型不相符合的机动车；</p>
                        <p>5、实习期内驾驶公共汽车、营运客车或者执行任务的警车、载有危险物品的机动车或牵引挂车的机动车；</p>
                        <p>6、驾驶出租机动车或营业性机动车无交通运输管理部门核发的许可证书或其他必备证书；</p>
                        <p>7、学习驾驶时无合法教练员随车指导；</p>
                        <p>8、非被保险人允许的驾驶人；</p>
                        <p>（三）被保险机动车有下列情形之一者：</p>
                        <p>１、发生保险事故时被保险机动车行驶证、号牌被注销的，或未按规定检验或检验不合格；</p>
                        <p>2、被扣押、收缴、没收、政府征用期间；</p>
                        <p>3、在竞赛、测试期间，在营业性场所维修、保养、改装期间；</p>
                        <p>4、全车被盗窃、被抢劫、被抢夺、下落不明期间。</p>
                        </section>
                        <section>
                        <p><label>第四十一条</label>下列原因导致的人身伤亡，保险人不负责赔偿：</p>
                        <p>（一）地震及其次生灾害、战争、军事冲突、恐怖活动、暴乱、污染（含放射性污染）、核反应、核辐射；</p>
                        <p>（二）被保险机动车被转让、改装、加装或改变使用性质等，被保险人、受让人未及时通知保险人，且因转让、改装、加装或改变使用性质等导致被保险机动车危险程度显著增加；</p>
                        <p>（三）被保险人或驾驶人的故意行为。</p>
                        </section>
                        <section>
                        <p><label>第四十二条 </label>下列人身伤亡、损失和费用，保险人不负责赔偿：</p>
                        <p>（一）被保险人及驾驶人以外的其他车上人员的故意行为造成的自身伤亡；</p>
                        <p>（二）车上人员因疾病、分娩、自残、斗殴、自杀、犯罪行为造成的自身伤亡；</p>
                        <p>（三）违法、违章搭乘人员的人身伤亡；</p>
                        <p>（四）罚款、罚金或惩罚性赔款；</p>
                        <p>（五）超出《道路交通事故受伤人员临床诊疗指南》和国家基本医疗保险同类医疗费用标准的费用部分；</p>
                        <p>（六）律师费，未经保险人事先书面同意的诉讼费、仲裁费；</p>
                        <p>（七）投保人、被保险人或其允许的驾驶人知道保险事故发生后，故意或者因重大过失未及时通知，致使保险事故的性质、原因、损失程度等难以确定的，保险人对无法确定的部分，不承担赔偿责任，但保险人通过其他途径已经及时知道或者应当及时知道保险事故发生的除外；</p>
                        <p>（八）精神损害抚慰金；</p>
                        <p>（九）应当由机动车交通事故责任强制保险赔付的损失和费用。</p>
                        </section>
                        <header>免赔率</header>
                        <section>
                        <p><label>第四十三条</label>保险人在依据本保险合同约定计算赔款的基础上，在保险单载明的责任限额内，按照下列方式免赔：</p>
                        <p>被保险机动车一方负次要事故责任的，实行5%的事故责任免赔率；负同等事故责任的，实行10%的事故责任免赔率；负主要事故责任的，实行15%的事故责任免赔率；负全部事故责任或单方肇事事故的，实行20%的事故责任免赔率。</p>
                        </section>
                        <header>责任限额</header>
                        <section>
                        <p><label>第四十四条</label>驾驶人每次事故责任限额和乘客每次事故每人责任限额由投保人和保险人在投保时协商确定。投保乘客座位数按照被保险机动车的核定载客数（驾驶人座位除外）确定。</p>
                        </section>
                        <header>赔偿处理</header>
                        <section>
                        <p><label>第四十五条</label>发生保险事故时，被保险人或其允许的驾驶人应当及时采取合理的、必要的施救和保护措施，防止或者减少损失，并在保险事故发生后48小时内通知保险人。被保险人或其允许的驾驶人根据有关法律法规规定选择自行协商方式处理交通事故的，应当立即通知保险人。</p>
                        </section>
                        <section>
                        <p><label>第四十六条</label>被保险人或其允许的驾驶人根据有关法律法规规定选择自行协商方式处理交通事故的，应当协助保险人勘验事故各方车辆、核实事故责任，并依照《道路交通事故处理程序规定》签订记录交通事故情况的协议书。</p>
                        </section>
                        <section>
                        <p><label>第四十七条</label>被保险人索赔时，应当向保险人提供与确认保险事故的性质、原因、损失程度等有关的证明和资料。</p>
                        <p>被保险人应当提供保险单、损失清单、有关费用单据、被保险机动车行驶证和发生事故时驾驶人的驾驶证。</p>
                        <p>属于道路交通事故的，被保险人应当提供公安机关交通管理部门或法院等机构出具的事故证明、有关的法律文书（判决书、调解书、裁定书、裁决书等）和通过机动车交通事故责任强制保险获得赔偿金额的证明材料。被保险人或其允许的驾驶人根据有关法律法规规定选择自行协商方式处理交通事故的，被保险人应当提供依照《道路交通事故处理程序规定》签订记录交通事故情况的协议书和通过机动车交通事故责任强制保险获得赔偿金额的证明材料。</p>
                        </section>
                        <section>
                        <p><label>第四十八条</label> 赔款计算</p>
                        <p>（一）对每座的受害人，当（依合同约定核定的每座车上人员人身伤亡损失金额－应由机动车交通事故责任强制保险赔偿的金额）×事故责任比例高于或等于每次事故每座赔偿限额时：</p>
                        <p>赔款=每次事故每座赔偿限额×（1－事故责任免赔率）</p>
                        <p>（二）对每座的受害人，当（依合同约定核定的每座车上人员人身伤亡损失金额－应由机动车交通事故责任强制保险赔偿的金额）×事故责任比例低于每次事故每座赔偿限额时：</p>
                        <p>赔款=（依合同约定核定的每座车上人员人身伤亡损失金额－应由机动车交通事故责任强制保险赔偿的金额）×事故责任比例×（1－事故责任免赔率）</p>
                        </section>
                        <section>
                        <p><label>第四十九条</label>保险人按照《道路交通事故受伤人员临床诊疗指南》和国家基本医疗保险的同类医疗费用标准核定医疗费用的赔偿金额。</p>
                        <p>未经保险人书面同意，被保险人自行承诺或支付的赔偿金额，保险人有权重新核定。因被保险人原因导致损失金额无法确定的，保险人有权拒绝赔偿。</p>
                        </section>
                        <section>
                        <p><label>第五十条</label>保险人受理报案、现场查勘、核定损失、参与诉讼、进行抗辩、要求被保险人提供证明和资料、向被保险人提供专业建议等行为，均不构成保险人对赔偿责任的承诺。</p>
                        </section>
                        <header>第四章 机动车全车盗抢保险</header>
                        <header>保险责任</header>
                        <section>
                        <p><label>第五十一条</label>保险期间内，被保险机动车的下列损失和费用，且不属于免除保险人责任的范围，保险人依照本保险合同的约定负责赔偿：</p>
                        <p>（一） 被保险机动车被盗窃、抢劫、抢夺，经出险当地县级以上公安刑侦部门立案证明，满60天未查明下落的全车损失；</p>
                        <p>（二） 被保险机动车全车被盗窃、抢劫、抢夺后，受到损坏或车上零部件、附属设备丢失需要修复的合理费用；</p>
                        <p>（三） 被保险机动车在被抢劫、抢夺过程中，受到损坏需要修复的合理费用。</p>
                        </section>
                        <header>责任免除</header>
                        <section>
                        <p><label>第五十二条</label>在上述保险责任范围内，下列情况下，不论任何原因造成被保险机动车的任何损失和费用，保险人均不负责赔偿：</p>
                        <p>（一）被保险人索赔时未能提供出险当地县级以上公安刑侦部门出具的盗抢立案证明；</p>
                        <p>（二）驾驶人、被保险人、投保人故意破坏现场、伪造现场、毁灭证据；</p>
                        <p>（三）被保险机动车被扣押、罚没、查封、政府征用期间；</p>
                        <p>（四）被保险机动车在竞赛、测试期间，在营业性场所维修、保养、改装期间，被运输期间。</p>
                        </section>
                        <section>
                        <p><label>第五十三条</label>下列损失和费用，保险人不负责赔偿：</p>
                        <p>（一）地震及其次生灾害导致的损失和费用；</p>
                        <p>（二）战争、军事冲突、恐怖活动、暴乱导致的损失和费用；</p>
                        <p>（三）因诈骗引起的任何损失；因投保人、被保险人与他人的民事、经济纠纷导致的任何损失；</p>
                        <p>（四）被保险人或其允许的驾驶人的故意行为、犯罪行为导致的损失和费用；</p>
                        <p>（五）非全车遭盗窃，仅车上零部件或附属设备被盗窃或损坏；</p>
                        <p>（六）新增设备的损失；</p>
                        <p>（七）遭受保险责任范围内的损失后，未经必要修理并检验合格继续使用，致使损失扩大的部分；</p>
                        <p>（八）被保险机动车被转让、改装、加装或改变使用性质等，被保险人、受让人未及时通知保险人，且因转让、改装、加装或改变使用性质等导致被保险机动车危险程度显著增加而发生保险事故；</p>
                        <p>（九）投保人、被保险人或其允许的驾驶人知道保险事故发生后，故意或者因重大过失未及时通知，致使保险事故的性质、原因、损失程度等难以确定的，保险人对无法确定的部分，不承担赔偿责任，但保险人通过其他途径已经及时知道或者应当及时知道保险事故发生的除外；</p>
                        <p>（十）因被保险人违反本条款第五十八条约定，导致无法确定的损失。</p>
                        </section>
                        <header>免赔率</header>
                        <section>
                        <p><label>第五十四条</label>保险人在依据本保险合同约定计算赔款的基础上，按照下列方式免赔：</p>
                        <p>（一） 发生全车损失的，绝对免赔率为20%；</p>
                        <p>（二） 发生全车损失，被保险人未能提供《机动车登记证书》、机动车来历凭证的，每缺少一项，增加1%的绝对免赔率。</p>
                        </section>
                        <header>保险金额</header>
                        <section>
                        <p><label>第五十五条</label>保险金额在投保时被保险机动车的实际价值内协商确定。</p>
                        <p>投保时被保险机动车的实际价值由投保人与保险人根据投保时的新车购置价减去折旧金额后的价格协商确定或其他市场公允价值协商确定。</p>
                        <p>折旧金额可根据本保险合同列明的参考折旧系数表确定。</p>
                        </section>
                        <header>赔偿处理</header>
                        <section>
                        <p><label>第五十六条</label>被保险机动车全车被盗抢的，被保险人知道保险事故发生后，应在24小时内向出险当地公安刑侦部门报案，并通知保险人。</p>
                        </section>
                        <section>
                        <p><label>第五十七条</label>被保险人索赔时，须提供保险单、损失清单、有关费用单据、《机动车登记证书》、机动车来历凭证以及出险当地县级以上公安刑侦部门出具的盗抢立案证明。</p>
                        </section>
                        <section>
                        <p><label>第五十八条</label>因保险事故损坏的被保险机动车，应当尽量修复。修理前被保险人应当会同保险人检验，协商确定修理项目、方式和费用。对未协商确定的，保险人可以重新核定。</p>
                        </section>
                        <section>
                        <p><label>第五十九条</label>保险人按下列方式赔偿：</p>
                        <p>（一）被保险机动车全车被盗抢的，按以下方法计算赔款：</p>
                        <p>赔款＝保险金额×（1－绝对免赔率之和）</p>
                        <p>（二）被保险机动车发生本条款第五十一条第（二）款、第（三）款列明的损失，保险人按实际修复费用在保险金额内计算赔偿。</p>
                        </section>
                        <section>
                        <p><label>第六十条</label>保险人确认索赔单证齐全、有效后，被保险人签具权益转让书，保险人赔付结案。</p>
                        </section>
                        <section>
                        <p><label>第六十一条</label>被保险机动车发生本保险事故，导致全部损失，或一次赔款金额与免赔金额之和达到保险金额，保险人按本保险合同约定支付赔款后，本保险责任终止，保险人不退还机动车全车盗抢保险及其附加险的保险费。</p>
                        </section>
                        <header>第五章 通用条款</header>
                        <header>保险期间</header>
                        <section>
                        <p><label>第六十二条</label>除另有约定外，保险期间为一年，以保险单载明的起讫时间为准。</p>
                        </section>
                        <header>其它事项</header>
                        <section>
                        <p><label>第六十三条</label>保险人按照本保险合同的约定，认为被保险人索赔提供的有关证明和资料不完整的，应当及时一次性通知被保险人补充提供。</p>
                        </section>
                        <section>
                        <p><label>第六十四条</label>保险人收到被保险人的赔偿请求后，应当及时作出核定；情形复杂的，应当在三十日内作出核定。保险人应当将核定结果通知被保险人；对属于保险责任的，在与被保险人达成赔偿协议后十日内，履行赔偿义务。保险合同对赔偿期限另有约定的，保险人应当按照约定履行赔偿义务。</p>
                        <p>保险人未及时履行前款约定义务的，除支付赔款外，应当赔偿被保险人因此受到的损失。</p>
                        </section>
                        <section>
                        <p><label>第六十五条</label>保险人依照本条款第六十四条的约定作出核定后，对不属于保险责任的，应当自作出核定之日起三日内向被保险人发出拒绝赔偿通知书，并说明理由。</p>
                        </section>
                        <section>
                        <p><label>第六十六条</label> 保险人自收到赔偿请求和有关证明、资料之日起六十日内，对其赔偿数额不能确定的，应当根据已有证明和资料可以确定的数额先予支付；保险人最终确定赔偿数额后，应当支付相应的差额。</p>
                        </section>
                        <section>
                        <p><label>第六十七条</label>在保险期间内，被保险机动车转让他人的，受让人承继被保险人的权利和义务。被保险人或者受让人应当及时通知保险人，并及时办理保险合同变更手续。</p>
                        <p>因被保险机动车转让导致被保险机动车危险程度发生显著变化的，保险人自收到前款约定的通知之日起三十日内，可以相应调整保险费或者解除本保险合同。</p>
                        </section>
                        <section>
                        <p><label>第六十八条</label>保险责任开始前，投保人要求解除本保险合同的，应当向保险人支付应交保险费金额3%的退保手续费，保险人应当退还保险费。</p>
                        <p>保险责任开始后，投保人要求解除本保险合同的，自通知保险人之日起，本保险合同解除。保险人按日收取自保险责任开始之日起至合同解除之日止期间的保险费，并退还剩余部分保险费。</p>
                        </section>
                        <section>
                        <p><label>第六十九条</label>因履行本保险合同发生的争议，由当事人协商解决，协商不成的，由当事人从下列两种合同争议解决方式中选择一种，并在本保险合同中载明：</p>
                        <p>（一）提交保险单载明的仲裁委员会仲裁；</p>
                        <p>（二）依法向人民法院起诉。</p>
                        <p>本保险合同适用中华人民共和国（不含港、澳、台地区）法律。</p>
                        </section>
                        <header>附加险</header>
                        <section>
                        <p>附加险条款的法律效力优于主险条款。附加险条款未尽事宜，以主险条款为准。除附加险条款另有约定外，主险中的责任免除、免赔规则、双方义务同样适用于附加险。</p>
                        <p>1、玻璃单独破碎险</p>
                        <p>2、自燃损失险</p>
                        <p>3、新增加设备损失险</p>
                        <p>4、车身划痕损失险</p>
                        <p>5、发动机涉水损失险</p>
                        <p>6、修理期间费用补偿险</p>
                        <p>7、车上货物责任险</p>
                        <p>8、精神损害抚慰金责任险</p>
                        <p>9、不计免赔率险</p>
                        <p>10、机动车损失保险无法找到第三方特约险</p>
                        <p>11、指定修理厂险</p>
                        </section>
                    </div>
                    

                </div>
            </div>
        );
    };
}
