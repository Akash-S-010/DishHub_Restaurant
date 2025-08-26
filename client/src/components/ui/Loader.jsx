import React from "react";
import Lottie from "lottie-react";
import animData from "../../assets/Restaurant website Pre loader.json";

const Loader = ({ size = 400}) => {
  return (
    <div
      role="status"
      aria-busy="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <div className="flex flex-col items-center gap-3">
        <div style={{ width: size, height: size }}>
          <Lottie
            animationData={animData}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
