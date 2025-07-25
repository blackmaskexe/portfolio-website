"use client";

import ReactIframe from "react-iframe";
import SafariWebBrowserWindow from "../../ui/SafariWebBrowserWindow";

export default function ProjectManagerApp() {
  return (
    <SafariWebBrowserWindow url="https://projectmanager.prathamsnehi.com">
      <ReactIframe
        url="https://projectmanager.prathamsnehi.com"
        width="100%"
        height="100%"
        sandbox={[] /* Remove sandbox restrictions for testing */}
        className="my-iframe"
        styles={{
          display: "block", // Ensure iframe is a block element
          height: "100%", // Use parent container's height
          width: "100%", // Use parent container's width
          maxWidth: "100%", // Prevent overflow
          maxHeight: "100%", // Prevent overflow
        }}
        onLoad={() => console.log("Loaded")}
      />
    </SafariWebBrowserWindow>
  );
}
