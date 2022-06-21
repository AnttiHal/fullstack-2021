import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

const updateAnecdote = async (id) => {
    const anecdoteToUpdate = await axios.get(`${baseUrl}/${id}`)
    const response = axios.put(`${baseUrl}/${id}`, {
        ...anecdoteToUpdate.data, 
        votes: anecdoteToUpdate.data.votes+=1
    })
    return response

}

export default { getAll, createNew, updateAnecdote }