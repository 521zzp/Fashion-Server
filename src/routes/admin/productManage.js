import { PRODUCT_MANAGE_LIST, PRO_STORE_OPTIONS, PRO_IMAGE_UPLOAD, PRO_INFO_SAVE }  from "../../config/url";
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

  // 产品所属的店铺配置
  app.post(PRO_IMAGE_UPLOAD, async function (req, res) {
    console.log('PRO_IMAGE_UPLOAD', PRO_IMAGE_UPLOAD)
    const { img_url, result, msg } = await productManageService.uploadProductImage(req, res)
    if (result) {
      res.send(resultWrap({ img_url: img_url }))
    } else {
      res.send(resultWrap({ msg }, '失败',101))
    }
    
  })

  // 新增或更新产品信息
  app.post(PRO_INFO_SAVE, async function(req,res){
    const { operate_type, _id, params } = req.body.datas;
    var result;
    if (operate_type === 'add') {
      const product = Object.assign(params, { on_sell: false })
      result = await productManageService.addProduct(product)
    } else if (operate_type === 'update') {
      result = await productManageService.updateProduct(_id, params)
    }
    if (result) {
      res.send(resultWrap({}, '保存成功', 200))
    } else {
      res.send(resultWrap({}, '保存失败', 101))
    }
  })

};