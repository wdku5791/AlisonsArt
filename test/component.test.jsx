import React from 'react';
import renderer from 'react-test-renderer';

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name
    };
  }

  render() {
    return (
      <h1>My Name is {this.state.name}!</h1>
    );
  }
}

test('it should find the third test', () => {
  const component = renderer.create(
    <TestComponent name={'Winston'} />
  );

  const test = component.toJSON();
  expect(test).toMatchSnapshot();
});
