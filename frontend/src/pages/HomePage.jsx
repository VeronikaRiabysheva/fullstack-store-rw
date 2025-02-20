import React, { useEffect } from 'react'
import CategoryItem from '../components/CategoryItem';
import { useProductStore } from '../stores/useProductStore';
import FeaturedProducts from '../components/FeaturedProducts';

const categories = [
	{ href: "/джинсы", name: "Джинсы", imageUrl: "/jeans.jpg" },
	{ href: "/футболки", name: "Футболки", imageUrl: "/tshirts.jpg" },
	{ href: "/обувь", name: "Обувь", imageUrl: "/shoes.jpg" },
	{ href: "/очки", name: "Очки", imageUrl: "/glasses.jpg" },
	{ href: "/куртки", name: "Куртки", imageUrl: "/jackets.jpg" },
	{ href: "/костюмы", name: "Костюмы", imageUrl: "/suits.jpg" },
	{ href: "/сумки", name: "Сумки", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-sky-400 mb-4'>
					Категории товаров  
				</h1>
				<p className='text-center text-xl text-zinc-300 mb-12'>
        Откройте для себя уникальные товары и лучшие предложения!
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>
{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products}/>}
				
			</div>
		</div>
	);
};
export default HomePage;