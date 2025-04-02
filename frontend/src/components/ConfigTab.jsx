import React, { useState, useEffect } from "react";
import { fetchConfig, updateConfig } from "../api";

function ConfigTab() {
  const [config, setConfig] = useState({
    embedding_model: "",
    chunk_size: 0,
    chunk_overlap: 0,
    data_directory: "",
    vector_db_directory: "",
    collections: [],
  });

  // Load config when component mounts
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await fetchConfig();
        setConfig(data);
      } catch (error) {
        console.error("Error loading config:", error);
      }
    };
    loadConfig();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: name === "chunk_size" || name === "chunk_overlap" ? parseInt(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateConfig(config);
      alert("Configuration saved successfully!");
    } catch (error) {
      console.error("Error saving config:", error);
      alert("Failed to save configuration.");
    }
  };

  return (
    <div>
      <h2>Configuration Management</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Embedding Model:</label>
          <input
            type="text"
            name="embedding_model"
            value={config.embedding_model}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Chunk Size:</label>
          <input
            type="number"
            name="chunk_size"
            value={config.chunk_size}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Chunk Overlap:</label>
          <input
            type="number"
            name="chunk_overlap"
            value={config.chunk_overlap}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Data Directory:</label>
          <input
            type="text"
            name="data_directory"
            value={config.data_directory}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Vector DB Directory:</label>
          <input
            type="text"
            name="vector_db_directory"
            value={config.vector_db_directory}
            onChange={handleChange}
          />
        </div>
        {/* Collections could be a multi-select or text input for simplicity */}
        <div>
          <label>Collections (comma-separated):</label>
          <input
            type="text"
            name="collections"
            value={config.collections.join(",")}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                collections: e.target.value.split(",").map((c) => c.trim()),
              }))
            }
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ConfigTab;