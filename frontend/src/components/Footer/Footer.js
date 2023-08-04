import React, { useEffect, useState } from "react";

function Footer() {
  return (
    <footer
      className=" py-4 bg-dark text-white-50"
    >
      <div className="container text-center">
        <a style={{
          cursor:"pointer",
          textDecoration:"none",
          color:"white"
        }} href="https://www.linkedin.com/in/karthikeyan-v-v-26b87b244/" target="_blank" ><small>© 2022 - {new Date().getFullYear()} - <i> Karthikeyan V V</i></small></a>
      </div>
    </footer>
  );
}

export default Footer;
