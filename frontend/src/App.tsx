import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CollectionsPage from './components/collections/CollectionsPage';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as UsersApi from './network/users_api';
import styles from './styles/CollectionsPage.module.css';

function App() {
	const [loggedInUser, setLoggedInUser] = useState<User|null>(null);

	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);

	useEffect(() => {
		async function fetchLoggedInUser() {
			try {
				const user = await UsersApi.getLoggedInUser();
				setLoggedInUser(user);
			} catch (error) {
				console.error(JSON.stringify(error));
			}
		}
		fetchLoggedInUser();
	}, [])

	return (
		<>
			<NavBar
				loggedInUser={loggedInUser}
				onLoginClicked={() => setShowLoginModal(true)}
				onSignUpClicked={() => setShowSignUpModal(true)}
				onLogoutSuccess={() => setLoggedInUser(null)}
			/>
			<Container className={`mt-3 ${styles.collectionsPage}`}>
				<CollectionsPage />
			</Container>
				{showSignUpModal &&
					<SignUpModal
						onDismiss={() => setShowSignUpModal(false)}
						onSignUpSuccess={(user) => {
							setLoggedInUser(user);
							setShowSignUpModal(false);
						}}
					/>
				}
				{showLoginModal &&
					<LoginModal
						onDismiss={() => setShowLoginModal(false)}
						onLoginSuccess={(user) => {
							setLoggedInUser(user);
							setShowLoginModal(false)
						}}
					/>
				}
		</>
	);
}

export default App;
