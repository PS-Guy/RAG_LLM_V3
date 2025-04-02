import { useEffect, useState } from 'react';
import { getConfig } from '../api';

function ConfigTab() {
  const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getConfig()
      .then((response) => setConfig(response.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Configuration Management</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : config ? (
        <pre>{JSON.stringify(config, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ConfigTab;