import React from 'react'

import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUsersStore } from "../stores/useUsersStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useUsersStore();
	const { addToCart } = useCartStore();
	const handleAddToCart = () => {
		if (!user) {
			toast.error("Войдите в аккаунт, чтобы добавить товар в корзину", { id: "login" });
			return;
		} else {
			// add to cart
			addToCart(product);
		}
	};

	return (
		<div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-zinc-700 shadow-lg'>
			<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
				<img className='object-cover w-full' src={product.image} alt='product image' />
				<div className='absolute inset-0 bg-opacity-20' />
			</div>

			<div className='mt-4 px-5 pb-5'>
				<h5 className='text-xl font-semibold tracking-tight text-white'>{product.name}</h5>
				<div className='mt-2 mb-5 flex items-center justify-between'>
					<p>
						<span className='text-3xl font-bold text-sky-400'>{product.price} руб</span>
					</p>
				</div>
				<button
					className='flex items-center justify-center rounded-lg bg-sky-600 px-5 py-2.5 text-center text-sm font-medium
					 text-white hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300'
					onClick={handleAddToCart}
				>
					<ShoppingCart size={22} className='mr-2' />
					Добавить в корзину
				</button>
			</div>
		</div>
	);
};
export default ProductCard;