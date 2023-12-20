import { useEffect } from "react";
import ProductList from "./ProductList";

import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispactch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setProductParams } from "./catalogSlice";
import { Box, FormControl, Grid, Pagination, Paper, Typography } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";

export function Catalog() {

    const sortOptions = [
        { value: 'name', label: 'Aplhabetical' },
        { value: 'priceDesc', label: 'Price High To Low' },
        { value: 'price', label: 'Price Low To High' },
    ]
    //Initializing products state, with an array of objects
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status, filtersLoaded, brands, types, productParams } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispactch();

    useEffect(() => {
        if (!productsLoaded) {
            dispatch(fetchProductsAsync());
        }
    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) {
            dispatch(fetchFilters());
        }
    }, [filtersLoaded, dispatch])



    if (status.includes('pending')) return <LoadingComponent message="Loading Catalog..." />
    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Paper sx={{ mb: 3 }}>
                        <ProductSearch />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <FormControl component="fieldset">
                           <RadioButtonGroup 
                                selectedValue={productParams.orderBy}
                                options={sortOptions}
                                onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
                            />
                        </FormControl>
                    </Paper>

                    <Paper sx={{ mb: 2, p: 2 }}>
                        <CheckboxButtons 
                            items = {brands}
                            checkedItemsList = {productParams.brands}
                            onChange={(checkedBrands: string[]) => dispatch(setProductParams({brands: checkedBrands}))}
                        />
                    </Paper>

                    <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtons 
                            items = {types}
                            checkedItemsList = {productParams.types}
                            onChange={(checkedTypes: string[]) => dispatch(setProductParams({types: checkedTypes}))}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products} />
                </Grid>


                <Grid item xs={3}>
                </Grid>
                <Grid item xs={9}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography>
                            Displaying 1 to 6 of 20 items
                        </Typography>
                        <Pagination
                            color="secondary"
                            size="large"
                            count={4}
                            page={2}
                        />
                    </Box>
                </Grid>
            </Grid>

        </>
    )
}