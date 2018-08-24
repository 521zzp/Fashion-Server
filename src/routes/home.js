import { GET_STORE_LIST }  from "../config/url";
import { resultWrap } from '../utils/net'

import Mock from 'mockjs'




module.exports = function (app) {
  
  app.get(GET_STORE_LIST, function (req, res) {
    const data = Mock.mock({
        "list|10-20" : [
          {
            'group|1': [
              {
                'name': '洗', 
                'order': 1,
              },
              {
                'name': '剪', 
                'order': 2,
              },
              {
                'name': '吹', 
                'order': 3,
              },
              {
                'name': '烫', 
                'order': 4,
              },
              {
                'name': '染', 
                'order': 5,
              },
              {
                'name': '美白', 
                'order': 6,
              },
              {
                'name': '造型', 
                'order': 7,
              }
            ],   // 大类
            'store|1': [ '嘉定白银路店', '徐汇店', '松江店', '宝山店', '浦东店', '虹口店' ],  // 门店
            'store_id': '@guid',
            'name': '@cword(3, 10)',  // 名称
            'original_price': '@integer(60, 500)',  // 原价
            'now_price': '@integer(30, 250)',   // 现价
            'discription': '@cparagraph(1, 5)',
            'img': Mock.Random.image('100x100', '#50B347', '#FFF', 'picture'), // 图片
            'on_sell': true,
            'product_order': '@integer(1, 10)'
          }
        ]
    })

    data.list.sort((a, b) => a.group.order - b.group.order )

    res.send(resultWrap(data));
  });
  
  /*app.get(ACC_AREA_SUPPORT, function (req, res) {
    const data = Mock.mock({
          "list|23" : [
            {
              "value|10000-19999": 10000,
              "label": '@cword(2)' + '省',
              "children|10": [
                {
                  "value|10000-19999": 10000,
                  "label": '@cword(2)' + '市',
                }
              ]
            }
          ]
      })
    res.send(mockWrap(data));
  });

  app.post(ACC_BANK_INFO, function (req, res) {
    const { token } = req.body
    if (!token) {
      res.send(mockWrap({code: 100, msg: '参数错误'}));
    } else {
      const data = Mock.mock({
        "bankName": '中国'+'@cword(2)' + '银行',
        "bankCard": '@integer',
        "userName":  '@cword(3)',
        "branch": '@cword(3)' + '分行',
        "subbranch": '@cword(5)' + '支行',
        "pro": '@cword(2)' + '省',
        "city": '@cword(2)' + '市',
        "time": '@datetime',
        "status|1": [
          '审核中',
          '审核通过',
        ]
      })
      res.send(mockWrap(data));
    }
  })*/

};