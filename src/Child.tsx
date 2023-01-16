import React, { Component } from 'react'

export default class Child extends Component {
  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    console.log('child Rerender');
  }
  render() {
    return (
      <div>Child</div>
    )
  }
}
