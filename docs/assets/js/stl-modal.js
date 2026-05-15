var STL_MODAL_SCRIPT_SRC = (document.currentScript && document.currentScript.src) || "";

document$.subscribe(function () {
  var overlay = document.getElementById("stl-modal-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "stl-modal-overlay";
    overlay.innerHTML =
      '<div id="stl-modal">' +
        '<div id="stl-modal-header">' +
          '<span id="stl-modal-title"></span>' +
          '<button id="stl-modal-close">&times;</button>' +
        "</div>" +
        '<div id="stl-modal-viewer"></div>' +
      "</div>";
    document.body.appendChild(overlay);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });
    document.getElementById("stl-modal-close").addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  }

  var currentViewer = null;
  var loadTimeout = null;
  var VIEWER_TIMEOUT_MS = 25000;

  function clearLoadTimeout() {
    if (loadTimeout) {
      clearTimeout(loadTimeout);
      loadTimeout = null;
    }
  }

  function disposeViewer() {
    if (!currentViewer) return;
    try { currentViewer.clean && currentViewer.clean(); } catch (e) {}
    try { currentViewer.dispose && currentViewer.dispose(); } catch (e) {}
    currentViewer = null;
  }

  function closeModal() {
    overlay.classList.remove("active");
    clearLoadTimeout();
    disposeViewer();
    document.getElementById("stl-modal-viewer").innerHTML = "";
  }

  function fixPixelRatio(container) {
    var canvas = container.querySelector("canvas");
    if (!canvas) return;
    var ctx = canvas.getContext("webgl") || canvas.getContext("webgl2");
    if (!ctx) return;
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.viewport(0, 0, canvas.width, canvas.height);
  }

  function removeStatusOverlay(container) {
    var existing = container.querySelector(".stl-modal-status");
    if (existing) existing.remove();
  }

  function showViewerMessage(container, kind, message, url) {
    removeStatusOverlay(container);
    var node = document.createElement("div");
    node.className = "stl-modal-status stl-modal-" + kind;
    var p = document.createElement("p");
    p.textContent = message;
    node.appendChild(p);
    if (url) {
      var a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "Open on GitHub";
      node.appendChild(a);
    }
    container.appendChild(node);
  }

  function openViewer(url, name) {
    document.getElementById("stl-modal-title").textContent = name;
    overlay.classList.add("active");

    var container = document.getElementById("stl-modal-viewer");
    clearLoadTimeout();
    disposeViewer();
    container.innerHTML = "";
    showViewerMessage(container, "loading", "Loading " + name + "…");

    var isDark = document.body.getAttribute("data-md-color-scheme") === "slate";

    loadTimeout = setTimeout(function () {
      if (!container.querySelector("canvas")) {
        disposeViewer();
        showViewerMessage(container, "error",
          "STL took too long to load (network or GitHub CDN timed out).", url);
      }
      loadTimeout = null;
    }, VIEWER_TIMEOUT_MS);

    var viewstlBase = "";
    try {
      if (STL_MODAL_SCRIPT_SRC) {
        viewstlBase = new URL("./viewstl/", STL_MODAL_SCRIPT_SRC).href;
      } else {
        var existing = document.querySelector('script[src*="stl_viewer"]');
        if (existing && existing.src) {
          viewstlBase = new URL("./", existing.src).href;
        }
      }
    } catch (e) {
      viewstlBase = "";
    }

    try {
      currentViewer = new StlViewer(container, {
        load_three_files: viewstlBase,
        models: [{
          id: 0,
          filename: url,
          color: isDark ? "#7c8aff" : "#4051B5",
          display: "smooth"
        }],
        bg_color: isDark ? "#1e1e2e" : "#fafafa",
        auto_rotate: true,
        controls: 0,
        allow_drag_and_drop: false,
        mouse_zoom: true,
        zoom: -1,
        auto_resize: true,
        loading_error_callback: function () {
          clearLoadTimeout();
          disposeViewer();
          showViewerMessage(container, "error", "Couldn't load STL.", url);
        },
        all_loaded_callback: function () {
          clearLoadTimeout();
          removeStatusOverlay(container);
          setTimeout(function () { fixPixelRatio(container); }, 100);
        }
      });
    } catch (e) {
      clearLoadTimeout();
      disposeViewer();
      showViewerMessage(container, "error", "Viewer failed to initialize.", url);
    }
  }

  // GitHub serves STLs as text/plain with no Content-Disposition, so a plain
  // <a download> link can render in-tab. Pull as a blob and trigger a
  // same-origin download instead.
  function forceDownload(url, filename, link) {
    var spinTimer = setTimeout(function () {
      link.classList.add("stl-downloading");
    }, 200);

    fetch(url)
      .then(function (resp) {
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        return resp.blob();
      })
      .then(function (blob) {
        var blobUrl = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () { URL.revokeObjectURL(blobUrl); }, 1000);
      })
      .catch(function () {
        window.open(url, "_blank", "noopener");
      })
      .finally(function () {
        clearTimeout(spinTimer);
        link.classList.remove("stl-downloading");
      });
  }

  var cubeSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" ' +
    'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73' +
    'l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>' +
    '<polyline points="3.27 6.96 12 12.01 20.73 6.96"/>' +
    '<line x1="12" y1="22.08" x2="12" y2="12"/></svg>';

  document.querySelectorAll("a.stl-download").forEach(function (link) {
    var href = link.getAttribute("href");
    if (!href || !href.endsWith(".stl")) return;

    var rawUrl = href.replace(
      "github.com/PiTracLM/PiTrac/raw/",
      "raw.githubusercontent.com/PiTracLM/PiTrac/"
    );

    var name = link.textContent.trim();

    link.addEventListener("click", function (e) {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      forceDownload(rawUrl, name, link);
    });

    var btn = document.createElement("span");
    btn.className = "stl-3d";
    btn.title = "View " + name + " in 3D";
    btn.innerHTML = cubeSvg;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      openViewer(rawUrl, name);
    });

    link.insertAdjacentElement("afterend", btn);
  });
});
