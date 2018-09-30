export const BASE = '/api'
export const AUTH = '/auth'       // 需要登录验证身份的接口

export const GET_USER_INFO = BASE + '/user_info'  // 获取用户信息 || 登录


/* 主页 */
export const GET_STORE_LIST = BASE + '/store/list'      // 获取门店列表
export const GET_PRODUCT_LIST = BASE + '/product/list'    // 根据门店获取商品列表

/* 会员卡 */
export const GET_CARD_SHOP = BASE + '/card/shop'      // 会员卡购买列表
export const GET_USER_CARD = BASE + AUTH + '/my/card'   // 个人购买的卡

/* 支付 */
export const PAY_VIP_CARD = BASE + AUTH + '/pay/vipcard'      // 会员卡支付

/* 订单 */
export const GET_HISTORY_ORDER = BASE + AUTH + '/history/order'   // 历史订单


/*==========================后台部分============================*/

export const ADMIN = '/api/admin/auth'

export const AD_LOGIN = '/api/admin/login'   //登录

/*
 * 门店产品管理
 */
export const STORE_MANAGE_LIST = ADMIN + '/store/list'
export const STORE_MANAGE = ADMIN + '/store/manage'      // 门店管理，添加，删除
export const STORE_STATUS_CHANGE = ADMIN + '/store/status/change' // 门店状态修改


/*
 * 产品管理
 */
export const PRODUCT_MANAGE_LIST = ADMIN + '/product/list'
export const PRO_STORE_OPTIONS = ADMIN + '/product/store/options'
export const PRO_IMAGE_UPLOAD = ADMIN + '/product/image/upload'       // 产品图片上传
export const PRO_INFO_SAVE = ADMIN + '/product/info/save'             // 新增 or 更新产品信息