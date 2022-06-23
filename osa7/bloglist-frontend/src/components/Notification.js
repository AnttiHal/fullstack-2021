import { Alert } from 'react-bootstrap'

const Notification = ({ message, variant }) => {
  if (message === null) {
    return null
  }

  return <div className="error">{(message &&
    <Alert variant={variant}>
      {message}
    </Alert>
  )}</div>
}

export default Notification
