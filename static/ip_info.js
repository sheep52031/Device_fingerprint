document.addEventListener("DOMContentLoaded", () => {
  init();
});

async function init() {
  const systemInfo = await getSystemInformation();
  getIPInformation(systemInfo);
  getLocalIP((localIP) => {
    console.log("Intranet IP: ", localIP);
    displayIntranetIP(localIP);
  });
}

async function getSystemInformation() {
  try {
    const response = await fetch("/system_info");
    const systemInfo = await response.json();
    return systemInfo;
  } catch (error) {
    console.error("Error fetching system information: ", error);
  }
}

async function getIPInformation(systemInfo) {
  try {
    const response = await fetch("/ip_info");
    const ipData = await response.json();

    const ipInformation = {
      sourceIP: ipData.query,
      latitude: ipData.lat,
      longitude: ipData.lon,
      timezone: ipData.timezone,
      country: ipData.country,
      ISP: ipData.isp,
      hostname: ipData.reverse,
      isProxy: ipData.proxy,      
      isTor: ipData.tor,          
      isVPN: ipData.vpn,         
      isCloudServer: ipData.provider_type === "hosting"
    };

    displayIPInformation(ipInformation, systemInfo);

  } catch (error) {
    console.error("Error fetching IP information: ", error);
  }
}

function generateUDID(ipInformation, systemInfo) {
  const dataToHash = [
    ipInformation.sourceIP,
    ipInformation.latitude,
    ipInformation.longitude,
    systemInfo.os_name,
    systemInfo.os_version,
    systemInfo.platform_name,
    systemInfo.timezone,
  ].join("_");

  return hashString(dataToHash);
}

 
function hashString(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}


// set up a dummy WebRTC connection listens for ICE candidates
// Once an ICE candidate is generated then get local Ip address
function getLocalIP(callback) {
    const peerConnection = new RTCPeerConnection({ iceServers: [] });
    peerConnection.createDataChannel("");
    peerConnection.createOffer().then(offer => peerConnection.setLocalDescription(offer));
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        const candidateComponents = event.candidate.candidate.split(" ");
        const localIP = candidateComponents[4];
        callback(localIP);
      }
    };
}

function displayIntranetIP(localIP) {
  const ipInfoContainer = document.getElementById("ipInfo");
  const infoParagraph = document.createElement("p");
  const infoText = `Intranet IP: ${localIP}`;
  infoParagraph.textContent = infoText;
  ipInfoContainer.appendChild(infoParagraph);
}

function displayIPInformation(ipInformation, systemInfo) {
  const UDID = generateUDID(ipInformation, systemInfo);
  const ipInfoContainer = document.getElementById("ipInfo");

  // Add this block to display the UDID at the top of the page
  const udidParagraph = document.createElement("p");
  const udidText = `UDID: ${UDID}`;
  udidParagraph.textContent = udidText;
  udidParagraph.style.color = "red";
  udidParagraph.style.fontWeight = "bold";
  ipInfoContainer.appendChild(udidParagraph);

  for (const key in ipInformation) {
    const infoParagraph = document.createElement("p");
    const infoText = `${key}: ${ipInformation[key]}`;
    infoParagraph.textContent = infoText;
    ipInfoContainer.appendChild(infoParagraph);
  }
}
  