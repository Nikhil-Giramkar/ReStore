import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/Product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../app/models/Pagination";

const productsAdapter = createEntityAdapter<Product>();

interface CatalogState {
    productsLoaded: boolean,
    filtersLoaded: boolean,
    status: string,
    brands: string[],
    types: string[],
    productParams: ProductParams,
    metaData: MetaData | null
}


function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    //The name of key should match the argument in Backend Code
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);
    if (productParams.searchTerm)
        params.append('searchTerm', productParams.searchTerm);
    if (productParams.brands.length > 0)
        params.append('brands', productParams.brands.toString());
    if (productParams.types.length > 0)
        params.append('types', productParams.types.toString());

    return params;
}


export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        try {
            const params = getAxiosParams(thunkAPI.getState().catalog.productParams);

            const response =  await agent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }

)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.details(productId);
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }

)

export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return agent.Catalog.fetchFilters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message })
        }
    }
)

function initialProductParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        brands: [],
        types: []
    }

}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        types: [],
        productParams: initialProductParams(),
        metaData: null
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false, //This will force the useEffect in catalogSlice to fetch products again as per changed params
                state.productParams = {
                    ...state.productParams,
                    ...action.payload,
                    pageNumber: 1
                };
        },

        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {
                ...state.productParams,
                ...action.payload,
            };
        },

        resetProductParams: (state) => {
            state.productParams = initialProductParams()
        },

        setMetaData: (state, action) => {
            state.metaData = action.payload
        },
    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });

        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });

        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action)
            state.status = 'idle';
        });

        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });

        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });

        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });

        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });

        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
            state.status = 'idle';
        });

        builder.addCase(fetchFilters.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);

export const { setProductParams, resetProductParams, setMetaData, setPageNumber } = catalogSlice.actions;

