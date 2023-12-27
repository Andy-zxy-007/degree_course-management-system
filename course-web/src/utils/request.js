/*
 * @Author: Vincent
 * @Date: 2018-05-06 15:24:27
 * @Last Modified by: Vincent
 * @Last Modified time: 2018-06-12 10:03:19
 */

import axios from 'axios'

// import { getToken } from '@/utils/auth'
axios.defaults.withCredentials = true;
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

export default service
