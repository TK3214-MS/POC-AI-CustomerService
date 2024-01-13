// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import '../styles/HomePage.css';
import { ChatDetailsData, getChatDetails } from '../utils/ChatClientDetails';
import { clearCacheHistory } from '../utils/CacheHistoryDetails';

/**
 * HomeScreen has two states:
 * 1. Showing start chat button
 * 2. Showing spinner after clicking start chat
 *
 * @param props
 */
export default (): JSX.Element => {
  const [chatData, setChatData] = useState<ChatDetailsData>();
  useEffect(() => {
    getChatDetails()
      .then((apiData) => {
        setChatData(apiData);
        localStorage.setItem('chatThreadId', apiData.threadId);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  async function handleClearHistory() {
    const response = await clearCacheHistory();
    if (response) {
      alert('Cache history cleared.');
    } else {
      alert('failed.');
    }
  }

  const displayHomeScreen = (): JSX.Element => {
    return (
      <div className="home-container">
        <nav>
          <div className="logo">
            <b>Contoso</b> Energy
          </div>
          <div className="menu-items">
            <a href="#">メニュー</a>
            <a href="#">料金の支払</a>
            <a href="#">障害情報</a>
            <a href="#">サポート</a>
            <a href="#" className="search">
              検索
            </a>
          </div>
          <div className="right-items">
            <a href="#" className="language">
              日本語
            </a>
            <a href="#" className="account">
              アカウント
            </a>
            <a className="clear-history-btn" onClick={handleClearHistory}>
              履歴のクリア
            </a>
          </div>
        </nav>
        <div className="content">
          <p className="title">節約をお考えですか？ソーラーパネルはいかがでしょうか？</p>
          <hr />
          <p className="subtitle">節税効果と他の特典をご用意しています。</p>
          <p className="subtitle">詳細については AI カスタマーサポートと会話しましょう。</p>
        </div>
        {chatData && <Chat {...chatData} userId={chatData.identity} />}
      </div>
    );
  };

  return displayHomeScreen();
};
