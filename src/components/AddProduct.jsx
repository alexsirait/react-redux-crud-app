import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveProduct } from '../features/productSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function AddProduct() {
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const dispatch = useDispatch();
	const nav = useNavigate();

	const handlerSubmit = async (e) => {
		e.preventDefault();
		await dispatch(saveProduct({ title, price }));
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
				<button className="button is-success">Submit</button>
			</form>
		</div>
	);
}
