import { lodash_helper, immutable, moment_helper } from './helper'

export { request } from './request'
export const _ = lodash_helper
export const moment = moment_helper
export { localSave } from './helper'
export const Imu = immutable

export const getRes = function (res) {
  if (res) {
    return {
      head: _.get(res, 'data.head') || _.get(res, 'head') || {},
      data: _.has(res, 'data.data.data') ? _.get(res, 'data.data.data') : (_.has(res, 'data.data') ? _.get(res, 'data.data') : (_.has(res, 'data') ? _.get(res, 'data') : res))
    }
  }
  return {
    data: null,
    head: null,
    code: (res && res.errcode) || '',
    msg: _.get(res, 'data.errormsg') || _.get(res, 'errStr')
  }
}

export const resOk = (res, method) => {
  if (_.isNil(res.data)) {
    return false
  }
  return true
}


export const isEqual = (obj1, obj2) => {
  if (_.isObjectLike(obj1) || _.isObjectLike(obj2)) {
    const { fromJS, is } = Imu
    return is(fromJS(obj1), fromJS(obj2))
  } else {
    return _.isEqual(obj1, obj2)
  }
}

export const deepClone = (obj) => {
  if (_.isObjectLike(obj)) {
    const { fromJS } = Imu
    return fromJS(obj)
      .toJS()
  } else {
    return obj
  }
}




