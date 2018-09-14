import { pool } from '../utils/db'
var ObjectId = require('mongodb').ObjectId

export default {

  /*
   * 获取店铺列表
   */
  getStoretList: async (params = {}) => {
    const resourcePromise = pool.acquire();
    return await resourcePromise.then(async function(db) {
      const co = db.db('pujin').collection('store')
      const list = await new Promise((resolve,reject) => {
        co.find(params).toArray(function (err, result){
          if (err) {
            reject([])
          } else {
            if (result.length>0) {
                  result.sort((a, b) => a.group.order - b.group.order )
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
   * 根据id更新门店信息
   */
  updateStore: async (_id, name, group) => {
    const resourcePromise = pool.acquire();
    return await resourcePromise.then(async function(db) {
      const co = db.db('pujin').collection('store')
      const result = await new Promise((resolve, reject) => {
        co.updateOne({ _id: ObjectId(_id) }, { $set: { name, group } }, function (err, result){
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
   * 新增门店
   */
  addStore: async (name, group) => {
    const resourcePromise = pool.acquire();
    return await resourcePromise.then(async function(db) {
      const co = db.db('pujin').collection('store')
      const result = await new Promise((resolve, reject) => {
        co.insertOne({ name, group, status: 'off' }, function (err, result){
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
   * 更改店铺营业状态
   */
  changeStoreStatus: async (_id, status) => {
    const resourcePromise = pool.acquire();
    return await resourcePromise.then(async function(db) {
      const co = db.db('pujin').collection('store')
      const result = await new Promise((resolve, reject) => {
        co.updateOne({ _id: ObjectId(_id) }, { $set: { status } }, function (err, result){
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