import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './components/Layout' 
import Home from './pages/Home'
import BlogDetail from './pages/BlogDetail'
import Auth from './pages/Auth'
import CreateBlog from './pages/CreateBlog'

import { AuthProvider } from './context/AuthContext'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "/", // Matches the root path
        element: <Home />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/create",
        element: <CreateBlog />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)