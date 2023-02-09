import React from "react";

const Banner = () => {
  return (
    <div className="m-bnner">
      <div className="l-banner">
        <div className="b-texts">
          <h6>Are you hungry ?</h6>
          <h1>Don't Wait</h1>
          <button>Order Now</button>
        </div>
      </div>
      <div className="r-banner">
        <img src="/assests/hero-pizza.png" alt="" />
      </div>
    </div>
  );
};

export default Banner;
