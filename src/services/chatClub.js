import { request } from '@utils'

// example
export function getExample1(payload) {
  return request(`/mock/example1`, {
    query: payload
  })
}
