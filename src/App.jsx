import { Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';
import Layout from './Layout';
import Interns from './pages/Interns';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import MyQuiz from './pages/MyQuiz';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ProtectedRoutes from './hooks/ProtectedRoutes';

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Interns />} />
				<Route path="/login" element={<Login />} />
				<Route element={<ProtectedRoutes />}>
					<Route exact path="/dashboard" element={<Dashboard />} />
					<Route path="/my-quiz/:id" element={<Quiz />} />
					<Route path="/my-quiz" element={<MyQuiz />} />
				</Route>
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
