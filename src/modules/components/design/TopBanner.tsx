import React from "react";
import "../../styles/components/design/topbanner.scss";

interface TopBannerProps {
  imageUrl: string;
  text: string;
}

const TopBanner: React.FC<TopBannerProps> = ({ imageUrl, text }) => {
  return (
    <div data-topbanner-container>
      <div
        className="content-img"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="baseline">
          <span className="high-line">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
