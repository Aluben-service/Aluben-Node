/**
* Credits to 3kh0!
**/

function script(text) {
  console.log("%cScript Injection", "color: cyan; font-weight: 600; background: black; padding: 0 5px; border-radius: 5px", `Injected script ${text} (Credits to 3kh0)`);
}

const analytics = document.createElement("script");
analytics.setAttribute("async", "");
analytics.setAttribute("defer", "");
analytics.setAttribute("src", "https://scripts.simpleanalyticscdn.com/latest.js");
document.head.append(analytics);
script("1/2 (Simple Analytics)");

const plausible = document.createElement("script");
plausible.setAttribute("defer", "");
plausible.setAttribute("data-domain", location.origin);
plausible.setAttribute("src", "https://plausible.io/js/script.js");
document.head.append(plausible)
script("2/2 (Plausible Analytics)")
