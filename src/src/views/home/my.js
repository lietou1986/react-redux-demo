import React, { PropTypes } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Card } from 'antd';

import './my.less'

const propTypes = {

};

const contextTypes = {
    router: PropTypes.object.isRequired
};


@immutableRenderDecorator
class My extends React.Component {
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
                        <Card bordered={false}>我的信息</Card>
                    </Col>
                </Row>
            </div>
        )
    }
}


My.contextTypes = contextTypes;

My.propTypes = propTypes;

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(My)