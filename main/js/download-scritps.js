function changeActivation(enable, id, id2){
  
  toggleSelectedTab(enable, id2);
  toggleContents(enable, id);
}

function toggleSelectedTab(enable, id2){
  const element = document.getElementById(id2);

  console.log(id2);

  if (enable === true){
    element.style.fontWeight = 'bold';
  } else if (enable === false){
    element.style.fontWeight = 'normal';
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

function activateWindows(){
  console.log("Windows Chosen");

  changeActivation(false, "macLinks", "macTab");
  changeActivation(false, "linLinks", "linTab");
  changeActivation(true, "winLinks", "winTab");

}

function activateMac(){
  console.log("macOS chosen");

  changeActivation(false, "linLinks", "linTab");
  changeActivation(false, "winLinks", "winTab");
  changeActivation(true, "macLinks", "macTab");

}

function activateLinux(){
  console.log("Linux chosen");

  changeActivation(false, "winLinks", "winTab");
  changeActivation(false, "macLinks", "macTab");
  changeActivation(true, "linLinks", "linTab");

  const style = getComputedStyle(document.getElementById("windowTab"));
  console.log("Why yes, I am a taco.")
  console.log(style);
}

// borrowed from Vlad Turak
// https://stackoverflow.com/questions/38241480/detect-macos-ios-windows-android-and-linux-os-with-js
function initOsChoice() {
  
  const userAgent = window.navigator.userAgent,
      platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
      macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'];

  if (macosPlatforms.indexOf(platform) !== -1) {
    activateMac();
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    activateMac();
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    activateWindows();
  } else if (/Android/.test(userAgent)) {
    activateWindows();
  } else if (/Linux/.test(platform)) {
    activateLinux();
  }
}