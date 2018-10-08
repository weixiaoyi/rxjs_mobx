import { request } from '@utils'

// example
export function getExample1(payload) {
  return request(`/mock/example1`)
}

export function getExample2(payload) {
  return request(`/mock/example2`)
}

export function getExample3(payload) {
  return request(`/mock/example3`)
}