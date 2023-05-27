document.addEventListener("DOMContentLoaded", getBrowserInfo);

async function getBrowserInfo() {
    const browserData = {
        browserNameAndVersion: navigator.userAgent.match(/(?!Gecko|Version)[a-zA-Z]+\/\S*(\s|$)/g)[0],
        browserEngine: navigator.userAgent.match(/(Gecko|AppleWebKit|Trident)\/\S*(\s|$)/g)[0],
        browserWindowResolution: `${window.innerWidth} x ${window.innerHeight}`,
        currentUrl: window.location.href,
        userAgent: navigator.userAgent,
        plugins: getBrowserPlugins(),
        mimeTypes: getBrowserMimeTypes(),
        language: navigator.language, 
        fontFingerprint: getFontFingerprint(),
        webGL: {
            version1: checkWebGLSupport(),
            version2: checkWebGL2Support(),
        },
        webSocket: checkWebSocketSupport(),
        storage: {
            indexedDB: checkIndexedDBSupport(),
            localStorage: checkLocalStorageSupport(),
        },
        languageFingerprint: getLanguageFingerprint(),
        canvasFingerprint: getCanvasFingerprint(),
        webGLFingerprint: getWebGLFingerprint()
    };

    const response = await fetch("/browser_info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(browserData),
    });

    const jsonResponse = await response.json();
    displayBrowserInfo(jsonResponse);
}

function getBrowserPlugins() {
    return Array.from(navigator).map(plugin => plugin.name);
}

function getBrowserMimeTypes() {
    return Array.from(navigator).map(mimeType => mimeType.type);
}

function getCanvasFingerprint() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillText("test", 2, 2);
    return canvas.toDataURL();
}

function getFontFingerprint() {
    // A basic approach to detect fonts; not exhaustive
    const fonts = ["Arial", "Helvetica", "Times New Roman", "Courier", "Verdana"];
    const availableFonts = fonts.filter(font => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.font = `72px '${font}'`;
        return context.measureText("test").width !== 72;
    });

    return {
        numberOfAvailableFonts: availableFonts.length,
        availableFonts: availableFonts,
    };
}

function checkWebGLSupport() {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
}

function checkWebGL2Support() {
    const canvas = document.createElement("canvas");
    return !!(window.WebGL2RenderingContext && canvas.getContext("webgl2"));
}

function checkWebSocketSupport() {
    return "WebSocket" in window;
}

function checkIndexedDBSupport() {
    return "indexedDB" in window;
}

function checkLocalStorageSupport() {
    return "localStorage" in window;
}

function getLanguageFingerprint() {
    const languagesString = navigator.languages.join(', ');
    return languagesString;
}

function getCanvasFingerprint() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillText("test", 2, 2);
    return canvas.toDataURL();
}

function getWebGLFingerprint() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
        return null;
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
}

function displayBrowserInfo(browserData) {
    const browserInfoContainer = document.getElementById("browserInfo");

    for (const key in browserData) {
        if (typeof browserData[key] !== "object") {
            const infoParagraph = document.createElement("p");
            if (key === "canvasFingerprint") {
                const truncatedValue = browserData[key].substring(0, 20) + "...更多";
                const infoText = `${key}: ${truncatedValue}`;
                infoParagraph.textContent = infoText;
            } else {
                const infoText = `${key}: ${browserData[key]}`;
                infoParagraph.textContent = infoText;
            }
            browserInfoContainer.appendChild(infoParagraph);

        } else {
            const infoParagraph = document.createElement("p");
            const infoText = `${key}:`;
            infoParagraph.textContent = infoText;
            browserInfoContainer.appendChild(infoParagraph);

            const list = document.createElement("ul");
            for (const subKey in browserData[key]) {
                const listItem = document.createElement("li");

                if (typeof browserData[key][subKey] === 'object') {
                    listItem.textContent = `${subKey}: ${JSON.stringify(browserData[key][subKey])}`;
                } else {
                    listItem.textContent = `${subKey}: ${browserData[key][subKey]}`;
                }

                list.appendChild(listItem);
            }
            browserInfoContainer.appendChild(list);
        }
    }
}