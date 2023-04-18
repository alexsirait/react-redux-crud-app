import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
	'products/getProducts',
	async () => {
		const res = await axios.get('http://localhost:5000/products');
		return await res.data;
	}
);

export const saveProduct = createAsyncThunk(
	'products/saveProduct',
	async ({ title, price }) => {
		const res = await axios.post('http://localhost:5000/products', {
			title,
			price,
		});
		return await res.data;
	}
);

export const updateProduct = createAsyncThunk(
	'products/updateProduct',
	async ({ id, title, price }) => {
		const res = await axios.patch(`http://localhost:5000/products/${id}`, {
			title,
			price,
		});
		return await res.data;
	}
);

export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
	async (id) => {
		await axios.delete(`http://localhost:5000/products/${id}`);
		return id;
	}
);

const productEntity = createEntityAdapter({
	selectId: (p) => p.id,
});

const productSlice = createSlice({
	name: 'product',
	initialState: productEntity.getInitialState,
	extraReducers: {
		[getProducts.fulfilled]: (s, a) => {
			productEntity.setAll(s, a.payload);
		},
		[saveProduct.fulfilled]: (s, a) => {
			productEntity.addOne(s, a.payload);
		},
		[deleteProduct.fulfilled]: (s, a) => {
			productEntity.removeOne(s, a.payload);
		},
		[updateProduct.fulfilled]: (s, a) => {
			productEntity.updateOne(s, { id: a.payload.id, updates: a.payload });
		},
	},
});

export const productSelector = productEntity.getSelectors((s) => s.product);
export default productSlice.reducer;
