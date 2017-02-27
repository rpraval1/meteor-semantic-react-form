import React, { Component } from 'react'
import { Container, Icon, Menu, Segment } from 'semantic-ui-react'

class AddNote extends Component {

  constructor(props){
    super(props)

    this.state = {
      activeItem: '',
      loadColor: false
    }
  }
  handleItemClick(e, { name }){

    const {loadColor} = this.state

    if(loadColor) {
      this.setState({
        activeItem: name,
        loadColor: false  })
    }
    else{
    this.setState({
      activeItem: name,
      loadColor: true  })
    }
  }

  getNoteColor(noteInputColor){
    //this.props.getNoteColorValue(noteInputColor)
    const {boardId} = this.props
    Meteor.call('notes.insert', boardId, noteInputColor, (error, result) => {
      if(error){
        console.log(error)
      }
    })
  }

  renderColor() {
    const {loadColor} = this.state
    const colors = ['pink', 'teal', 'olive', 'yellow']

    if(loadColor){
      return (
        colors.map(color => (
          <Menu.Item key={color}>
            <Segment inverted key={color} color={color} onClick={this.getNoteColor.bind(this,color)} ></Segment>
          </Menu.Item>
        ))
      )
    }
  }

  render(){

    const {activeItem, loadColor} = this.state
    const {boardId} = this.props
    return (
        <Container fluid className='btn-note'>
          <Menu inverted borderless className='addNote'>
            <Menu.Item key='plus' name='plus' active={activeItem === 'plus'} onClick={this.handleItemClick.bind(this)} >
              {loadColor ? <Icon name='minus'></Icon> : <Icon name='plus'></Icon>}
            </Menu.Item>
            {this.renderColor()}
          </Menu>
        </Container>
    );
  }
}

export default AddNote;
