import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteProduct,
	getProducts,
	productSelector,
	updateProduct,
} from '../features/productSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function AddProduct() {
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const dispatch = useDispatch();
	const nav = useNavigate();
	const { id } = useParams();
	const productData = useSelector((state) =>
		productSelector.selectById(state, id)
	);

	useEffect(() => {
		dispatch(getProducts);
	}, [dispatch]);

	useEffect(() => {
		if (productData) {
			setTitle(productData.title);
			setPrice(productData.price);
		}
	}, [productData]);

	const handlerSubmit = async (e) => {
		e.preventDefault();
		await dispatch(updateProduct({ id, title, price }));
		nav('/');
	};

	const handlerDelete = async () => {
		await dispatch(deleteProduct(id));
		nav('/');
	};

	return (
		<div className="box mt-5">
			<Link to="/" className="button is-link mb-3">
				Table
			</Link>
			<form onSubmit={handlerSubmit}>
				<div className="field">
					<label className="label">Title</label>
					<div className="control">
						<input
							className="input"
							type="text"
							placeholder="Title .."
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Price</label>
					<div className="control">
						<input
							className="input"
							type="text"
							placeholder="Price .."
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>
				</div>
				<button className="button is-success">Update</button>
				<button onClick={() => handlerDelete()} className="button is-danger">
					Delete
				</button>
			</form>
		</div>
	);
}
