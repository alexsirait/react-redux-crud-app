import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteProduct,
	getProducts,
	productSelector,
} from '../features/productSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function ShowProduct() {
	const dispatch = useDispatch();
	const products = useSelector((state) => productSelector.selectAll(state));
	const nav = useNavigate();

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	const handlerDelete = async (id) => {
		await dispatch(deleteProduct(id));
		return nav('/');
	};
	return (
		<div className="box mt-5">
			<Link to="add" className="button is-link mb-3">
				Add
			</Link>
			<table className="table is-striped is-fullwidth">
				<thead>
					<tr>
						<th>#</th>
						<th>Title</th>
						<th>Price</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{product.title}</td>
							<td>{product.price}</td>
							<td>
								<Link
									to={`edit/${product.id}`}
									className="button is-warning is-small"
								>
									Edit
								</Link>
								<button
									onClick={() => handlerDelete(product.id)}
									className="button is-danger is-small"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
