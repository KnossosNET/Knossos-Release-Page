// Installer: ARM, x64, x86 THEN Portable: ARM, x64, x86
const windowsLinks = [
  "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC10/Knossos.NET-0.2.0-RC10-arm64.exe", 
  "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC10/Knossos.NET-0.2.0-RC10-x64.exe", 
  "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC10/Knossos.NET-0.2.0-RC10-x86.exe",
  "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC10/Windows_arm64.zip",
  "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC10/Windows_x64.zip",
  "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC10/Windows_x86.zip"
];

const windowsVersions = [
  "0.2.0-RC10",
  "0.2.0-RC10",
  "0.2.0-RC10",
  "0.2.0-RC10",
  "0.2.0-RC10",
  "0.2.0-RC10"
]

// Universal, then Apple Silicon, Then Intel
const macLinks = [
  "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC10/Knossos.NET-0.2.0-RC10.dmg",
  "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC10/MacOS_arm64.tar.gz", 
  "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC10/MacOS_x64.tar.gz"
];

const macVersions = [
  "0.2.0-RC10",
  "0.2.0-RC10",
  "0.2.0-RC10"
]

// Appimage: aarch64, x86_64 THEN Precombiled Binaries aarch64, x86_64
const linuxLinks = [
  "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC10/Knossos.NET-aarch64.AppImage", 
  "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC10/Knossos.NET-x86_64.AppImage",
  "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC10/Linux_arm64.tar.gz",
  "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC10/Linux_x64.tar.gz"
];

const linuxVersions = [
  "0.2.0-RC10",
  "0.2.0-RC10",
  "0.2.0-RC10",
  "0.2.0-RC10"
]

const latestManualVersion = "0.2.0-RC10";

// Run at the start of the page (called from the html) with our best guess at 
function initPage(arch){
  // still looking for a good ARM list.  Hopefully defaulting to ARM and detecting the other two is enough.
  const arch64List = ["EM64T", "x86-64", "Intel 64", "amd64"];
  const arch32List = ["ia32", "x86", "amd32"];

  let archResult = 0;

  if (arch64List.includes(arch)) {
    archResult = 64;
  } else if (arch32List.includes(arch)){
    archResult = 32;
  }

  initOsChoice(archResult);

  populateFields();

  let response = fetch("https://api.github.com/repos/KnossosNET/Knossos.NET/releases/latest")
  .then((response) => response.json())
  .then((json) => console.log(json));

}

// Change tab appearance and download link contents
function changeActivation(enable, id, id2){
  
  toggleSelectedTab(enable, id2);
  toggleContents(enable, id);
}

// Change the appearance of the tab based on whether it's selected.
function toggleSelectedTab(enable, id2){
  const element = document.getElementById(id2);

  if (enable === true){
    element.style.fontWeight = 'bold';
    element.style.backgroundColor = "#121212";
  } else if (enable === false){
    element.style.fontWeight = 'normal';
    element.style.backgroundColor = "#080808";
  }
}

// Switch the download link contents on or off.
function toggleContents(enable, id)
{
  const element = document.getElementById(id);

  if (enable === true){
    element.style.display = 'inline';
  } else if (enable === false){
    element.style.display = 'none';
  }
}

// Disable the auto detected downoad because we are not confident enough to have the correct choice.
function disableTheButton(){
  toggleContents(false, "downLinks");
  toggleContents(false, "downloadTab");
}


function activateDownload(){

  // turn off everything else
  changeActivation(false, "macLinks", "macTab");
  changeActivation(false, "linLinks", "linTab");
  changeActivation(false, "winLinks", "winTab");
  changeActivation(true, "downLinks", "downTab")

}

function activateWindows(){
//  console.log("Windows Chosen");

  // turn off everything else
  changeActivation(false, "macLinks", "macTab");
  changeActivation(false, "linLinks", "linTab");
  changeActivation(true, "winLinks", "winTab");
  changeActivation(false, "downLinks", "downTab")
}

function activateMac(){

  // turn off everything else
  changeActivation(false, "linLinks", "linTab");
  changeActivation(false, "winLinks", "winTab");
  changeActivation(true, "macLinks", "macTab");
  changeActivation(false, "downLinks", "downTab")
}

function activateLinux(){
  // turn on linux
  changeActivation(true, "linLinks", "linTab");

  // turn off everything else
  changeActivation(false, "winLinks", "winTab");
  changeActivation(false, "macLinks", "macTab");
  changeActivation(false, "downLinks", "downTab")
}

// borrowed from Vlad Turak
// https://stackoverflow.com/questions/38241480/detect-macos-ios-windows-android-and-linux-os-with-js
// Despite us having the other library for detecting these settings, this has worked well enough so far
function initOsChoice(archResult) {
  const userAgent = window.navigator.userAgent,
      platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
      macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'];

  if (macosPlatforms.indexOf(platform) !== -1) {
    activateMac();
    activateTheButton(1, archResult);
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    activateMac();
    disableTheButton(); // No ios builds, so user must pick if they want one.
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    activateWindows();
    activateTheButton(0, archResult);
  } else if (/Android/.test(userAgent)) {
    activateWindows();
    disableTheButton(); // No android builds, so user must pick if they want one.
  } else if (/Linux/.test(platform)) {
    activateLinux();
    activateTheButton(2, archResult);
  }
}

function activateTheButton(os, arch){

  // sanity!
  if (os < 0 || os > 2){
    disableTheButton();
    return;
  }

  const anchorElement = document.getElementById("theButton");
  // Download Link contents
  let newContents = '';
  // Contents for notes *after* the download link
  let noteContents = "";

  // arch 0 means ARM, 32 means 32 bit, 64 means 64 bit

  // Windows
  if (os === 0) {
    if (arch === 0){
      newContents += "Windows ARM64 Installer";
      anchorElement.href = windowsLinks[0];

    } else if (arch === 32) {
      newContents +=  "Windows 32 Bit Installer";
      anchorElement.href = windowsLinks[2];
    
    } else if (arch === 64) {
      newContents +=  "Windows 64 Bit Intel Installer";
      anchorElement.href = windowsLinks[1];

    // Bogus Windows arch
    }  else {
      disableTheButton();
      return;
    }

  // Mac
  } else if (os === 1) {

    // Because of universal build, handle both situations at once.
    if (arch === 0 || arch === 64) {  
      newContents += "Mac Universal DMG";
      anchorElement.href = macLinks[0];

    } else if (arch === 32) {
      // Unsuppoted
      disableTheButton();

    // Bogus Mac Arch, (Or so old, we're wondering how they're still using it)
    } else {
      disableTheButton();
      return;
    }

  // Linux
  } else if (os === 2) {
    if (arch === 0) {
      newContents +=  "Linux aarch64 AppImage";
      anchorElement.href = linuxLinks[0];

    } else if (arch === 32) {
        // Unsupported
        disableTheButton();

    } else if (arch === 64) {
      newContents += "Linux x86_64 AppImage";
      anchorElement.href = linuxLinks[1];

    // Bogus Linux Arch
    } else {
      disableTheButton();
      return;
    }

    noteContents += "NOTE: When using these images in combination with appimaged or other management system, we recommend disabling auto-update in the Knossos settings tab."

    // Bad OS, somehow
  } else {
//    console.log("really really not detected!");
    disableTheButton();
    return;
  }

  // Set download link text
  document.getElementById("theButtonText").textContent = newContents;

  // Add some final text, explaining the use of other tabs
  document.getElementById("button-extra-text").textContent = noteContents;

  // Go ahead and let the user see it
  activateDownload();
}

function populateFields(){

  document.getElementById("winarm-installer-version").innerHTML = windowsVersions[0];
  document.getElementById("winx64-installer-version").innerHTML = windowsVersions[1];
  document.getElementById("winx86-installer-version").innerHTML = windowsVersions[2];
  document.getElementById("winarm-pack-version").innerHTML = windowsVersions[3];
  document.getElementById("winx64-pack-version").innerHTML = windowsVersions[4];
  document.getElementById("winx86-pack-version").innerHTML = windowsVersions[5];

  document.getElementById("winarm-installer-link").href = windowsLinks[0];
  document.getElementById("winx64-installer-link").href = windowsLinks[1];
  document.getElementById("winx86-installer-link").href = windowsLinks[2];
  document.getElementById("winarm-pack-link").href = windowsLinks[3];
  document.getElementById("winx64-pack-link").href = windowsLinks[4];
  document.getElementById("winx86-pack-link").href = windowsLinks[5];


  document.getElementById("macuni-version").innerHTML = macVersions[0];
  document.getElementById("macapplesilicon-version").innerHTML = macVersions[1];
  document.getElementById("macintel-version").innerHTML = macVersions[2];

  document.getElementById("macuni-link").href = macLinks[0];
  document.getElementById("macapplesilicon-link").href = macLinks[1];
  document.getElementById("macintel-link").href = macLinks[2];


  document.getElementById("linuxarm-appimage-version").innerHTML = linuxVersions[0];
  document.getElementById("linuxx64-appimage-version").innerHTML = linuxVersions[1];
  document.getElementById("linuxarm-binaries-version").innerHTML = linuxVersions[2];
  document.getElementById("linuxx64-binaries-version").innerHTML = linuxVersions[3];

  document.getElementById("linuxarm-appimage-link").href = linuxLinks[0];
  document.getElementById("linuxx64-appimage-link").href = linuxLinks[1];
  document.getElementById("linuxarm-binaries-link").href = linuxLinks[2];
  document.getElementById("linuxx64-binaries-link").href = linuxLinks[3];
}