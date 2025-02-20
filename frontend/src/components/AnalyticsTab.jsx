import React from 'react'

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, BadgeRussianRuble } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const response = await axios.get("/analytics");
				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(response.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
				<AnalyticsCard
					title='Кол-во пользователей'
					value={analyticsData.users.toLocaleString()}
					icon={Users}
					color='from-sky-500 to-blue-700'
				/>
				<AnalyticsCard
					title='Кол-во товаров'
					value={analyticsData.products.toLocaleString()}
					icon={Package}
					color='from-sky-500 to-green-700'
				/>
				<AnalyticsCard
					title='Кол-во продаж'
					value={analyticsData.totalSales.toLocaleString()}
					icon={ShoppingCart}
					color='from-sky-500 to-cyan-700'
				/>
				<AnalyticsCard
					title='Общая прибыль'
					value={`${analyticsData.totalRevenue.toLocaleString()}`}
					icon={BadgeRussianRuble}
					color='from-sky-500 to-lime-700'
				/>
			</div>
			<motion.div
				className='bg-zinc-800/60 rounded-lg p-6 shadow-lg'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.25 }}
			>
				<ResponsiveContainer width='100%' height={400}>
					<LineChart data={dailySalesData}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' stroke='#D1D5DB' />
						<YAxis yAxisId='left' stroke='#D1D5DB' />
						<YAxis yAxisId='right' orientation='right' stroke='#D1D5DB' />
						<Tooltip />
						<Legend />
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='sales'
							stroke='#10B981'
							activeDot={{ r: 8 }}
							name='Продажи'
						/>
						<Line
							yAxisId='right'
							type='monotone'
							dataKey='revenue'
							stroke='#3B82F6'
							activeDot={{ r: 8 }}
							name='Прибыль'
						/>
					</LineChart>
				</ResponsiveContainer>
			</motion.div>
		</div>
	);
};
export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
	<motion.div
		className={`bg-zinc-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex justify-between items-center'>
			<div className='z-10'>
				<p className='text-sky-300 text-sm mb-1 font-semibold'>{title}</p>
				<h3 className='text-white text-3xl font-bold'>{value}</h3>
			</div>
		</div>
		<div className='absolute inset-0 bg-gradient-to-br from-sky-600 to-sky-900 opacity-30' />
		<div className='absolute -bottom-4 -right-4 text-sky-800 opacity-50'>
			<Icon className='h-32 w-32' />
		</div>
	</motion.div>)