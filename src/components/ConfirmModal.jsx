/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const ConfirmModal = ({ show, setShow, user, setUser }) => {
	const navigate = useNavigate();
	const handleConfirm = () => {
		setShow(false);
		setUser('');
		navigate('/');
	};
	return (
		<Modal show={show}>
			<div className="transform overflow-hidden min-w-[400px] rounded-xl bg-white text-left align-middle shadow-xl transition-all font-josefin">
				<div className="space-y-5 p-4">
					<div className="">
						<p className="font-semibold text-lg text-primary text-center">
							Congratulation
						</p>
					</div>
					<div className="p-2">
						<h2 className="text-center font-semibold">{user}</h2>
						<p className="text-center text-md">Welcome to the Stem family</p>
						<p className="text-center mt-2 ">
							We will get back to your as soon as possible.
						</p>
					</div>
					<button
						className="bg-primary hover:bg-primary-light text-white font-semibold h-10 py-1 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out"
						onClick={handleConfirm}
					>
						Ok
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
