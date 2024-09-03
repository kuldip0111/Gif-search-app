import { useState, useEffect } from 'react';
import styles from './Search.module.css';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Gif {
	id: string;
	title: string;
	images: {
		fixed_height: {
			url: string;
		};
	};
}

interface SearchProps {
	onLogout: () => void;
}

export default function Search({ onLogout }: SearchProps) {
	const { user, logOut } = useAuth();
	const router = useRouter();
	const [query, setQuery] = useState('');
	const [gifs, setGifs] = useState<Gif[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchGifs = async () => {
		setLoading(true);
		const response = await fetch(
		`https://api.giphy.com/v1/gifs/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&q=${query}&limit=12`
		);
		const data = await response.json();
		setGifs(data.data);
		setLoading(false);
	};

	const handleSearch = () => {
		if (query) fetchGifs();
	};

	return (
		<ProtectedRoute>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1 className={styles.title}>GIF Search</h1>
					<div className={styles.userInfo}>
						{/* Display user profile image */}
						{user?.photoURL && (
							<img src={user.photoURL} alt="User Avatar" className={styles.userAvatar} />
						)}
						{/* Display user email */}
						{user?.email && <p className={styles.userEmail}>{user.email}</p>}
						{/* Logout button */}
						<button
							onClick={() => {
								logOut();
								router.push('/');
							}}
							className={styles.logoutButton}
						>
							Logout
						</button>
					</div>
				</div>
				<div className={styles.searchContainer}>
					<input
						type="text"
						placeholder="Search GIFs..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className={styles.searchInput}
					/>
					<button onClick={handleSearch} className={styles.searchButton}>
						Search
					</button>
				</div>
				{loading && <p className={styles.loadingText}>Loading...</p>}
				<div className={styles.gifGrid}>
					{gifs.map((gif) => (
						<img
							key={gif.id}
							src={gif.images.fixed_height.url}
							alt={gif.title}
							className={styles.gifImage}
						/>
					))}
				</div>
			</div>
		</ProtectedRoute>
	);
}
