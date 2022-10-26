import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Logo = () => {
  // Render the logo only on the client-side
  // This avoids a Next hydration error due to the video tag
  const [canRenderClientSide, initialize] = useState(false);
  useEffect(() => {
    initialize(true);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {canRenderClientSide && (
        <video src="/logo.webm" width={400} height={400} loop autoPlay></video>
      )}
    </div>
  );
};

export default Logo;
