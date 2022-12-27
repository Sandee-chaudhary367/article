import React, { Component } from 'react';
import { Slider, Typography } from 'antd';

const { Paragraph } = Typography;

class RGBPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      red: 0,
      green: 0,
      blue: 0
    };
  }

  render() {
    return (
      <div>
        <Paragraph>
          Red
        </Paragraph>
        <Slider
          min={0}
          max={255}
          onChange={red => {
            let { green, blue } = this.state;
            this.setState({red: red});
            return this.props.colorHandler(red, green, blue);
          }}
          value={typeof this.state.red === 'number' ? this.state.red : 0}
        />
        <Paragraph>
          Green
        </Paragraph>
        <Slider
          min={1}
          max={255}
          onChange={green => {
            let { red, blue } = this.state;
            this.setState({green: green});
            return this.props.colorHandler(red, green, blue);
          }}
          value={typeof this.state.green === 'number' ? this.state.green : 0}
        />
        <Paragraph>
          Blue
        </Paragraph>
        <Slider
          min={1}
          max={255}
          onChange={blue => {
            let { red, green } = this.state;
            this.setState({blue: blue});
            return this.props.colorHandler(red, green, blue);
          }}
          value={typeof this.state.blue === 'number' ? this.state.blue : 0}
        />
      </div>
    );
  }
}

export default RGBPicker;