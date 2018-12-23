import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import './App.css';

export const App = () => 
  <Layout>
    <Layout.Header>
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
        <Menu.Item>Seven</Menu.Item>
      </Menu>
    </Layout.Header>
    <Layout.Content>
      Content goes here.
    </Layout.Content>
  </Layout>;

export default App;
