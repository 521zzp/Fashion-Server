import { GET_STORE_LIST }  from "../config/url";
import { resultWrap } from '../utils/net'
import storeManageService from '../service/storeManageService'


import Mock from 'mockjs'




module.exports = function (app) {
  
  // 客户端获取店铺列表
  app.get(GET_STORE_LIST, async function (req, res) {
    const list = await storeManageService.getStoretList({ status: 'on' })
    console.log('list', list)
    res.send(resultWrap(list))

  });


};