import React, { Component } from 'react'
import Nav from '../../components/navbar/Nav'
import { getApiData } from '../../redux/action'
import { connect } from 'react-redux'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = { content: '' }
  }

  componentDidMount() {
    this.props.getApiData()
  }

  static getDerivedStateFromProps(props,state) {
    console.log(state.content,props)
    if(props.apiData !== state.content){
        
      return {
        content: props.apiData
      }
    }
  }

  render() {
    return (
      <>
        <Nav />
        <h1>About Page afsdf</h1>
        
        <div dangerouslySetInnerHTML={{__html: this.state.content}}></div>
      </>
    )
  }
}

const mapPropsToState = (state) => ({
  apiData: state.auth.apiData,
})

export default connect(mapPropsToState, { getApiData })(About)
