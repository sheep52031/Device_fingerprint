document.addEventListener("DOMContentLoaded",  getScreenInfo);

async function getScreenInfo() {
    const orientation = screen.orientation.type.includes("landscape") ? "Landscape" : "Portrait";
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const pixelRatio = window.devicePixelRatio;
    const colorDepth = window.screen.colorDepth;

    const screenInfo = {
      orientation: orientation,
      resolution: `${screenWidth} x ${screenHeight}`,
      pixelRatio: pixelRatio,
      colorDepth: `${colorDepth} bits`
    };

    const response = await fetch("/screen_info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(screenInfo),
    });

    // return await response.json();
    const jsonResponse = await response.json();
    displayScreenInfo(jsonResponse);
}

function displayScreenInfo(screenInfo) {
    const screenInfoContainer = document.getElementById("screenInfo");

    for (const key in screenInfo) {
      const infoParagraph = document.createElement("p");
      const infoText = `${key}: ${screenInfo[key]}`;
      infoParagraph.textContent = infoText;
      screenInfoContainer.appendChild(infoParagraph);
    }
}

