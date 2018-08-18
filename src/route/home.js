import { GET_STORE_LIST }  from "../../config/url";
import { mockWrap } from '../../utils/net'

import Mock from 'mockjs'




module.exports = function (app) {
  
  app.get(ACC_BANK_SUPPORT, function (req, res) {
    const data = Mock.mock({
          "list|10" : [
            {
              "value|10000-19999": 10000,
              "label": '中国'+'@cword(2)' + '银行' 
            }
          ]
      })
    res.send(mockWrap(data));
  });
  
  app.get(ACC_AREA_SUPPORT, function (req, res) {
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
  })

};