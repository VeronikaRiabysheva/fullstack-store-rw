import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUsersStore } from '../stores/useUsersStore';


const SignUpPage = () => {

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

const {signup, loading} = useUsersStore();
	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
	};

	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-sky-500'>Создать аккаунт</h2>
			</motion.div>

			<motion.div
				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className='bg-zinc-950 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label htmlFor='name' className='block text-sm font-medium text-zinc-300'>
								Фамилия, Имя
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<User className='h-5 w-5 text-zinc-400' aria-hidden='true' />
								</div>
								<input
									id='name'
									type='text'
									required
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className='block w-full px-3 py-2 pl-10 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm
									 placeholder-zinc-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
									placeholder='Иванов Иван'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='email' className='block text-sm font-medium text-zinc-300'>
								Email
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-zinc-400' aria-hidden='true' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-zinc-700 border border-zinc-600 
									rounded-md shadow-sm
									 placeholder-zinc-400 focus:outline-none focus:ring-sky-500 
									 focus:border-sky-500 sm:text-sm'
									placeholder='ivanivanov@example.com'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='password' className='block text-sm font-medium text-zinc-300'>
								Пароль
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-zinc-400' aria-hidden='true' />
								</div>
								<input
									id='password'
									type='password'
									required
									value={formData.password}
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-zinc-700 border border-zinc-600 
									rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='confirmPassword' className='block text-sm font-medium text-zinc-300'>
								Подтвердите пароль
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-zinc-400' aria-hidden='true' />
								</div>
								<input
									id='confirmPassword'
									type='password'
									required
									value={formData.confirmPassword}
									onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-zinc-700 border
									 border-zinc-600 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>

						<button
							type='submit'
							className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-sky-600
							 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-sky-500 transition duration-150 ease-in-out disabled:opacity-50'
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Загрузка...
								</>
							) : (
								<>
									<UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
									Зарегистрироваться
								</>
							)}
						</button>
					</form>

					<p className='mt-8 text-center text-sm text-zinc-400'>
						Уже есть аккаунт?{" "}
						<Link to='/login' className='font-medium text-sky-400 hover:text-sky-300'>
							Войти <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};
export default SignUpPage;