(() => {
  const shareButton = document.querySelector(".referral-share-button");
  const copyButton = document.querySelector(".referral-copy-button");
  const status = document.querySelector(".referral-copy-status");

  const setStatus = (message) => {
    if (!status) return;
    status.textContent = message;
    window.setTimeout(() => {
      status.textContent = "";
    }, 2500);
  };

  if (shareButton) {
    shareButton.addEventListener("click", async () => {
      const url = shareButton.dataset.shareUrl || window.location.href;
      const shareData = {
        title: "Kluthe Environmental Solutions, LLC",
        text: "Take a look at Kluthe Environmental Solutions.",
        url
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (error) {
          if (error && error.name === "AbortError") return;
        }
      }

      window.location.href =
        "mailto:?subject=" +
        encodeURIComponent("Kluthe Environmental Solutions") +
        "&body=" +
        encodeURIComponent("I thought you might want to take a look at Kluthe Environmental Solutions: " + url);
    });
  }

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const url = copyButton.dataset.copyUrl || window.location.href;
      try {
        await navigator.clipboard.writeText(url);
        setStatus("Website link copied.");
      } catch (error) {
        window.prompt("Copy this website link:", url);
      }
    });
  }
})();