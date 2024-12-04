import React from 'react';
import './Css/contact.css'; // Import CSS file

const IndexContact = () => {
    return (
        <div className="contact-us">
            <div className="containerC">
                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p><i className="fas fa-map-marker-alt"></i> 123 Street Name, City, Country</p>
                    <p><i className="fas fa-phone"></i> +123 456 7890</p>
                    <p><i className="fas fa-envelope"></i> info@bunquay.vn</p>
                </div>
                <div className="contact-form">
                    <h2>Contact Us</h2>
                    <form action="#" method="post">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required />
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086857509073!2d144.9630579153167!3d-37.81410797975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1b1f1b1f1b1!2s123%20Street%20Name%2C%20City%2C%20Country!5e0!3m2!1sen!2s!4v1614311234567!5m2!1sen!2s"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
            {/* <div className="footer">
                <p>&copy; 2023 Bun Quay. All rights reserved.</p>
            </div> */}
        </div>
    );
}

export default IndexContact;
