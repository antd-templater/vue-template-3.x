import { promiser, resolver, worker, rester } from '@/mock/setup'
import { http, HttpResponse } from 'msw'

const tag = '查询 Tree 下拉框'
const url = resolver('/base/getTreeById')

worker.use(
  http.post(url, async req => {
    const body = await rester.body(req)
    const query = await rester.query(req)
    const params = await rester.params(req)
    const printer = await rester.printer(tag)

    let result: any = null

    switch (body && body.id) {
      case 'orgTree': {
        result = {
          code: '0000',
          message: null,
          result: [
            {
              children: [
                {
                  children: [
                    {
                      label: '一号集装箱码头有限公司',
                      shortName: '集运一号',
                      value: '101.100.101',
                      valueParent: '101.100'
                    },
                    {
                      label: '二号集装箱码头分公司',
                      shortName: '集运二号',
                      value: '101.100.105',
                      valueParent: '101.100'
                    },
                    {
                      label: '三号集装箱码头有限公司',
                      shortName: '集运三号',
                      value: '101.100.103',
                      valueParent: '101.100'
                    },
                    {
                      label: '梅山船运有限公司',
                      shortName: '梅山公司',
                      value: '101.100.104',
                      valueParent: '101.100'
                    },
                    {
                      label: '舟山客运有限公司',
                      shortName: '舟运公司',
                      value: '101.100.107',
                      valueParent: '101.100'
                    },
                    {
                      label: '苏州钢材有限公司',
                      shortName: '苏州钢材',
                      value: '101.100.106',
                      valueParent: '101.100'
                    },
                    {
                      label: '宁波永耀科技公司',
                      shortName: '永耀公司',
                      value: '101.100.108',
                      valueParent: '101.100'
                    },
                    {
                      label: '太仓微柯有限公司',
                      shortName: '太仓微柯',
                      value: '101.100.110',
                      valueParent: '101.100'
                    },
                    {
                      label: '东海食品加工有限公司',
                      shortName: '东海食品',
                      value: '101.100.111',
                      valueParent: '101.100'
                    },
                    {
                      label: '镇海希港公司',
                      shortName: '希港公司',
                      value: '101.100.112',
                      valueParent: '101.100'
                    },
                    {
                      label: '嘉兴港智科技有限公司',
                      shortName: '嘉兴港智',
                      value: '101.102',
                      valueParent: '101.100'
                    },
                    {
                      children: [
                        {
                          label: '北仑海运有限责任公司',
                          shortName: '北仑海运',
                          value: '101.100.113.126',
                          valueParent: '101.100.113'
                        }
                      ],
                      label: '北仑网安通信有限公司',
                      shortName: '北仑网安',
                      value: '101.100.113',
                      valueParent: '101.100'
                    },
                    {
                      children: [
                        {
                          label: '温州信讯有限公司',
                          shortName: '温州信讯',
                          value: '101.101.105',
                          valueParent: '101.101'
                        }
                      ],
                      label: '天芸集团有限公司',
                      shortName: '天芸集团',
                      value: '101.101',
                      valueParent: '101.100'
                    },
                    {
                      label: '太一集装箱码头有限公司',
                      shortName: '太一集司',
                      value: '101.100.106.100',
                      valueParent: '101.100'
                    },
                    {
                      label: '宁波铁运有限公司',
                      shortName: '宁波铁运',
                      value: '101.100.122',
                      valueParent: '101.100'
                    },
                    {
                      label: '万仓码头有限公司',
                      shortName: '万仓公司',
                      value: '101.100.114',
                      valueParent: '101.100'
                    },
                    {
                      label: '南京明夕有限公司',
                      shortName: '南京明夕',
                      value: '101.100.109',
                      valueParent: '101.100'
                    },
                    {
                      label: '浙江义乌微贸有限公司',
                      shortName: '义乌微贸',
                      value: '101.103',
                      valueParent: '101.100'
                    },
                    {
                      label: '宁波甬轮有限公司',
                      shortName: '宁波甬轮',
                      value: '101.100.128',
                      valueParent: '101.100'
                    },
                    {
                      label: '宁波云港运输有限公司',
                      shortName: '宁波云港',
                      value: '101.104',
                      valueParent: '101.100'
                    },
                    {
                      label: '宁波大航有限公司',
                      shortName: '宁波大航',
                      value: '101.106',
                      valueParent: '101.100'
                    },
                    {
                      label: '小港集装箱运输有限公司',
                      shortName: '小港集运公司',
                      value: '101.100.117',
                      valueParent: '101.100'
                    },
                    {
                      label: '麦羽港务有限公司',
                      shortName: '麦羽港务',
                      value: '101.122',
                      valueParent: '101.100'
                    },
                    {
                      label: '上海海马物流有限公司',
                      shortName: '海马物流',
                      value: '101.100.116',
                      valueParent: '101.100'
                    },
                    {
                      label: '舟山船代有限公司',
                      shortName: '船代公司',
                      value: '101.100.120',
                      valueParent: '101.100'
                    },
                    {
                      label: '宁波电商贸易有限公司',
                      shortName: '电商贸易',
                      value: '101.105',
                      valueParent: '101.100'
                    },
                    {
                      label: '宁波港业有限公司',
                      shortName: '宁波港业',
                      value: '101.100.121',
                      valueParent: '101.100'
                    },
                    {
                      label: '台州外轮理货有限公司',
                      shortName: '台州理货',
                      value: '101.100.123',
                      valueParent: '101.100'
                    },
                    {
                      label: '港通电子商务有限公司',
                      shortName: '港通电商',
                      value: '101.107',
                      valueParent: '101.100'
                    },
                    {
                      label: '北仑网安通信有限公司',
                      shortName: '北仑网安',
                      value: '101.100.131',
                      valueParent: '101.100'
                    },
                    {
                      label: '梅京众联有限公司',
                      shortName: '梅京众联',
                      value: '112.001',
                      valueParent: '101.100'
                    },
                    {
                      label: '浙江内港发展有限公司',
                      shortName: '浙江内港',
                      value: '101.119',
                      valueParent: '101.100'
                    },
                    {
                      label: '江阴集装箱码头有限公司',
                      shortName: '江阴集装箱公司',
                      value: '101.100.130',
                      valueParent: '101.100'
                    },
                    {
                      label: '舟山东极岛开发有限公司',
                      shortName: '东极岛公司',
                      value: '1.109',
                      valueParent: '101.100'
                    },
                    {
                      label: '船舶市场有限公司',
                      shortName: '船舶市场有限公司',
                      value: '101.100.113.100',
                      valueParent: '101.100'
                    },
                    {
                      label: '远洋投资开发有限公司',
                      shortName: '远洋投资',
                      value: '1.113',
                      valueParent: '101.100'
                    },
                    {
                      label: '商品交易中心有限公司',
                      shortName: '商品交易　',
                      value: '1.114',
                      valueParent: '101.100'
                    },
                    {
                      label: '宁财港务有限公司',
                      shortName: '宁财港务',
                      value: '101.100.138',
                      valueParent: '101.100'
                    },
                    {
                      label: '宁波航运科技有限公司',
                      shortName: '宁波航运科技',
                      value: '1.721',
                      valueParent: '101.100'
                    },
                    {
                      label: '舟山微智集团财务有限公司',
                      shortName: '舟山微智',
                      value: '101.112',
                      valueParent: '101.100'
                    },
                    {
                      label: '游龙港务有限公司',
                      shortName: '游龙港务',
                      value: '101.119.100',
                      valueParent: '101.100'
                    },
                    {
                      label: '大榭招商国际投资有限公司',
                      shortName: '大榭招商',
                      value: '101.100.102',
                      valueParent: '101.100'
                    },
                    {
                      label: '航铁联合物流有限公司',
                      shortName: '航铁物流',
                      value: '101.100.127',
                      valueParent: '101.100'
                    },
                    {
                      label: '浙麦铁运管理有限公司',
                      shortName: '浙麦铁运',
                      value: '101.100.155',
                      valueParent: '101.100'
                    },
                    {
                      label: '舟山散货物流有限公司 ',
                      shortName: '舟山散货物流有限公司',
                      value: '101.121',
                      valueParent: '101.100'
                    },
                    {
                      label: '长兴港安有限公司',
                      shortName: '长兴港安',
                      value: '101.119.102',
                      valueParent: '101.100'
                    },
                    {
                      label: '浙芸资产管理有限公司 ',
                      shortName: '浙芸资管公司 ',
                      value: '101.110',
                      valueParent: '101.100'
                    }
                  ],
                  label: '港运信息有限公司',
                  shortName: '港运公司',
                  value: '101.100',
                  valueParent: '1'
                }
              ],
              label: '浙大远疆投资集团有限公司',
              shortName: '集团公司',
              value: '1',
              valueParent: '0'
            }
          ]
        }
        break
      }
      default: {
        result = {
          code: '0000',
          message: null,
          result: []
        }
      }
    }

    printer(log => {
      log('[body] - ', body)
      log('[query] - ', query)
      log('[params] - ', params)
      log('[result] - ', result)
    })

    return promiser(
      HttpResponse.json(result),
      300
    )
  })
)
