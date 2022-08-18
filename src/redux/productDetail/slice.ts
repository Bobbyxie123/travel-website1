import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import instance from '../../utils/axios/index'


interface ProductDetailState {
  loading: boolean; 
  error: string |null; 
  data: any

}

const initialState: ProductDetailState = {
  loading : true,
  error: null ,
  data: null,
}

export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  async (touristRouteId:string, thunkAPI) => {
    const {data} = await instance.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
    return data;
  }
)
// createAsyncThunk returns a standard Redux thunk action creator. 
// The thunk action creator function will have plain action creators 
// for the pending , fulfilled , and rejected cases attached as nested fields.



export const productDetailSlice =  createSlice({
  name:'productDetail' , 
  initialState,
  reducers:{
    pageOut:(state) => {
      state.data = null 
      state.error = null
      state.loading = true;
    }
  },
  //dont forget , here
  extraReducers: {
    [getProductDetail.pending.type]: (state) => { 
      state.loading = true;
    },
    [getProductDetail.fulfilled.type]:(state,action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getProductDetail.rejected.type]: (
      state,
      action: PayloadAction<string |null>
      ) => {
        state.loading = false;
        state.error = action.payload;
      }
  },
})


// extraReducers allows createSlice to respond to other action types besides the types it has generated. 
// As case reducers specified with extraReducers are meant to reference "external" actions, 
// they will not have actions generated in slice. actions