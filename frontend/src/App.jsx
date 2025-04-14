import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ConfigTab from './components/ConfigTab';
import IngestionTab from './components/IngestionTab';
import QueryTab from './components/QueryTab';
import ChatTab from './components/ChatTab';

function App() {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);

  const tabListStyle = {
    display: 'flex',
    borderBottom: `2px solid ${theme.palette.divider}`,
    paddingLeft: 0,
    listStyle: 'none',
  };

  const tabStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'none',
    borderBottom: '2px solid transparent',
    background: 'none',
    color: theme.palette.mode === 'dark' ? '#ccc' : '#333',
    fontSize: '16px',
    fontWeight: 500,
    marginRight: '10px',
  };

  const activeTabStyle = {
    ...tabStyle,
    borderBottom: `3px solid ${theme.palette.mode === 'dark' ? '#FFA500' : '#FF8C00'}`,
    color: theme.palette.mode === 'dark' ? '#FFA500' : '#FF8C00',
    fontWeight: 600,
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>RAG LLM App</h1>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList style={tabListStyle}>
          <Tab style={tabIndex === 0 ? activeTabStyle : tabStyle}>Config</Tab>
          <Tab style={tabIndex === 1 ? activeTabStyle : tabStyle}>Ingestion</Tab>
          <Tab style={tabIndex === 2 ? activeTabStyle : tabStyle}>Query</Tab>
          <Tab style={tabIndex === 3 ? activeTabStyle : tabStyle}>Chat</Tab>
        </TabList>
        <TabPanel><ConfigTab /></TabPanel>
        <TabPanel><IngestionTab /></TabPanel>
        <TabPanel><QueryTab /></TabPanel>
        <TabPanel><ChatTab /></TabPanel>
      </Tabs>
    </div>
  );
}

export default App;