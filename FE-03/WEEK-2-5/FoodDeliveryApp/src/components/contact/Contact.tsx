import "./Contact.css";

const Contact = () => {
    return (
        <div className="items-center flex-wrap">
            <h1 className="font-bold text-3xl">Contact</h1>
            <form action="" className="">
                <input type="text" placeholder="Name" className="border border-black" />
                <input type="text" placeholder="Email" className="border border-black" />
                <input type="text" placeholder="Phone" className="border border-black" />
                <input type="text" placeholder="Message" className="border border-black" />
                <button className=" shadow-2xl mx-4 my-2 px-6 py-2 border-amber-50 rounded-2xl hover:shadow-black hover:bg-black hover:text-white">Submit</button>
            </form>
        </div>
    );
};

export default Contact;
