import React, { useState, useEffect } from "react";
import { fetchConfig, updateConfig } from "../api";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import SaveIcon from "@mui/icons-material/Save";

function ConfigTab() {
  const [config, setConfig] = useState({
    embedding_model: "",
    chunk_size: 0,
    chunk_overlap: 0,
    data_directory: "",
    vector_db_directory: "",
    collections: [],
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]:
        name === "chunk_size" || name === "chunk_overlap"
          ? parseInt(value)
          : value,
    }));
  };

  const handleFolderChange = (e, field) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const relativePath = files[0].webkitRelativePath;
      if (relativePath) {
        const folderPath = relativePath.substring(0, relativePath.indexOf("/"));
        setConfig((prevConfig) => ({
          ...prevConfig,
          [field]: folderPath,
        }));
      }
    }
  };

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
    <Box
      sx={{
        padding: 4,
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Box sx={{ maxWidth: 600, width: "100%", mt: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Configuration Management
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column" alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="Embedding Model"
                name="embedding_model"
                value={config.embedding_model}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Chunk Size"
                name="chunk_size"
                type="number"
                value={config.chunk_size}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Chunk Overlap"
                name="chunk_overlap"
                type="number"
                value={config.chunk_overlap}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mt: 2 }}
              />
            </Grid>

            {/* Data Directory Field */}
            <Grid item xs={12}>
              <TextField
                label="Data Directory (Full Path or Select)"
                name="data_directory"
                value={config.data_directory}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mt: 2 }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      component="label"
                      sx={{
                        color: "#87CEEB",
                        "&:hover": { color: "#4682B4" },
                      }}
                    >
                      <FolderIcon />
                      <input
                        type="file"
                        hidden
                        webkitdirectory="true"
                        onChange={(e) => handleFolderChange(e, "data_directory")}
                      />
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            {/* Vector DB Directory Field */}
            <Grid item xs={12}>
              <TextField
                label="Vector DB Directory (Full Path or Select)"
                name="vector_db_directory"
                value={config.vector_db_directory}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mt: 2 }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      component="label"
                      sx={{
                        color: "#87CEEB",
                        "&:hover": { color: "#4682B4" },
                      }}
                    >
                      <FolderIcon />
                      <input
                        type="file"
                        hidden
                        webkitdirectory="true"
                        onChange={(e) =>
                          handleFolderChange(e, "vector_db_directory")
                        }
                      />
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                sx={{ mt: 2 }}
              >
                Save Configuration
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default ConfigTab;
