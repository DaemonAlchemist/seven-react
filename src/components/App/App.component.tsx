import { Layout, Menu } from 'antd';
import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { NewGame } from '../NewGame';
import { Overview } from '../Overview';
import { SetBids } from '../SetBids';
import './App.scss';
import 'antd/dist/antd.css';

export const App = () => 
    <Layout className="app">
      <Layout.Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item>Andy's Awesome Seven Scoring App</Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<NewGame />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/set-bids/:roundId" element={<SetBids />} />
            </Routes>
        </BrowserRouter>
      </Layout.Content>
    </Layout>;
