import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Body from './components/body/Body';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import ErrorPage from './components/error-page/ErrorPage';
import RestaurantMenuPage from './components/restaurant-menu-page/RestaurantMenuPage';
// import Grocery from './Components/Grocery/Grocery';
import Shimmer from './components/shimmer/Shimmer';
import './index.css'; 

const Grocery = lazy(() => import('./components/grocery/Grocery'));

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Body />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/grocery',
                element: <Suspense fallback={<Shimmer />}><Grocery /></Suspense>
            },
            {
                path: '/restaurants/:resId',
                element: <RestaurantMenuPage />
            }
        ],
        errorElement: <ErrorPage />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={appRouter} />
    </StrictMode>,
);
