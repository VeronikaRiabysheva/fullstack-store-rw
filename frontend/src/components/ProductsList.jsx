import React from 'react'
import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";


function ProductsList() {

  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

	console.log("products", products);

return (
		<motion.div
			className='bg-zinc-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<table className=' min-w-full divide-y divide-zinc-700'>
				<thead className='bg-zinc-700'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider'
						>
							Товар
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider'
						>
							Стоимость
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider'
						>
							Категория
						</th>

						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider'
						>
							Избранное
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider'
						>
							Действия
						</th>
					</tr>
				</thead>

				<tbody className='bg-zinc-800 divide-y divide-zinc-700'>
					{products?.map((product) => (
						<tr key={product._id} className='hover:bg-zinc-700'>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='flex items-center'>
									<div className='flex-shrink-0 h-10 w-10'>
										<img
											className='h-10 w-10 rounded-full object-cover'
											src={product.image}
											alt={product.name}
										/>
									</div>
									<div className='ml-4'>
										<div className='text-sm font-medium text-white'>{product.name}</div>
									</div>
								</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-zinc-300'>${product.price.toFixed(2)}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-zinc-300'>{product.category}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<button
									onClick={() => toggleFeaturedProduct(product._id)}
									className={`p-1 rounded-full ${
										product.isFeatured ? "bg-yellow-400 text-zinc-900" : "bg-zinc-600 text-zinc-300"
									} hover:bg-yellow-500 transition-colors duration-200`}
								>
									<Star className='h-5 w-5' />
								</button>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<button
									onClick={() => deleteProduct(product._id)}
									className='text-red-400 hover:text-red-300'
								>
									<Trash className='h-5 w-5' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</motion.div>
	);
};


export default ProductsList