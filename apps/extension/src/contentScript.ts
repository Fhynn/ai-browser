chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "BROWSEPILOT_PING") {
    sendResponse({
      ok: true,
      title: document.title,
      url: window.location.href
    });
  }

  return true;
});
