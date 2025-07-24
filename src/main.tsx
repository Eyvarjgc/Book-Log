import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import {  BrowserRouter, Routes, Route} from "react-router";
import { Discover } from './pages/Discover.tsx';
import { Categories } from './pages/Categories.tsx';
import { Favorite } from './pages/Favorite.tsx';
import { Results } from './pages/Results.tsx';
import { BookInfo } from './components/BookInfo.tsx';
import { Login } from './pages/Login.tsx';
import { DataProvider } from './hooks/useContext.tsx';
import { Register } from './pages/Register.tsx';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { FavoriteProvider } from './hooks/useFavoriteContext.tsx';
import { AdminPanel } from './Admin/AdminPanel.tsx';
import { BookList } from './Admin/BookList.tsx';
import { AddBook } from './Admin/AddBook.tsx';
import { DeleteBook } from './Admin/DeleteBook.tsx';
import { Category } from './components/Category.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <DataProvider>
      <FavoriteProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path="/" >

        <Route index element={<Discover />} />
        <Route index element={<Results />} path="/results/:title" />
        <Route index element={<BookInfo />} path="/books/bookInfo/:ID" />

        <Route index element={<Categories />} path="/categories" />
        <Route index element={<Category />} path="/category/:category" />
        <Route index element={<Favorite />} path="/favorite" />


        </Route>

        {/* LOGIN SECTION */}
        <Route element={<Login />} path='/Login' />
        <Route element={<Register />} path='/sign up' />


        {/* ADMIN SECTIN */}
        <Route element={<AdminPanel />} path="/AdminPanel">
          <Route index element={<BookList />} path="/AdminPanel/bookList" />
          <Route index element={<AddBook />} path="/AdminPanel/addBook" />
          <Route index element={<DeleteBook />} path="/AdminPanel/deleteBook" />


        </Route>


      </Routes>
    </BrowserRouter>
    </FavoriteProvider>
  </DataProvider>
  </GoogleOAuthProvider>
  </StrictMode>,
)
