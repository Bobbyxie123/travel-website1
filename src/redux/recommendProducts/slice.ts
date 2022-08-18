import instance from '../../utils/axios/index'
import { createSlice, createAsyncThunk,PayloadAction} from "@reduxjs/toolkit";


interface RecommendProductState {
  loading: boolean; 
  error: string | null; 
  productList:any ;
}


const initialState : RecommendProductState = {
  loading: true,
  error: null, 
  productList: [],
}

export const getRecommendProduct = createAsyncThunk(
  "recommendProduct/getRecommendProduct",
  async (thunkAPI) => {
    // type data = any
    const {data} = await instance.get('http://123.56.149.216:8080/api/productCollections');
    //you need to use 8080 to access, otherwise, will have a same origin policy problem 
    return data;
  }
) 
// createAsyncThunk 简化了这一过程——你只需要提供一个用作 action type 前缀的字符串
// 和一个 payload creator 回调即可，该回调执行实际的异步逻辑并返回包含结果的 promise。
// 作为回报，createAsyncThunk 将会为你提供一个 thunk，
// 它将根据你返回的 promise 以及你可以在 reducer 中处理的 action type 来调度正确的 action。
//createAsyncThunk will create three action automatically(pending, fullfilled,rejected)
//by extrareducer to use createAsyncThunk


export const recommendProductSlice = createSlice({
  name: 'recommendProduct',
  initialState,
  reducers:{},
  extraReducers:{
    [getRecommendProduct.pending.type]: (state) => {
      state.loading = true;
    },
    [getRecommendProduct.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.productList = action.payload;
    },
    [getRecommendProduct.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  }

  //指定额外的 reducer，做为全局性的reducers。
  //相当于一个钩子，每次触发dispatch，都会调用该方法，重新组合reducers。
  //在extraReducers内部，您可以处理已解决（fulfilled）和已拒绝（rejected）状态。

})
