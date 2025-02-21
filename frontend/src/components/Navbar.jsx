import React from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUsersStore } from "../stores/useUsersStore";
import { useCartStore } from "../stores/useCartStore";


const Navbar = () => {
    const {user, logout} = useUsersStore()
    const isAdmin = user?.role === "admin"
const {cart} = useCartStore()
	return (
		<header className='fixed top-0 left-0 w-full bg-zinc-950 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all 
        duration-300 border-b border-sky-400'>
			<div className='container mx-auto px-4 py-3'>
				<div className='flex flex-wrap justify-between items-center'>
					<Link to='/' className='text-2xl font-bold text-sky-400  items-center space-x-2 flex'>
						Apex
					</Link>

					<nav className='flex flex-wrap items-center gap-4'>
						<Link
							to={"/"}
							className='text-zinc-300 hover:text-sky-400 transition duration-300
					 ease-in-out'
						>
							Главная
						</Link>
						{user && (
							<Link
								to={"/cart"}
								className='relative group text-zinc-300 hover:text-sky-400 transition duration-300 
							ease-in-out'
							>
								<ShoppingCart className='inline-block mr-1 group-hover:text-sky-400' size={20} />
								<span className='hidden sm:inline'>Корзина</span>
								
									{cart.length > 0 && <span
										className='absolute -top-2 -left-2 bg-sky-500 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-sky-400 transition duration-300 ease-in-out'
									>
										{cart.length}
									</span>}
							
							</Link>
						)}
						{isAdmin && (
							<Link
								className='bg-sky-800 hover:bg-sky-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center'
								to={"/secret-dashboard"}
							>
								<Lock className='inline-block mr-1' size={18} />
								<span className='hidden sm:inline'>Статистика</span>
							</Link>
						)}

						{user ? (
							<button
								className='bg-zinc-700 hover:bg-zinc-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out'
						onClick={logout}
							>
								
								<LogOut size={18} />
								<span className='hidden sm:inline ml-2'>Выйти</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									className='bg-sky-600 hover:bg-sky-700 text-white py-2 px-2 
									rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<UserPlus className='mr-2' size={18} />
									Зарегистрироваться
								</Link>
								<Link
									to={"/login"}
									className='bg-zinc-700 hover:bg-zinc-600 text-white py-2 px-2 
									rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<LogIn className='mr-2' size={18} />
									Войти
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};
export default Navbar;
