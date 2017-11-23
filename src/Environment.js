// 1
import { GC_AUTH_TOKEN } from './constants'
const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime')


// 2
const store = new Store(new RecordSource())

export const fetchQuery = (operation, variables) => {
  // 4
  return fetch('https://api.graph.cool/relay/v1/cj7kssuuk03mp0178cksg46h5', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

// 3
const network = Network.create(fetchQuery)

// 5
const environment = new Environment({
  network,
  store,
})

// 6
export default environment
