import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
// import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import React from 'react'


// const stripePromise = loadStripe(
// 	"pk_test_51KZYccCoOZF2UhtOwdXQl3vcizup20zqKqT9hVUIsVzsdBrhqbUI2fE0ZdEVLdZfeHjeyFXtqaNsyCJCmZWnjNZa00PzMAjlcL"
// );

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	// const handlePayment = async () => {
	// 	const stripe = await stripePromise;
	// 	const res = await axios.post("/payments/create-checkout-session", {
	// 		products: cart,
	// 		couponCode: coupon ? coupon.code : null,
	// 	});

	// 	const session = res.data;
	// 	const result = await stripe.redirectToCheckout({
	// 		sessionId: session.id,
	// 	});

	// 	if (result.error) {
	// 		console.error("Error:", result.error);
	// 	}
	// };

	return (
		<motion.div
			className='space-y-4 rounded-lg border border-zinc-700 bg-zinc-800 p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-sky-400'>Итого</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-zinc-300'>Итого</dt>
						<dd className='text-base font-medium text-white'>{formattedSubtotal} руб</dd>
					</dl>

					{savings > 0 && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-zinc-300'>Выгода</dt>
							<dd className='text-base font-medium text-sky-400'>-{formattedSavings}</dd>
						</dl>
					)}

					{coupon && isCouponApplied && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-zinc-300'>Промокод ({coupon.code})</dt>
							<dd className='text-base font-medium text-sky-400'>-{coupon.discountPercentage}%</dd>
						</dl>
					)}
					<dl className='flex items-center justify-between gap-4 border-t border-zinc-600 pt-2'>
						<dt className='text-base font-bold text-white'>Итого с учетом скидки</dt>
						<dd className='text-base font-bold text-sky-400'>{formattedTotal} руб</dd>
					</dl>
				</div>

				<motion.button
					className='flex w-full items-center justify-center rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					// onClick={handlePayment}
				>
					Оплатить
				</motion.button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-zinc-400'>или</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-sky-400 underline hover:text-sky-300 hover:no-underline'
					>
						Вернуться к покупкам
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};
export default OrderSummary;