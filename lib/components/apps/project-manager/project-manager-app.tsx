"use client";

import ReactIframe from "react-iframe";

export default function ProjectManagerApp() {
  return (
    <ReactIframe
      url="https://projectmanager.prathamsnehi.com"
      width="100%"
      height="100%"
      sandbox={["allow-scripts", "allow-same-origin"]}
      className="my-iframe"
      styles={{ border: "1px solid #ccc" }}
      onLoad={() => console.log("Loaded")}
    />
  );
}
