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
  let newContents = '<h4><b><br><img length="15" width="15" src="main/res/iconmonstr-download.png"/> ';
  // Contents for notes *after* the download link
  let noteContents = "";

  // arch 0 means ARM, 32 means 32 bit, 64 means 64 bit

  // Windows
  if (os === 0) {
    if (arch === 0){
      newContents += "Windows ARM64 Installer</b></h4>";
      anchorElement.href = "https://github.com/KnossosNET/Knossos.NET/releases/download/v1.0.0/Knossos.NET-1.0.0-arm64.exe";

    } else if (arch === 32) {
      newContents +=  "Windows 32 Bit Installer</b></h4>";
      anchorElement.href = "https://github.com/KnossosNET/Knossos.NET/releases/download/v1.0.0/Knossos.NET-1.0.0-x86.exe";
    
    } else if (arch === 64) {
      newContents +=  "Windows 64 Bit Intel Installer</b></h4>";
      anchorElement.href = "https://github.com/KnossosNET/Knossos.NET/releases/download/v1.0.0/Knossos.NET-1.0.0-x64.exe";

    // Bogus Windows arch
    }  else {
      disableTheButton();
      return;
    }

  // Mac
  } else if (os === 1) {

    if (arch === 0) {  
      newContents += "Mac Universal DMG</b></h4>";
      anchorElement.href = "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC10/Knossos.NET-0.2.0-RC10.dmg";

    } else if (arch === 32) {
      // Unsuppoted
      disableTheButton();

    } else if (arch === 64) {
      newContents +=  "Mac Universal DMG</b></h4>";
      anchorElement.href = "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC10/Knossos.NET-0.2.0-RC10.dmg";

    // Bogus Mac Arch, (Or so old, we're wondering how they're still using it)
    } else {
      disableTheButton();
      return;
    }

  // Linux
  } else if (os === 2) {
    if (arch === 0) {
      newContents +=  "Linux aarch64 AppImage</b></h4>";
      anchorElement.href = "https://github.com/KnossosNET/Knossos.NET/releases/download/v1.0.0/Knossos.NET-aarch64.AppImage";

    } else if (arch === 32) {
        // Unsupported
        disableTheButton();

    } else if (arch === 64) {
      newContents += "Linux x86_64 AppImage</b></h4>";
      anchorElement.href = "https://github.com/KnossosNET/Knossos.NET/releases/download/v1.0.0/Knossos.NET-x86_64.AppImage";

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
  anchorElement.innerHTML = newContents;

  // Add some final text, explaining the use of other tabs
  document.getElementById("button-extra-text").innerHTML = noteContents;

  // Go ahead and let the user see it
  activateDownload();
}