export const BASE = '/api'
export const AUTH = '/auth'       // 需要登录验证身份的接口

export const GET_USER_INFO = BASE + '/user_info'  // 获取用户信息 || 登录


/* 主页 */
export const GET_STORE_LIST = BASE + '/store/list'      // 获取门店列表
export const GET_PRODUCT_LIST = BASE + '/store/list'    // 根据门店获取商品列表

/* 会员卡 */
export const GET_CARD_SHOP = BASE + '/card/shop'      // 会员卡购买列表
export const GET_USER_CARD = BASE + AUTH + '/my/card'   // 个人购买的卡

/* 支付 */
export const PAY_VIP_CARD = BASE + AUTH + '/pay/vipcard'      // 会员卡支付

/* 订单 */
export const GET_HISTORY_ORDER = BASE + AUTH + '/history/order'   // 历史订单
