import globalAxios from '../config/server/axios'

export async function apiTest() {
  const {data}=await globalAxios.get('/test');
  return data
}
