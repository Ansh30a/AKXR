const Footer = () => {
  return (
    <section className="bg-gray-50 py-10 sm:pt-16 lg:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-12 gap-y-16 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2 lg:pr-8">
            <img
              className="h-9 w-auto"
              src="../../../public/logo.svg"
              alt="Logo"
              style={{ scale: 3, margin: "20px", bottom: "20px" }}
            />

            {/* <p className="mt-7 text-base leading-relaxed text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
              sint. Velit officia consequat duis enim velit mollit.
            </p> */}

            <ul className="mt-9 flex items-center space-x-3">
              {[
                <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />,
                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />,
              ].map((icon, i) => (
                <li key={i}>
                  <a className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-blue-600">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      {icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              Company
            </p>
            <ul className="mt-6 space-y-4">
              {["About", "Features", "Works", "Career"].map((item) => (
                <li key={item}>
                  <a className="text-base text-black transition hover:text-blue-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              Help
            </p>
            <ul className="mt-6 space-y-4">
              {[
                "Customer Support",
                "Delivery Details",
                "Terms & Conditions",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <a className="text-base text-black transition hover:text-blue-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* <div className="col-span-2 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              Subscribe to newsletter
            </p>

            <form className="mt-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-200 bg-white p-4 text-black placeholder-gray-500 focus:border-blue-600 focus:outline-none"
              />
              <button className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700">
                Subscribe
              </button>
            </form>
          </div> */}
        </div>

        <hr className="my-10 border-gray-200" />

        <p className="text-center text-sm text-gray-600">
          © 2026 An attempt at making a Swiggy Clone.
        </p>
      </div>
    </section>
  );
};

export default Footer;