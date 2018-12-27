import { Layout, Menu } from 'antd';
import * as React from 'react';
import {Route} from 'react-router';
import {NewGame} from '../NewGame';
import {Overview} from "../Overview";
import {RecordResults} from "../RecordResults";
import { ReduxContainer } from "../ReduxContainer";
import {SetBids} from "../SetBids";
import './App.css';

export const App = () => 
  <ReduxContainer>
    <Layout>
      <Layout.Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item>Seven</Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content>
        <Route exact path="/" component={NewGame} />
        <Route exact path="/overview" component={Overview} />
        <Route exact path="/set-bids/:round" component={SetBids} />
        <Route exact path="/record-results/:round" component={RecordResults} />
      </Layout.Content>
    </Layout>
  </ReduxContainer>;

export default App;