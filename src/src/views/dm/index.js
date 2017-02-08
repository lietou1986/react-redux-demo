import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table, Input, Button, Form, Checkbox } from 'antd';
const FormItem = Form.Item;
import { fetchPosition } from '../../actions/dm'

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

class DaoMian extends React.Component {
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
    this.props.fetchPosition(data.positionId, data.positionName, data.exclude, pager.current, pager.pageSize);
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
      title: '职位ID',
      width: '220px',
      fixed: 'left',
      dataIndex: 'positionId'
    }, {
      title: '职位名称',
      width: '30%',
      dataIndex: 'positionName',
      render: (text, record) => (
        <a href={`http://jobs.zhaopin.com/${record.positionId}.htm`} target="_blank">{text}</a>
      )
    }, {
      title: '发布城市',
      width: '10%',
      dataIndex: 'city'
    }, {
      title: '发布时间',
      width: '15%',
      dataIndex: 'createTime'
    }, {
      title: '套餐余量',
      width: '20%',
      dataIndex: 'packageCount'
    }]

    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form inline onSubmit={this.handleSubmit.bind(this)} className="searchbar">
          <FormItem>
            {getFieldDecorator('positionId')(
              <Input placeholder="职位ID" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('positionName')(
              <Input placeholder="职位名称" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('exclude')(
              <Checkbox defaultChecked={true}>排除测试职位</Checkbox>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">搜索</Button>&nbsp;&nbsp;&nbsp;
            <Button onClick={this.handleReset.bind(this)}>重置</Button>
          </FormItem>
        </Form>
        <Table scroll={{ y: 500, x: 220 }} onChange={this.handleTableChange.bind(this)} columns={columns} loading={this.props.loading} dataSource={this.props.data} size="middle" pagination={this.state.pagination} />
      </div>
    )
  }
}

DaoMian.contextTypes = contextTypes;

DaoMian.propTypes = propTypes;

DaoMian = Form.create()(DaoMian);

function mapStateToProps(state) {
  return {
    data: state.dm.data,
    numFound: state.dm.numFound,
    message: state.dm.message,
    loading: state.dm.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosition: bindActionCreators(fetchPosition, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaoMian)