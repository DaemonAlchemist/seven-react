import { Layout } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { NewGame } from '../NewGame';
import { Overview } from '../Overview';
import { SetBids } from '../SetBids';
import './App.scss';

export const App = () => 
    <Layout className="app">
      <Layout.Header>
        <ul className="ant-menu ant-menu-horizontal ant-menu-dark">
            <li className="ant-menu-item">
                Andy's Awesome Seven Scoring App
            </li>
        </ul>
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
