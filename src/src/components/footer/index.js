import React from 'react'
import { BackTop } from 'antd'

import './index.less'

export default class Footer extends React.Component {
  constructor() {
    super()
  }

  render() {

    return (
      <div className="ant-layout-footer">
        <BackTop/>
        智联招聘网版权所有 © 1997-2016
      </div>
    )
  }
}
