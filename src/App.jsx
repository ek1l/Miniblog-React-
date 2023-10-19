import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import Search from './pages/Search/Search';
//Hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

// PAGES
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Createpost from './pages/CreatePost/Createpost';
import Dashboard from './pages/Dashboard/Dashboard';
import Posts from './pages/Post/Posts';
import EditPost from './pages/EditPost/EditPost';

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);
  const loadingUser = user === undefined;
  if (loadingUser) {
    return <p>Carregando...</p>;
  }
  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Posts />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/posts/create"
                element={user ? <Createpost /> : <Navigate to="/login" />}
              />
              <Route
                path="/posts/edit/:id"
                element={user ? <EditPost /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
