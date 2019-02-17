import { Layout, Menu } from 'antd';
import * as React from 'react';
import { Route } from 'react-router';
import { sevenReducer as seven } from "../../util/Seven.redux";
import { NewGame } from '../NewGame';
import { Overview } from "../Overview";
import { ReduxContainer } from "../ReduxContainer";
import { SetBids } from "../SetBids";
import './App.css';

export const App = () => 
  <ReduxContainer reducers={{seven}}>
    <Layout>
      <Layout.Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item>Seven</Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content>
        <Route exact path="/" component={NewGame} />
        <Route exact path="/overview" component={Overview} />
        <Route exact path="/set-bids/:roundId" component={SetBids} />
      </Layout.Content>
    </Layout>
  </ReduxContainer>;

export default App;
