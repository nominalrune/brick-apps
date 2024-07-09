import { useState } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	Outlet
} from "react-router-dom";
import {
	QueryClient,
	QueryClientProvider,
} from 'react-query';
import { Base } from './components/Base';
import { Login } from './components/Login';
import { Register } from "./components/Register";


const queryClient = new QueryClient();

function App() {
	const [user, setUser] = useState<{ id: number, name: string, email: string; } | null>(null);


	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Base user={user} />}>
						<Route path="login" element={ } />
						<Route path="register" element={ } />
						<Route path="user" element={<Outlet />} >
							<Route path="profile" element={ } >
								<Route index element={ } />
								<Route path="edit" element={ } />
							</Route>
						</Route>
						<Route path="app" element={<Outlet />} >
							<Route index element={ } />
							<Route path="new" element={ } />
							<Route path=":id" element={<Outlet />} >
								<Route index element={ } />
								<Route path="edit" element={ } />
								<Route path="new" element={ } />
							</Route>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
