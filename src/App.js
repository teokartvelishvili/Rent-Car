import React from 'react';
import './App.css';
import MainPage from './pages/mainPage/main';
import RegistrationForm from './pages/signUp/RegistrationForm';
import LoginPage from './pages/signIn/LoginPage';
import Layout from './components/Layout/Layout';
import Loading from './components/Loading/Loading'; // Import the Loading component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './Hooks/UserContext';
import NewCarForm from './components/NewCarForm/NewCarForm';
import CarDetails from './components/CarDetails/CarDetails';

function App() {
    return (
        <UserProvider>
            <Router>
                <div className="App" id="app">
                    <Loading /> {/* Render the Loading component */}
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Layout>
                                    <MainPage />
                                </Layout>
                            }
                        />
                        <Route
                            path="/NewCarForm"
                            element={
                                <Layout>
                                    <NewCarForm/>
                                </Layout>
                            }
                        />
                        <Route
                            path="/SignUp"
                            element={
                                <Layout>
                                    <RegistrationForm />
                                </Layout>
                            }
                        />
                        <Route
                            path="/LoginPage"
                            element={
                                <Layout>
                                    <LoginPage />
                                </Layout>
                            }
                        />
                        <Route
                            path="/details/:id"
                            element={
                                <Layout>
                                    <CarDetails/>
                                </Layout>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
