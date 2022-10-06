import './App.css';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="App">
      </div>
    </MantineProvider>
  );
}

export default App;
