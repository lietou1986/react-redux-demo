import React , { PropTypes } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Card } from 'antd';

import './index.less'

const propTypes = {

};

const contextTypes = {
  router: PropTypes.object.isRequired
};


@immutableRenderDecorator
class  SearchEngine extends React.Component {
 constructor (props) {
    super(props);
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className="page2-box" style={{ background: '#ECECEC', padding: '30px' }}>
        <h1>词库维护</h1>
      </div>
    )
  }
}


SearchEngine.contextTypes = contextTypes;

SearchEngine.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchEngine)