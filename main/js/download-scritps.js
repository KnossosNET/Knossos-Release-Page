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

function changeActivation(enable, id, id2){
  
  toggleSelectedTab(enable, id2);
  toggleContents(enable, id);
}

function toggleSelectedTab(enable, id2){
  const element = document.getElementById(id2);

//  console.log(id2);

  if (enable === true){
    element.style.fontWeight = 'bold';
    element.style.backgroundColor = "#121212";
  } else if (enable === false){
    element.style.fontWeight = 'normal';
    element.style.backgroundColor = "#080808";
  }
}

function toggleContents(enable, id)
{
  const element = document.getElementById(id);

  if (enable === true){
    element.style.display = 'inline';
  } else if (enable === false){
    element.style.display = 'none';
  }
}

function disableTheButton(){
  toggleContents(false, "downLinks");
  toggleContents(false, "downloadTab");
}


function activateDownload(){
// console.log("Convenience Build Chosen!");

  changeActivation(false, "macLinks", "macTab");
  changeActivation(false, "linLinks", "linTab");
  changeActivation(false, "winLinks", "winTab");
  changeActivation(true, "downLinks", "downTab")

}

function activateWindows(){
//  console.log("Windows Chosen");

  changeActivation(false, "macLinks", "macTab");
  changeActivation(false, "linLinks", "linTab");
  changeActivation(true, "winLinks", "winTab");
  changeActivation(false, "downLinks", "downTab")
}

function activateMac(){
//  console.log("macOS chosen");

  changeActivation(false, "linLinks", "linTab");
  changeActivation(false, "winLinks", "winTab");
  changeActivation(true, "macLinks", "macTab");
  changeActivation(false, "downLinks", "downTab")
}

function activateLinux(){
//  console.log("Linux chosen");

  changeActivation(false, "winLinks", "winTab");
  changeActivation(false, "macLinks", "macTab");
  changeActivation(true, "linLinks", "linTab");
  changeActivation(false, "downLinks", "downTab")
}

// borrowed from Vlad Turak
// https://stackoverflow.com/questions/38241480/detect-macos-ios-windows-android-and-linux-os-with-js
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
// For testing
//  console.log(`Got ${os} and ${arch}` );

  // sanity!
  if (os < 0 || os > 2){
    disableTheButton();
    return;
  }

  const element = document.getElementById("theButton");
  let newContents = '<h4><b><br><img length="15" width="15" src="main/res/iconmonstr-download.png"/> ';

  // Windows
  if (os === 0) {
    if (arch === 0){
      element.innerHTML = newContents + "Windows ARM Installer</b></h4>";
      element.href = "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC9/Knossos.NET-0.2.0-RC9-arm64.exe";
//      console.log("Windows, ARM");
    } else if (arch === 32) {
      element.innerHTML = newContents + "Windows 32 Bit Installer</b></h4>";
      element.href = "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC9/Knossos.NET-0.2.0-RC9-x86.exe";
      //      console.log("Windows, 32 BIT");
    } else if (arch === 64) {
      element.innerHTML = newContents + "Windows 64 Bit Installer</b></h4>";
      element.href = "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC9/Knossos.NET-0.2.0-RC9-x64.exe";
//      console.log("Windows, 64 BIT");
    }  else {
//      console.log("Not Detected.");
      disableTheButton();
      return;
    }

  // Mac
  } else if (os === 1) {
    if (arch === 0) {  
      element.innerHTML = newContents + "Mac Universal DMG</b></h4>";
      element.href = "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC9/Knossos.NET-0.2.0-RC9.dmg";

//      console.log("Mac, ARM");
    } else if (arch === 32) {
      // Unsuppoted
      disableTheButton();
//      console.log("Mac, 32 Bit");
//      console.log("UNSUPPORTED!");
    } else if (arch === 64) {
//      console.log("Mac, 64 Bit");
      element.innerHTML = newContents + "Mac Universal DMG</b></h4>";
      element.href = "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC9/Knossos.NET-0.2.0-RC9.dmg";
    } else {
//      console.log("Mac not detected!");
      disableTheButton();
      return;
    }

  // Linux
  } else if (os === 2) {
    if (arch === 0) {
      element.innerHTML = newContents + "Linux ARM AppImage</b></h4>";
      element.href = "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC9/Knossos.NET-0.2.0-RC9-arm64.exe";

//      console.log("Linux, ARM");
    } else if (arch === 32) {
        // Unsupported
        disableTheButton();
//      console.log("Linux, 32 Bit");
    } else if (arch === 64) {
      element.innerHTML = newContents + "Linux 64 Bit AppImage</b></h4>";
      element.href = "https://github.com/KnossosNET/Knossos.NET/releases/download/v0.2.0-RC9/Knossos.NET-aarch64.AppImage";

//      console.log("Linux, 64 Bit");
    } else {
//      console.log("Linux not detected!");
      disableTheButton();
      return;
    }

  // Bad OS, somehow
  } else {
//    console.log("really really not detected!");
    disableTheButton();
    return;
  }

  activateDownload();
}