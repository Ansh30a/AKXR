import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
    const err = useRouteError();

    let message = "Something went wrong!!!"
    // console.log(err);
    // console.error(err); 

    if (isRouteErrorResponse(err)) {
        message = `${err.status} ${err.statusText}`;
    } else if (err instanceof Error) {
        message = err.message;
    } else if (typeof err === "string") {
        message = err;
    }
    
    return (
        <div className='error-container'>
            <h1>Oops!!!</h1>
            <h2>{message}</h2>
        </div>
    );
};

export default ErrorPage;
