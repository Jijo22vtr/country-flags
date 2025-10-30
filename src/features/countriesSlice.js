import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const res = await fetch('https://restcountries.com/v2/all?fields=name,region,flag');
  if (!res.ok) throw new Error('Failed to fetch countries');
  const data = await res.json();
  return data.map(c => ({ name: c.name, region: c.region || 'Unknown', flag: c.flag }));
});

const countriesSlice = createSlice({
  name: 'countries',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCountries.pending, state => { state.status = 'loading'; })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default countriesSlice.reducer;
