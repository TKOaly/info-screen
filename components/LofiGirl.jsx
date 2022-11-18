import React from "react";
import Image from "next/image";
import lofiHiphopGirl from "../public/lofihiphop.gif";

const LofiGirl = props => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "5rem",
      marginBottom: "2rem"
    }}
    {...props}
  >
    <Image src={lofiHiphopGirl} layout="fixed" />
  </div>
);

export default LofiGirl;
