import React, { PropTypes } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Card, Timeline, Icon } from 'antd';

import './index.less'

const propTypes = {

};

const contextTypes = {
  router: PropTypes.object.isRequired
};


@immutableRenderDecorator
class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="page2-box" style={{ background: '#ECECEC', padding: '30px' }}>
        <Row>
          <Col span="25">
            <Card bordered={false}> <Timeline pending={<a href="#">See more</a>}>
              <Timeline.Item color="green">......</Timeline.Item>
              <Timeline.Item color="green">项目搭建</Timeline.Item>
              <Timeline.Item color="red">
                <p>working....</p>
                <p>working....</p>
                <p>working....</p>
              </Timeline.Item>
              <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red"> testing 2016-11-01</Timeline.Item>

              <Timeline.Item>
                <p>working....</p>
                <p>working....</p>
                <p>working....</p>
              </Timeline.Item>
            </Timeline></Card>
          </Col>
        </Row>
      </div>
    )
  }
}


Home.contextTypes = contextTypes;

Home.propTypes = propTypes;

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)