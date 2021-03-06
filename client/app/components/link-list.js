import React from 'react';

export default class LinkList extends React.Component {
  render() {
    return (
      <ul className="media-list">
          {React.Children.map(this.props.children, function(child) {
            return (
              <li className="media">
                {child}
              <p />
              </li>
            )
          })}
        </ul>
    )
  }
}
