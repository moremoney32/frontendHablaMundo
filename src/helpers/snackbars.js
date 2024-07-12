import "./snackbar.css"
export function snackbbar(
    domNodeToInject,
    image,
    message,
    timeToHide,
    actionMessage = ""
  ) {
    return new Promise((resolve) => {
      const constructSnackbar = `<div id="snackbar"><img src="${image}" id="snackbarImg" />${message}<span id="actionSnackbar">${actionMessage}</span></div>`;
 
      domNodeToInject.insertAdjacentHTML("beforeend", constructSnackbar);
 
      const actionSnackbar = document.querySelector("#actionSnackbar");
 
      const snackbar = document.querySelector("#snackbar");
 
      requestAnimationFrame(() => {
        snackbar.style.transform = "scale3d(1,1,1)";
      }, snackbar);
 
      if (timeToHide !== "infinite") {
        setTimeout(() => {
          closeSnackbar();
       }, timeToHide);
      }
 
      function closeSnackbar() {
        requestAnimationFrame(() => {
          snackbar.style.transform = "scale3d(0,0,0)";
 
          snackbar.addEventListener("transitionend", () => {
            let removeSnackbar = domNodeToInject.removeChild(snackbar);
            removeSnackbar = null;
          });
        }, snackbar);
      }
 
      actionSnackbar.addEventListener(
        "click",
        () => {
          closeSnackbar();
 
          resolve("action snackbar clicked");
        },
        { passive: true }
      );
    });
  }