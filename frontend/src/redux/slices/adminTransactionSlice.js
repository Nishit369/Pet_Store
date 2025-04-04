import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all transactions (admin only)
export const fetchAdminTransactions = createAsyncThunk(
  "adminTransactions/fetchAdminTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Generate PDF for a transaction
export const generateTransactionPDF = createAsyncThunk(
  "adminTransactions/generateTransactionPDF",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}/pdf`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          responseType: 'blob',
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminTransactionSlice = createSlice({
  name: "adminTransactions",
  initialState: {
    transactions: [],
    totalTransactions: 0,
    totalSales: 0,
    loading: false,
    error: null,
    generatingPdf: false,
  },
  reducers: {
    setPdfGenerating: (state, action) => {
      state.generatingPdf = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all transactions
      .addCase(fetchAdminTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.totalTransactions = action.payload.length;

        // calculate total sales
        const totalSales = action.payload.reduce((acc, transaction) => {
          return acc + transaction.totalPrice;
        }, 0);
        state.totalSales = totalSales;
      })
      .addCase(fetchAdminTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch transactions";
      })
      // Generate PDF
      .addCase(generateTransactionPDF.pending, (state) => {
        state.generatingPdf = true;
      })
      .addCase(generateTransactionPDF.fulfilled, (state) => {
        state.generatingPdf = false;
      })
      .addCase(generateTransactionPDF.rejected, (state, action) => {
        state.generatingPdf = false;
        state.error = action.payload?.message || "Failed to generate PDF";
      });
  },
});

export const { setPdfGenerating } = adminTransactionSlice.actions;
export default adminTransactionSlice.reducer;