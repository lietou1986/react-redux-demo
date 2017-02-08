import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table, Input, Button, Form } from 'antd';
const FormItem = Form.Item;
import { fetchCompany } from '../../actions/company'

import './index.less'

const propTypes = {
  data: PropTypes.array,
  numFound: PropTypes.number,
  message: PropTypes.string,
  loading: PropTypes.bool
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

class Company extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: this.pagination
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
    const data = this.props.form.getFieldsValue();
    this.props.fetchCompany(data.companyId, data.solrAddress, data.coreName, pager.current, pager.pageSize);
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

  render() {
    const columns = [{
      title: 'CompanyId',
      dataIndex: 'companyId'
    }, {
      title: 'SolrAddress',
      width: '20%',
      dataIndex: 'solrAddress',
    }, {
      title: 'CoreName',
      width: '15%',
      dataIndex: 'coreName'
    }, {
      title: 'CompanyStat',
      width: '20%',
      dataIndex: 'companyStat'
    }, {
      title: 'CreateTime',
      width: '20%',
      dataIndex: 'createTime'
    }, {
      title: 'SolrCount',
      width: '10%',
      dataIndex: 'solrCount'
    }]


    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form inline onSubmit={this.handleSubmit.bind(this)} className="searchbar">
          <FormItem>
            {getFieldDecorator('companyId')(
              <Input placeholder="CompanyId" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('solrAddress', { initialValue: this.props.location.query.solrAddress })(
              <Input placeholder="SolrAddress" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('coreName', { initialValue: this.props.location.query.coreName })(
              <Input placeholder="CoreName" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">搜索</Button>&nbsp;&nbsp;&nbsp;
            <Button onClick={this.handleReset.bind(this)}>重置</Button>
          </FormItem>
        </Form>
        <Table scroll={{ y: 500 }} onChange={this.handleTableChange.bind(this)} columns={columns} loading={this.props.loading} dataSource={this.props.data} size="middle" pagination={this.state.pagination} />
      </div>
    )
  }
}

Company.contextTypes = contextTypes;

Company.propTypes = propTypes;

Company = Form.create()(Company);

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
    fetchCompany: bindActionCreators(fetchCompany, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Company)