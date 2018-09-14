import { PRODUCT_MANAGE_LIST, PRO_STORE_OPTIONS }  from "../../config/url";
import { resultWrap } from '../../utils/net'
import productManageService from '../../service/productManageService'



module.exports = function (app) {
  
  // 管理员获取产品列表
  app.post(PRODUCT_MANAGE_LIST, async function (req, res) {
    const list = await productManageService.getProductList()
    res.send(resultWrap(list))
  });

  // 产品所属的店铺配置
  app.post(PRO_STORE_OPTIONS, async function (req, res) {
    const list = await productManageService.getStoreConfig()
    res.send(resultWrap(list))
  })


};