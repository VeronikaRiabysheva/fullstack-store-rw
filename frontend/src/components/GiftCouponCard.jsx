import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
	const [userInputCode, setUserInputCode] = useState("");
	const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCartStore();

	useEffect(() => {
		getMyCoupon();
	}, [getMyCoupon]);

	useEffect(() => {
		if (coupon) setUserInputCode(coupon.code);
	}, [coupon]);

	const handleApplyCoupon = () => {
		if (!userInputCode) return;
		applyCoupon(userInputCode);
	};

	const handleRemoveCoupon = async () => {
		await removeCoupon();
		setUserInputCode("");
	};

	return (
		<motion.div
			className='space-y-4 rounded-lg border border-zinc-700 bg-zinc-800 p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<div className='space-y-4'>
				<div>
					<label htmlFor='voucher' className='mb-2 block text-sm font-medium text-zinc-300'>
						Введите промокод или подарочную карту
					</label>
					<input
						type='text'
						id='voucher'
						className='block w-full rounded-lg border border-zinc-600 bg-zinc-700 
            p-2.5 text-sm text-white placeholder-zinc-400 focus:border-sky-500 
            focus:ring-sky-500'
						placeholder='Введите промокод'
						value={userInputCode}
						onChange={(e) => setUserInputCode(e.target.value)}
						required
					/>
				</div>

				<motion.button
					type='button'
					className='flex w-full items-center justify-center rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleApplyCoupon}
				>
					Использовать промокод
				</motion.button>
			</div>
			{isCouponApplied && coupon && (
				<div className='mt-4'>
					<h3 className='text-lg font-medium text-zinc-300'>Ваш промокод</h3>

					<p className='mt-2 text-sm text-zinc-400'>
						{coupon.code} - {coupon.discountPercentage}% 
					</p>

					<motion.button
						type='button'
						className='mt-2 flex w-full items-center justify-center rounded-lg bg-red-600 
            px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none
             focus:ring-4 focus:ring-red-300'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleRemoveCoupon}
					>
						Удалить промокод
					</motion.button>
				</div>
			)}

			{coupon && (
				<div className='mt-4'>
					<h3 className='text-lg font-medium text-zinc-300'>Доступные промокоды:</h3>
					<p className='mt-2 text-sm text-zinc-400'>
						{coupon.code} - {coupon.discountPercentage}% off
					</p>
				</div>
			)}
		</motion.div>
	);
};
export default GiftCouponCard;