import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './components/Header/Header.jsx'
import Footer from "./components/Footer.jsx"
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AuthLayout from "./components/AuthLayout.jsx"
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
    children: [
      {
        path: "/",
        element:<Home />
      },

      {
        path:"/login",
        element: (
          <AuthLayout authentication={false}>
              <Login />
          </AuthLayout>
        )
      },

      {
        path: "/signup",
        element: (
            <AuthLayout authentication={false}>
                <SignUp />
            </AuthLayout>
        ),
      },

      {
        path: "/all-posts",
        element: (
            <AuthLayout authentication>
                {" "}
                <AllPosts />
            </AuthLayout>
        ),
      },

      {
        path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
      },

      {
        path: "/edit-post/:slug",
        element: (
            <AuthLayout authentication={true}>
                {" "}
                <EditPost />
            </AuthLayout>
        ),
      },

      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
    <Provider store={store}>

    <RouterProvider router={router} />

    </Provider>
    
  </React.StrictMode>,
)