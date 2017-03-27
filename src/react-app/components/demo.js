import React, { Component } from 'react'
import jss from 'jss'
import preset from 'jss-preset-default'
import injectSheet from 'react-jss'
import preJSS from 'prejss'

const styles = preJSS`
  button {
    color: blue;
  }
`

// One time setup with default plugins and settings.
jss.setup(preset())

class Demo extends Component {

  render() {
    const { button } = this.props.classes
    return (
      <button className={button}>
        Action
      </button>
    )
  }

}

export default injectSheet(styles)(Demo)
