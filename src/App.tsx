import React, { useState } from "react";
import AddTransaction from "./components/AddTransaction";
import TransactionsGrid from "./components/TransactionsGrid";
import { Button, Container, Modal, Box } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const App: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [refreshGrid, setRefreshGrid] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSaveTransaction = () => {
    setRefreshGrid(true); // Trigger a refresh of the TransactionsGrid
    handleClose(); // Close the modal after saving
  };

  return (
    <Container maxWidth="md">
      <h1>Office Transactions</h1>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        Add Transaction
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddTransaction onSave={handleSaveTransaction} />
        </Box>
      </Modal>
      <TransactionsGrid
        refreshGrid={refreshGrid}
        setRefreshGrid={setRefreshGrid}
      />
    </Container>
  );
};

export default App;
