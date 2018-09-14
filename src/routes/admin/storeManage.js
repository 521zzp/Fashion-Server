import { STORE_MANAGE_LIST, STORE_MANAGE, STORE_STATUS_CHANGE }  from "../../config/url";
import { resultWrap } from '../../utils/net'
import storeManageService from '../../service/storeManageService'



module.exports = function (app) {
  
  console.log(STORE_MANAGE_LIST)

  // 管理员获取店铺列表
  app.post(STORE_MANAGE_LIST, async function (req, res) {
    const list = await storeManageService.getStoretList()
    res.send(resultWrap(list))
  });

  // 店铺信息更新
  app.post(STORE_MANAGE, async function (req, res) {
    const { operate_type, group, _id, name } = req.body.datas;
    var result;
    if (operate_type === 'update' ) {
      result = await storeManageService.updateStore(_id, name, group)
    } else if (operate_type === 'add') {
      result = await storeManageService.addStore(name, group)
    }
    if (result) {
      res.send(resultWrap({}, '保存成功', 200))
    } else {
      res.send(resultWrap({}, '保存失败', 101))
    }
    
  });

  // 店铺营业状态更新
  app.post(STORE_STATUS_CHANGE, async function (req, res) {
    const { _id, status } = req.body.datas;
    const result = await storeManageService.changeStoreStatus(_id, status)
    if (result) {
      res.send(resultWrap({}, '保存成功', 200))
    } else {
      res.send(resultWrap({}, '保存失败', 101))
    }
  })

};