import { Badge, Layout, Menu } from 'antd';
import * as React from 'react';
import { ReduxContainer } from "../ReduxContainer";
import './App.css';

export const App = () => 
  <ReduxContainer>
    <Layout>
      <Layout.Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item><Badge count={7} /></Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content>
        Content goes here.
      </Layout.Content>
    </Layout>
  </ReduxContainer>;

export default App;
