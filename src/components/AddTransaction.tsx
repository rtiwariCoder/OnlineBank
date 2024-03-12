import React, { useState } from "react";
import { Button, TextField, MenuItem, Box } from "@mui/material";

interface Transaction {
  type: string;
  amount: string;
  description: string;
  closingBalance?: string;
  date: string;
}

interface AddTransactionProps {
  onSave: (transaction: Transaction) => void;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ onSave }) => {
  const [type, setType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const transaction: Transaction = {
      type,
      amount,
      description,
      closingBalance: "",
      date: new Date().toISOString().split('T')[0],
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }

      onSave(transaction);

      setType("");
      setAmount("");
      setDescription("");
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        select
        label="Transaction Type"
        value={type}
        onChange={(e: any) => setType(e.target.value)}
        fullWidth
        required
        margin="normal"
      >
        <MenuItem value="Credit">Credit</MenuItem>
        <MenuItem value="Debit">Debit</MenuItem>
      </TextField>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e: any) => setAmount(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e: any) => setDescription(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Save Transaction
      </Button>
    </Box>
  );
};

export default AddTransaction;
