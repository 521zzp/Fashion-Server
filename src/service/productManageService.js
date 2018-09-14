import { pool } from '../utils/db'

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
  getStoreConfig: async () => {
    const resourcePromise = pool.acquire();
    return await resourcePromise.then(async function(db) {
      const co = db.db('pujin').collection('store')
      const list = await new Promise((resolve,reject) => {
        console.log('.....................')
        co.find().project({ name: 1 }).toArray(function (err, result){
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
  


}