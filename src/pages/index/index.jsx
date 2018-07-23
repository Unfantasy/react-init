/**
 * @name: 首页
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd';
// import DocumentTitle from 'react-document-title';
import './index.scss';

// const alert = Modal.alert;

@connect(store => (store.user))
export default class extends Component {
  render() {
    return (
      <div>
        {/* <DocumentTitle title={this.props.title}> */}
        <h2 style={{ textAlign: 'center', lineHeight: '80px' }}>{this.props.welcome}</h2>
        <Carousel autoplay>
          <div className="carousel-img-box"><h3>2</h3></div>
          <div className="carousel-img-box"><h3>2</h3></div>
          <div className="carousel-img-box"><h3>3</h3></div>
          <div className="carousel-img-box"><h3>4</h3></div>
        </Carousel>
        <br />
        <br />
        <h4>更多组件请自行查看<a href="https://ant.design/docs/react/introduce-cn" rel="noopener noreferrer" target="_blank">antd官方文档</a></h4>
        {/* </DocumentTitle> */}
      </div>
    );
  }
}
