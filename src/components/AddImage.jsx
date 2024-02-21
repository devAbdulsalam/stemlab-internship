/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import userImage from '../assets/userImage.png';
import toast from 'react-hot-toast';

const AddImage = ({ setImageFile }) => {
	const [imageName, setImageName] = useState(null);
	const [image, setImage] = useState(null);
	const hiddenFileInput = useRef(null);
	const handleImageChange = (event) => {
		const file = event.target.files[0];
		const maxSize = 5 * 1024 * 1024; // 5MB in bytes
		const validTypes = ['image/svg+xml', 'image/jpeg', 'image/png'];
		const isValidType = validTypes.includes(file.type);
		if (!file) {
			return toast.error('add a valid image');
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		if (!isValidType) {
			toast.error('Invalid file type. Only SVG, JPEG, and PNG are allowed.');
			return;
		}
		if (file.size > maxSize) {
			return toast.error('Image size must be less than 5Mb');
		}
		const imgname = file.name;
		setImageName(imgname);
		reader.onloadend = () => {
			const imageDataURL = reader.result;
			setImage(imageDataURL);
			setImageFile(file);
		};
	};
	const handleClick = () => {
		hiddenFileInput.current.click();
	};
	return (
		<div className="bg-white px-8 py-8 rounded-md mb-6">
			<p className="mb-2 text-base text-black">Upload Image</p>
			<div className="text-center" onClick={handleClick}>
				{!image ? (
					<img
						className="w-[100px] h-auto mx-auto"
						src={userImage}
						alt="userImage"
					/>
				) : (
					<img
						className="w-[100px] h-auto mx-auto"
						src={image}
						alt={imageName}
					/>
				)}
			</div>
			<span className="text-tiny text-center w-full inline-block mb-3">
				{imageName ? imageName : 'Image size must be less than 5Mb'}
			</span>
			<div className="">
				<form>
					<input
						type="file"
						ref={hiddenFileInput}
						onChange={handleImageChange}
						className="hidden"
					/>
					<label
						htmlFor="productImage"
						className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
						onClick={handleClick}
					>
						Upload Image
					</label>
				</form>
			</div>
		</div>
	);
};

export default AddImage;
