/* eslint-disable react/prop-types */
import { IoCheckmarkSharp } from 'react-icons/io5';

const Questions = ({ questions, handleSetAnswer }) => {
	return (
		<div className="questions">
			<div className="flex justify-between items-center flex-wrap">
				<div className="page-title mb-2">
					<p className="text-textBody m-0">List of questions</p>
				</div>
			</div>
			{questions?.map((question, questionIndex) => (
				<div
					key={questionIndex}
					className={`${
						question.error ? 'shadow-red-500' : ''
					}  shadow  bg-white px-8 pt-3 pb-4 rounded-md mb-3`}
				>
					<div className="flex justify-between items-end flex-wrap mb-3">
						<label>Question: {questionIndex + 1}</label>
					</div>
					<input
						type="text"
						value={question.question}
						disabled
						className="input w-full h-[49px] rounded-md border border-gray pl-6 text-base"
					/>
					{question.options.map((option, optionIndex) => (
						<div key={optionIndex}>
							<label>Option: {optionIndex + 1}</label>
							<div className="flex justify-between items-center flex-wrap gap-2">
								<input
									type={option.type}
									value={option.text}
									disabled
									className="input flex-1 h-[49px] rounded-md border border-gray pl-6 text-base"
								/>
								<div className="">
									<button
										onClick={() => handleSetAnswer(questionIndex, optionIndex)}
										className={`${
											question.answer === optionIndex
												? 'bg-green-500 text-white'
												: 'bg-gray-100 text-green-500'
										} rounded-sm  w-10 h-10 flex items-center justify-center`}
									>
										<IoCheckmarkSharp className="text-3xl" />
									</button>
								</div>
							</div>
						</div>
					))}
					{question.error && (
						<div className="text-red-500 text-center mt-1">
							{question.error}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default Questions;
