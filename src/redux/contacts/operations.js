// export const getContacts = (state) => state.contacts.items;

// export const getIsLoading = (state) => state.contacts.loading;

// export const getError = (state) => state.contacts.error;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// =====================================================
import { instance } from "../auth/operation";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get("/contacts");
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkApi) => {
    try {
      const { data } = await instance.post("/contacts", contact);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkApi) => {
    try {
      const { data } = await instance.delete(`/contacts/${contactId}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// =====================================================
// axios.defaults.baseURL = "https://66d48f605b34bcb9ab3ee8a3.mockapi.io";

// export const fetchContacts = createAsyncThunk(
//   "contacts/fetchAll",
//   async (_, thunkApi) => {
//     try {
//       const { data } = await axios.get(`/contacts`);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );
// export const addContact = createAsyncThunk(
//   "contacts/addContact",
//   async (contact, thunkApi) => {
//     try {
//       const { data } = await axios.post(`/contacts`, contact);

//       return data; //
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message); //
//     }
//   }
// );

// export const deleteContact = createAsyncThunk(
//   "contacts/deleteContact",
//   async (contactId, thunkApi) => {
//     try {
//       // console.log(contactId);
//       const { data } = await axios.delete(`/contacts/${contactId}`);

//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );
