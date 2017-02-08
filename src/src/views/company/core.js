import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table, Radio, Row, Col, Alert } from 'antd';
import { Link } from 'react-router';
import { fetchCompanyCore } from '../../actions/company'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import './core.less'

const propTypes = {
  data: PropTypes.array,
  numFound: PropTypes.number,
  message: PropTypes.string,
  loading: PropTypes.bool
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

class CompanyCore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: this.pagination,
      source: "query"
    }
    this.fetchData = this.fetchData.bind(this);
  }

  pagination = {
    total: this.props.numFound,
    current: 1,
    pageSize: 10,
    size: "default",
    showSizeChanger: true,
    showQuickJumper: true
  }

  fetchData() {
    const pager = this.state.pagination;
    this.props.fetchCompanyCore(this.state.source, pager.current, pager.pageSize);
  }

  componentDidMount() {
    this.fetchData();
  }

  handleReset() {
    this.props.form.resetFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    const pager = this.state.pagination;
    pager.current = 1;
    this.setState({
      pagination: pager,
    });
    this.fetchData();
  }

  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState({
      pagination: pager,
    });
    this.fetchData();
  }

  onChange(e) {
    this.setState({ source: e.target.value });
    this.fetchData();
  }


  render() {
    const columns = [{
      title: 'SolrAddress',
      width: '20%',
      dataIndex: 'solrAddress',
      render: (text, record) => (
        <Link to={{ pathname: '/company', query: { solrAddress: `${record.solrAddress}` } }}>{text}</Link>
      )
    }, {
      title: 'CoreName',
      width: '15%',
      dataIndex: 'coreName',
      render: (text, record) => (
        <Link to={{ pathname: '/company', query: { solrAddress: `${record.solrAddress}`, coreName: `${record.coreName}` } }}>{text}</Link>
      )
    }, {
      title: 'numFound',
      width: '20%',
      dataIndex: 'numFound'
    }, {
      title: 'CompanyCount',
      width: '10%',
      dataIndex: 'companyCount'
    }]
    return (
      <div>
        <div className="searchbar">
          <Row>
            <Col span={4}>
              <RadioGroup onChange={this.onChange.bind(this)} defaultValue="query" size="large">
                <RadioButton value="query">query</RadioButton>
                <RadioButton value="backup">backup</RadioButton>
              </RadioGroup> </Col>
            <Col span={20}><Alert message={this.props.message} type="success" showIcon /></Col>
          </Row>
        </div>
        <Table scroll={{ y: 500 }} onChange={this.handleTableChange.bind(this)} columns={columns} loading={this.props.loading} dataSource={this.props.data} size="middle" pagination={this.state.pagination} />
      </div>
    )
  }
}

CompanyCore.contextTypes = contextTypes;

CompanyCore.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    data: state.company.data,
    numFound: state.company.numFound,
    message: state.company.message,
    loading: state.company.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCompanyCore: bindActionCreators(fetchCompanyCore, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCore)