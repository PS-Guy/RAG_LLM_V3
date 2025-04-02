import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Default styling
import ConfigTab from './components/ConfigTab';
import IngestionTab from './components/IngestionTab';
import QueryTab from './components/QueryTab';
import ChatTab from './components/ChatTab';

function App() {
  return (
    <div className="App">
      <h1>RAG LLM App</h1>
      <Tabs>
        <TabList>
          <Tab>Config</Tab>
          <Tab>Ingestion</Tab>
          <Tab>Query</Tab>
          <Tab>Chat</Tab>
        </TabList>
        <TabPanel>
          <ConfigTab />
        </TabPanel>
        <TabPanel>
          <IngestionTab />
        </TabPanel>
        <TabPanel>
          <QueryTab />
        </TabPanel>
        <TabPanel>
          <ChatTab />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;