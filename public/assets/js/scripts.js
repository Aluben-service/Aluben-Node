/**
* Credits to 3kh0!
**/

function script(text) {
  console.log("%cScript Injection", "color: cyan; font-weight: 600; background: black; padding: 0 5px; border-radius: 5px", `Injected script ${text} (Credits to 3kh0)`);
}

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}


const analytics = document.createElement("script");
analytics.setAttribute("async", "");
analytics.setAttribute("defer", "");
analytics.setAttribute("src", "https://scripts.simpleanalyticscdn.com/latest.js");
document.head.append(analytics);
script("1/3 (Simple Analytics)");

const plausible = document.createElement("script");
plausible.setAttribute("defer", "");
plausible.setAttribute("data-domain", location.origin);
plausible.setAttribute("src", "https://plausible.io/js/script.js");
document.head.append(plausible)
script("2/3 (Plausible Analytics)")

const main = document.createElement("script");
main.setAttribute("src", "assets/js/script.js");
document.head.append(main);
script("3/3 (Main script)")


if (isMobileDevice()) {
    const dialog = document.createElement("dialog");
    dialog.setAttribute("open", "");
    dialog.setAttribute("id", "dialog");
    dialog.innerHTML = '<p>This tool, Aluben is only meant for computers!</p>'
    document.body.append(dialog);
    const closedDialog = document.querySelector("#dialog");
    closedDialog.showModal();
}
