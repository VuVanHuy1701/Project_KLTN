import React from "react";

import IndexContact from "../contents/contact.component";
import IndexNavbar from "../navbar/navbar.component";

//import Footer from "../Footers/footer.component";
// import ProductPage from "../Content/shop.component";

function ContactIndex() {
React.useEffect(() => {
        document.body.classList.add("index-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("index-page");
            document.body.classList.remove("sidebar-collapse");
        };
    });
    return (
        <>
            <IndexNavbar />
            <IndexContact />
            <div className="wrapper">
                <div className="main">
                    {/* <ProductPage /> */}
                </div>
                {/* <Footer /> */}
            </div>
        </>
    );
}

export default ContactIndex;