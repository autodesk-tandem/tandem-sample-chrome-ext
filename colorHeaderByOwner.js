

  // if we are the owner of this facility, change header bar to purple, otherwise change
  // it to pink.
function setHeaderColorByOwner() {
  let headerBarElem = document.getElementsByTagName('header');
  //let headerBarElem = document.getElementsByClassName("StyledBox-sc-13pk1d4-0");

  //console.log("TANDEM_EXT: headerBarElem", headerBarElem);

  if (headerBarElem.length) {
    //console.log("TANDEM_EXT:", "found header");
    console.log("TANDEM_EXT: DT_APP", window.DT_APP);
    console.log("TANDEM_EXT: NOP_VIEWER", window.NOP_VIEWER);

    if (window.DT_APP.currentFacility.isOwner()) {
      console.log("TANDEM_EXT:", "isOwner() true, setting header to Purple");
      headerBarElem[0].style['background-color'] = "#7733FF";
    }
    else {
      console.log("TANDEM_EXT:", "isOwner() false, setting header to Pink");
      headerBarElem[0].style['background-color'] = "#FF00FF";
    }
  }
  else {
    console.log("TANDEM_EXT:", "Couldn't find header");
  }
}

  // Append a "++" to the title on the Tab just to indicate that we are hijacking
  // some things with our extension.
function setTabTitle() {
  let titleElem = document.getElementsByTagName('title');

  if (titleElem[0]) {
    titleElem[0].innerHTML = titleElem[0].innerHTML + "++";
  }
}

  // timeout is still needed to properly time things (although in theory it shouldn't be needed
  // with the window.onDtAppInit() function, but it is not firing consistently)
setTimeout(() => {
  setHeaderColorByOwner();
  setTabTitle();
}, 2000);


  // We added a callback from TandemApp to signal when things had been loaded and the UI populated in the DOM,
  // but it isn't yet working consistently.
window.onDtAppInit = function() {
  //debugger;
  console.log("TANDEM_EXT:", "onDtAppInit() called");
  //setHeaderColorByOwner();
}
