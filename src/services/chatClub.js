import { request } from '@utils'

// example
export function getExample1(payload) {
  return request(`/api/example1`, {
    query: payload
  })
}
