import * as React from 'react';
import { Component } from 'react';

export default class MyComponent extends Component<any, any> {
  render() {
    return <div>
      Wallaby.js{' ' + (this.props ? this.props.children : 'unexpected')}
    </div>;
  }
}
