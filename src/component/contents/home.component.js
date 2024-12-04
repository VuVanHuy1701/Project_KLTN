// App.js
import React from "react";
import './Css/home.css';

const Carousel = () => {
    return (
        <div className="carousel">
            <img
                src="https://storage.googleapis.com/a1aa/image/DywjRW2dPh4TDBzPlK84ftfb0B5DEGBP8jyKn9DCEdLi70sTA.jpg"
                alt="Close-up of several bowls with blue floral patterns, one being filled with broth"
            />
            <div className="carousel-content">
                <h1>KIẾN XÂY ĐƯA TA GẦN NHAU NHỜ TỰ PHỤC VỤ</h1>
                <p>Ngày xưa, những năm cuối thế kỉ XX và đầu tiên của Thế kỉ XXI khi mà Phú Quốc còn chưa có du lịch thì KIẾN XÂY phục vụ ăn sáng tại làng chài bờ biển.</p>
                <button>Đọc thêm</button>
            </div>
            <div className="carousel-nav">
                <i className="fas fa-chevron-left"></i>
                <i className="fas fa-chevron-right"></i>
            </div>
            <div className="carousel-indicators">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="social-icons">
                <img src="https://storage.googleapis.com/a1aa/image/Ewr4mJJ6teVfhE79vmz9XWeLORkfqlRfN9s6gKrM5ef9xda2JA.jpg" alt="Messenger icon" />
                <img src="https://storage.googleapis.com/a1aa/image/y8NA266pkWrzMVYHRTOsWy3tnAWMe7de9kaYUjCl9ubl70sTA.jpg" alt="Another social media icon" />
            </div>
        </div>
    );
};

const Introduction = () => {
    return (
        <div className="introduction">
            <div className="introduction-content">
                <img src="https://storage.googleapis.com/a1aa/image/vqGeFtIeZhpxJE7jf12HkZfL0MjQxonGLapNX40fNlXEjbqdC.jpg" alt="Introduction image" />
                <div className="introduction-text">
                    <h2>GIỚI THIỆU</h2>
                    <p>Chào mừng bạn đến với trang web của chúng tôi. Chúng tôi tự hào giới thiệu về dịch vụ và sản phẩm của mình.</p>
                    <p>Chúng tôi cam kết mang đến cho bạn những trải nghiệm tuyệt vời nhất với chất lượng dịch vụ hàng đầu.</p>
                </div>
            </div>
        </div>
    );
};

const AdditionalSection = () => {
    return (
        <div className="additional-section">
            <div className="additional-content">
                <div className="additional-text">
                    <h2>THÊM THÔNG TIN</h2>
                    <p>Chúng tôi luôn nỗ lực để cải thiện và phát triển dịch vụ của mình nhằm đáp ứng nhu cầu của khách hàng.</p>
                    <p>Hãy liên hệ với chúng tôi để biết thêm chi tiết về các dịch vụ và sản phẩm mà chúng tôi cung cấp.</p>
                </div>
                <img src="https://storage.googleapis.com/a1aa/image/2v3F4J5K6L7M8N9O0P1Q2R3S4T5U6V7W8X9Y0Z1A2B3C4D5E.jpg" alt="Additional information image" />
            </div>
        </div>
    );
};

function IndexHome() {
    return (
        <div>
            <Carousel />
            <Introduction />
            <AdditionalSection />
        </div>
    );
}

export default IndexHome;
