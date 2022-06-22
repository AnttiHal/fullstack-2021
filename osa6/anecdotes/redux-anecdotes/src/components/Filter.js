import { createFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'
const Filter = (props) => {
    
    const handleChange = (event) => {
        const input = event.target.value
        props.createFilter(input)
      
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const mapStateToProps = (state) => {
    return {
      filter: state.filter
    }
  }

  const mapDispatchToProps = {
    createFilter
  }
  
  const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
  export default ConnectedFilter