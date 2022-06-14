import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (Blogid) => {
  console.log("removessa id"+Blogid)
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${baseUrl}/${Blogid}`, config)
  
}
const like = async (blogToUpdate) => {
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios
  .put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate, config)
  return response.data
}

export default { getAll, create, setToken, like, remove }