import React from "react";
import style from "../Css/Processing.module.css";

const Processing = () => {
  return (
    <div className={style.loadgif}>
      <img
        className={style.loadgif2}
        src="https://cdnl.iconscout.com/lottie/premium/thumb/rotating-blue-circle-loader-5371049-4510668.gif"
        alt=""
      />
    </div>
  );
};

export default Processing;
