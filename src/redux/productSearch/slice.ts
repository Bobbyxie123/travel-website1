import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../utils/axios/index";

interface ProductSearchState {
    loading: boolean;
    error: string | null;
    data: any;
    pagination: any;
}

const initialState: ProductSearchState = {
    loading: true,
    error: null,
    data: null,
    pagination: null,
};


export const searchProduct = createAsyncThunk(
    "productSearch/searchProduct",
    async (
        paramaters: {
            keywords: string;
            nextPage: number | string;
            pageSize: number | string;
        },
        thunkAPI
    ) => {
        let url = `/api/touristRoutes?pageNumber=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`;

        if (paramaters.keywords) {
            url += `&keyword=${paramaters.keywords}`;
        }
        const response = await instance.get(url);
        return {
            data: response.data,
            pagination: JSON.parse(response.headers["x-pagination"]),
        };
    }
);

export const productSearchSlice = createSlice({
    name: "productSearch",
    initialState,
    reducers: {},
    extraReducers: {
        [searchProduct.pending.type]: (state) => {
            state.loading = true
        },
        [searchProduct.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.pagination = action.payload.pagination; // gain the data from the payload
            state.data = action.payload.data;
            state.error = null;
        },
        [searchProduct.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        }

    }
})