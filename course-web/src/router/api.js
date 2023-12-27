
import axios from 'axios'
import { Loading } from 'element-ui';

export function postFn(url, params) {
    let loadding = Loading.service({
      background: 'rgba(0, 0, 0, 0.7)'
    })
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(response => {
          loadding.close()
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error)
          loadding.close()
          reject(error)
        })
    })
  }
  
  export function getFn(url, params) {
    let loadding = Loading.service({
      background: 'rgba(0, 0, 0, 0.7)'
    })
    return new Promise((resolve, reject) => {
      axios.get(url, params)
        .then(response => {
          loadding.close()
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error)
          loadding.close()
          reject(error)
        })
    })
  }

  export default {
    postFn,
    getFn,
  }
  