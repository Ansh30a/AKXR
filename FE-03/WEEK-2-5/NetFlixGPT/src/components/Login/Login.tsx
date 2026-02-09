import Header from "../Header/Header";

const Login = () => {
    return (
        <div className="relative min-h-screen">
            <Header />
            <div>
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/e49aba81-ee7c-4f19-baef-7c54bbab003e/web/IN-en-20260202-TRIFECTA-perspective_04f5de39-b518-493c-9a8d-6aef11af0457_large.jpg"
                    alt="Logo"
                    aria-hidden="true"
                />
            </div>
            <div className="absolute inset-0 bg-linear-to-b from-neutral-950/90 via-neutral-900/80 to-neutral-950"></div>
            <form className="bg-linear-to-b from-neutral-950/90 via-neutral-900/80 to-neutral-950 w-28/100 m-12 p-12 absolute mt-40 mb-40 mx-auto top-0 bottom-0 right-0 left-0 flex flex-col rounded-sm">
                <h1 className="text-4xl font-semibold text-white mt-2 mb-5">Sign In</h1>
                <input type="text" placeholder="Email address" className="m-2 p-3 bg-white rounded-sm"/>
                <input type="text" placeholder="Password" className="m-2 p-3 bg-white rounded-sm"/>
                <button className="bg-red-600 p-3 m-2 rounded-sm text-white mt-10">Sign In</button>
            </form>
        </div>
    );
};

export default Login;
