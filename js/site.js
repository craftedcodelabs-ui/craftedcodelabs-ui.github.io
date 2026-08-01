(function () {
  const base = document.documentElement.dataset.base || "";
  const page = document.body.dataset.page || "";

  const apps = [
    {
      id: "campshare",
      name: "CampShare",
      desc: "Camping-Marktplatz am Stellplatz",
      href: `${base}apps/campshare.html`,
    },
    {
      id: "sparschwein",
      name: "Sparschwein",
      desc: "Digitales Sparziel offline",
      href: `${base}apps/sparschwein.html`,
    },
    {
      id: "cyberdash",
      name: "Cyber Dash",
      desc: "Cyberpunk Endless Runner",
      href: `${base}apps/cyberdash.html`,
    },
  ];

  function appLinks(activeApp) {
    return apps
      .map(
        (app) => `
      <a href="${app.href}"${activeApp === app.id ? ' aria-current="page"' : ""}>
        ${app.name}
        <small>${app.desc}</small>
      </a>`
      )
      .join("");
  }

  function navLink(href, label, key) {
    const active = page === key ? ' class="active" aria-current="page"' : "";
    return `<a href="${href}"${active}>${label}</a>`;
  }

  const header = `
    <header class="site-header">
      <div class="header-inner">
        <a class="logo" href="${base}index.html">
          <span class="logo-mark">CCL</span>
          <span class="logo-text">
            Crafted Code Labs
            <span>Android Apps · Österreich</span>
          </span>
        </a>
        <button class="menu-toggle" type="button" aria-label="Menü öffnen" aria-expanded="false" aria-controls="site-nav">
          <span></span><span></span><span></span>
        </button>
        <nav class="site-nav" id="site-nav">
          ${navLink(`${base}index.html`, "Start", "home")}
          <div class="nav-dropdown" data-dropdown>
            <button type="button" aria-expanded="false" aria-haspopup="true">
              Apps
            </button>
            <div class="dropdown-panel">
              <a href="${base}apps/index.html">
                Alle Apps
                <small>Übersicht &amp; Rechtliches</small>
              </a>
              <div class="dropdown-divider"></div>
              ${appLinks(page.startsWith("app-") ? page.replace("app-", "") : "")}
            </div>
          </div>
          ${navLink(`${base}impressum.html`, "Impressum", "impressum")}
          ${navLink(`${base}kontakt.html`, "Kontakt", "kontakt")}
        </nav>
      </div>
    </header>`;

  const footer = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <strong>Crafted Code Labs</strong>
          <p>Android-Apps von Fred Konstantin Haim · Spittal an der Drau, Österreich</p>
        </div>
        <div class="footer-col">
          <h4>Apps</h4>
          <a href="${base}apps/campshare.html">CampShare</a>
          <a href="${base}apps/sparschwein.html">Sparschwein</a>
          <a href="${base}apps/cyberdash.html">Cyber Dash</a>
        </div>
        <div class="footer-col">
          <h4>Rechtliches</h4>
          <a href="${base}impressum.html">Impressum</a>
          <a href="${base}kontakt.html">Kontakt</a>
          <a href="mailto:craftedcodelabs@gmail.com">craftedcodelabs@gmail.com</a>
        </div>
      </div>
      <div class="footer-bottom">&copy; 2026 Crafted Code Labs · Fred Konstantin Haim</div>
    </footer>`;

  const headerSlot = document.getElementById("site-header");
  const footerSlot = document.getElementById("site-footer");
  if (headerSlot) headerSlot.outerHTML = header;
  if (footerSlot) footerSlot.outerHTML = footer;

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  const dropdown = document.querySelector("[data-dropdown]");
  const dropdownBtn = dropdown?.querySelector("button");

  function closeNav() {
    toggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("open");
    document.body.classList.remove("nav-open");
    dropdown?.classList.remove("open");
    dropdownBtn?.setAttribute("aria-expanded", "false");
  }

  toggle?.addEventListener("click", () => {
    const open = nav?.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", !!open);
  });

  dropdownBtn?.addEventListener("click", () => {
    const open = dropdown.classList.toggle("open");
    dropdownBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 820px)").matches) closeNav();
    });
  });

  document.addEventListener("click", (event) => {
    if (!dropdown?.contains(event.target)) {
      dropdown?.classList.remove("open");
      dropdownBtn?.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) closeNav();
  });
})();
