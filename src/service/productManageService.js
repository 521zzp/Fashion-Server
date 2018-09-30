import { pool } from '../utils/db'
import formidable  from 'formidable';
import { PRODUCT_UPLOAD_FOLDER } from '../config/db-config'
import Mock from 'mockjs'
var ObjectId = require('mongodb').ObjectId

const assert = require('assert');

export default {


  /*
   * 获取产品列表
   */
  getProductList: async (params = {}) => {
    const resourcePromise = pool.acquire();
    return await resourcePromise.then(async function(db) {
      const co = db.db('pujin').collection('product')
      const list = await new Promise((resolve,reject) => {
        co.find(params).toArray(function (err, result){
          if (err) {
            reject([])
          } else {
            if (result.length>0) {
                  resolve(result)
                } else {
                  resolve([])
                }
          }

        })
      })
      pool.release(db);
      return list
    })
  },

  /*
   * 获取店铺配置
   */
  getStoreConfig: async (req, res) => {
    const resourcePromise = pool.acquire();
    return await resourcePromise.then(async function(db) {
      const co = db.db('pujin').collection('store')
      const list = await new Promise((resolve,reject) => {
        co.find().project({ name: 1, group: 1 }).toArray(function (err, result){
          console.log('_____________________________')
          console.log(result)
          if (err) {
            reject([])
          } else {
            if (result.length>0) {
                  resolve(result)
                } else {
                  resolve([])
                }
          }

        })
      })
      pool.release(db);
      return list
    })

  },


  /*
   * 上传店铺图片
   */
  uploadProductImage: async (req, res) => {
    
    return await new Promise((resolve, reject) => {
      var form = new formidable.IncomingForm();   //创建上传表单
      form.encoding = 'utf-8';        //设置编辑
      form.uploadDir = PRODUCT_UPLOAD_FOLDER;     //设置上传目录
      form.keepExtensions = true;     //保留后缀
      form.maxFieldsSize = 20 * 1024 * 1024;   //文件大小 
      form.hash = 'md5'  //文件校验
      //验证参数合法及更改文件名
      form.on('fileBegin', function(name, file) {
        try {
          assert.equal(name, 'image', '参数不正确');
          const arr = file.name.split('.')
          const file_type = arr.pop()
          file.name = (arr.join('.') + '-' + Mock.mock('@guid').split('-')[0].toLowerCase() + '.' + file_type).replace(/\s/g, '')
          file.path = form.uploadDir + '/' + file.name
        } catch (e) {
          resolve({ result: false, msg: '参数不正确' })
        }
      })
      //解析与保存到数据库
      form.parse(req, function(err, fields, files) {
        if (err) {
           resolve({ result: false, msg: '上传失败' })
          }
          const img_url = files.image ? files.image.name : undefined
          if (img_url) {
            resolve({ result: true, msg: '上传成功', img_url })
          } 
        
      });
    })
    
  },

  /*
   * 新增产品
   */
  addProduct : async (params) => {
    const resourcePromise = pool.acquire();
    return await resourcePromise.then(async function(db) {
      const co = db.db('pujin').collection('product')
      const result = await new Promise((resolve, reject) => {
        co.insertOne(params, function (err, result){
          if (err) {
            resolve(false)
          } else {
            resolve(true)
          }
        })
      })
      pool.release(db);
      return result
    })
  },

  /*
   * 编辑产品
   */
  updateProduct: async (_id, params) => {
    console.log('update id:', _id)
    console.log('updateProduct:')
    console.log(JSON.stringify(params))
    const resourcePromise = pool.acquire();
    return await resourcePromise.then(async function(db) {
      const co = db.db('pujin').collection('product')
      const result = await new Promise((resolve, reject) => {
        co.updateOne({ _id: ObjectId(_id) }, { $set: params }, function (err, result){
          if (err) {
            resolve(false)
          } else {
            resolve(true)
          }
        })
      })
      pool.release(db);
      return result
    })
  }

}