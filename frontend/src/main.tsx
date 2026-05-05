import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom'

import Home from './pages/Home'
import BlogDetail from './pages/BlogDetail'
import Auth from './pages/Auth'
import CreateBlog from './pages/CreateBlog'

import './index.css'

const routes: RouteObject[] = [
  {
    path: "/",
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
]

const router = createBrowserRouter(routes)

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
