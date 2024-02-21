import { useContext } from 'react';
// import stemImage from '../assets/presentation.jpg';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';
import { LocalStorage } from '../hooks/LocalStorage';
import Swal from 'sweetalert2';
const Home = () => {
	const navigate = useNavigate();
	const { user, setUser, setToken } = useContext(AuthContext);

	const handelLogOut = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: `You will be log out`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Logout!',
		}).then((result) => {
			if (result.isConfirmed) {
				LocalStorage.remove('user');
				LocalStorage.remove('token');
				setUser(null);
				setToken(null);
				navigate('login');
			}
		});
	};
	return (
		<div className="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover">
			{/* <div className="absolute bg-black opacity-60 inset-0 z-0"></div> */}
			<div className="z-10 text-xl space-y-2">
				<h2>WelCome</h2>
				{user ? (
					<>
						<h2>{user?.name}</h2>
						<br />
						<Link to="/dashboard">My dashboard</Link>
						<br />
						<Link to="/my-quiz">My quize</Link>
						<br />
						<button className="text-red-500" onClick={handelLogOut}>
							Logout
						</button>
					</>
				) : (
					<>
						<Link to="/register">Register</Link>
						<br />
						<Link to="/login">Login</Link>
						<br />
					</>
				)}
			</div>
		</div>
	);
};

export default Home;
