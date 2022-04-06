import PrivateRoute from './PrivateRoute';
import { Routes, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Customers from '../pages/Customers';
import New from '../pages/New';

export default function RoutesApp() {
    return(
        <Routes>
            <Route exact path="/" element={
                <PrivateRoute isPrivate={false}>
                    <SignIn/>
                </PrivateRoute>
            } />                        
            
            <Route exact path="/register" element={
                <PrivateRoute isPrivate={false}>
                    <SignUp/>
                </PrivateRoute>
            } />
            
            <Route exact path="/dashboard" element={
                <PrivateRoute isPrivate={true}>
                    <Dashboard/>
                </PrivateRoute>
            } />

            <Route exact path="/profile" element={
                <PrivateRoute isPrivate={true}>
                    <Profile/>
                </PrivateRoute>
            } />            

            <Route exact path="/customers" element={
                <PrivateRoute isPrivate={true}>
                    <Customers/>
                </PrivateRoute>
            } />         

            <Route exact path="/new" element={
                <PrivateRoute isPrivate={true}>
                    <New/>
                </PrivateRoute>
            } />

            <Route exact path="/new/:id" element={
                <PrivateRoute isPrivate={true}>
                    <New/>
                </PrivateRoute>
            } />

        </Routes>
    )
}