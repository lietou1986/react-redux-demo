import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Radio, Row, Col, Card } from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import './index.less'

const propTypes = {

};

const contextTypes = {
  router: PropTypes.object.isRequired
};

class RedisMonitor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  onChange(e) {
    console.log(e.target.value);
  }

  render() {
    return (
      <div className="page2-box" style={{ background: '#ECECEC', padding: '30px' }}>
        <Row>
          <Col span={20}>
            <RadioGroup onChange={this.onChange} defaultValue="applyline" size="large">
              <RadioButton value="applyline">applyline</RadioButton>
              <RadioButton value="sou">sou</RadioButton>
              <RadioButton value="recom">recom</RadioButton>
              <RadioButton value="applyids">applyids</RadioButton>
              <RadioButton value="hotword">hotword</RadioButton>
            </RadioGroup> </Col>
        </Row>
      </div>
    )
  }
}


RedisMonitor.contextTypes = contextTypes;

RedisMonitor.propTypes = propTypes;

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedisMonitor)