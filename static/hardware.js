document.addEventListener("DOMContentLoaded", sendHardwareInfoToServer);

async function sendHardwareInfoToServer() {
  const deviceType = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
  const cpuCores = navigator.hardwareConcurrency || "Unknown";
  // safari, firefox can't get memory info.
  const memory = navigator.deviceMemory || "Unknown";
  const maxTouchPoints = navigator.maxTouchPoints || "Unknown";


  /*Use WebGL API to get GPU info*/ 

  const canvas = document.createElement("canvas");
  // tries to get a standard WebGL context
  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  // tries to get the WEBGL_debug_renderer_info extension from the WebGL context. 
  const rendererInfo = gl.getExtension("WEBGL_debug_renderer_info");
  // to get the renderer's name (the GPU model) if `rendererInfo` isn't null.
  const gpuRenderer = rendererInfo ? gl.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL) : "Unknown";

  const pointingMethod = maxTouchPoints > 0 ? "Touchscreen" : "Mouse";

  const hardwareInfo = {
    deviceType: deviceType,
    cpuCores: cpuCores,
    memory: memory,
    maxTouchPoints: maxTouchPoints,
    gpuRenderer: gpuRenderer,
    pointingMethod: pointingMethod,
  };

  // sent to the flask server
  const response = await fetch("/hardware_info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hardwareInfo),
  });

  const jsonResponse = await response.json();

  // show hareware info to html where id=hardwareInfo
  displayHardwareInfo(jsonResponse);
}

function displayHardwareInfo(hardwareInfo) {
  const infoContainer = document.getElementById("hardwareInfo");

  for (const key in hardwareInfo) {
    const infoParagraph = document.createElement("p");
    let infoText = `${key}: ${hardwareInfo[key]}`;

    // Add "GB" unit for memory
    if (key === "memory" && hardwareInfo[key] !== "Unknown") {
      infoText += " GB";
    }

    infoParagraph.textContent = infoText;
    infoContainer.appendChild(infoParagraph);
  }
}
