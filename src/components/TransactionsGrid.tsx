import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface Transaction {
  date: string;
  description: string;
  type: "Credit" | "Debit";
  amount: number;
  runningBalance: number;
}

interface TransactionsGridProps {
  refreshGrid: boolean;
  setRefreshGrid: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransactionsGrid: React.FC<TransactionsGridProps> = ({
  refreshGrid,
  setRefreshGrid,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [runningBalance, setRunningBalance] = useState<number>(0);

  useEffect(() => {
    fetchTransactions();
  }, [refreshGrid]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();


      let balance = 0;
      const updatedTransactions = data.map((transaction: Transaction) => {
        if (transaction.type === "Credit") {
          console.log("balance : " + typeof +balance)
          console.log(typeof +transaction.amount)
          balance += +transaction.amount;
        } else if (transaction.type === "Debit") {
          balance -= transaction.amount;
        }

        return {
          ...transaction,
          runningBalance: balance,
        };
      });

      setTransactions(updatedTransactions);
      setRunningBalance(balance);
      setRefreshGrid(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Credit</TableCell>
            <TableCell align="right">Debit</TableCell>
            <TableCell align="right">Running Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right">
                {row.type === "Credit" ? row.amount : 0}
              </TableCell>
              <TableCell align="right">
                {row.type === "Debit" ? row.amount : 0}
              </TableCell>
              <TableCell align="right">{row.runningBalance}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} align="right">
              <strong>Total Running Balance:</strong>
            </TableCell>
            <TableCell align="right">
              <strong>{runningBalance}</strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsGrid;

