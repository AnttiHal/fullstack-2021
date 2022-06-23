import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = (data) => {
  const notification = useSelector(state => state.notification)
  if (notification === null) {
    return null
  }

  return <div className="error">{(notification &&
    <Alert variant={data.variant}>
      {notification}
    </Alert>
  )}</div>
}

export default Notification
