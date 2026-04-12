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

  function closeModal() {
    overlay.classList.remove("active");
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

  function openViewer(url, name) {
    document.getElementById("stl-modal-title").textContent = name;
    overlay.classList.add("active");

    var container = document.getElementById("stl-modal-viewer");
    container.innerHTML = "";

    var isDark = document.body.getAttribute("data-md-color-scheme") === "slate";

    new StlViewer(container, {
      load_three_files: document.querySelector('script[src*="stl_viewer"]').src.replace("stl_viewer.min.js", ""),
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
      all_loaded_callback: function () {
        setTimeout(function () { fixPixelRatio(container); }, 100);
      }
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
