import { lodash_helper, rxjs_helper, immutable, moment_helper, Rxjs_helper } from './helper'
import { observer, inject, } from 'mobx-react'


//------------------通用部分
export { request } from './request'
export const _ = lodash_helper
export const moment = moment_helper
export { localSave } from './helper'
export const Imu = immutable
export const R = Rxjs_helper

export const getRes = function (res) {
  if (res) {
    return {
      data: _.get(res, 'data') || res
    }
  }
  return {
    data: null,
    head: null,
    code: (res && res.errcode) || '',
    msg: _.get(res, 'data.errormsg') || _.get(res, 'errStr')
  }
}

export const resOk = (res) => {
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

// ----------------------------项目适用
export { toJS, observable, action, runInAction } from 'mobx'

export const Inject = (func) => {
  return (c) => {
    return inject(func)(observer(c))
  }
}

export const processResult = (payload, callback = (v) => v) => {
  const data = getRes(payload)
  if (!_.isFunction(callback)) return console.error('callback必须是函数')
  if (resOk(data)) {
    return callback(data.data)
  }
}

export const createSubject = (type, callback) => {
  const sub$ = new R.Subject()
  return sub$
}




