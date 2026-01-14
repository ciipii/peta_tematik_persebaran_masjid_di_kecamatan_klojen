// 1. Initialize Animation
AOS.init({ once: true, offset: 100, duration: 800 });

// 2. THEME & LANGUAGE LOGIC
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const langToggle = document.getElementById("langToggle");
const htmlEl = document.documentElement;

// Dictionary Bahasa
const translations = {
  id: {
    nav_home: "Beranda",
    nav_layout: "Layout",
    nav_webgis: "WebGIS",
    nav_data: "Data",
    nav_profile: "Profil Saya",
    hero_badge: "Sistem Informasi Geografis",
    hero_title: "Pemetaan Spasial <br />Masjid di Kecamatan Klojen",
    hero_desc: "Visualisasi interaktif 15 titik strategis tempat ibadah di jantung Kota Malang. Dibangun dengan teknologi QGIS dan Web Mapping modern.",
    btn_explore: "Mulai Jelajah",
    btn_directory: "Lihat Direktori",
    stat_points: "Titik Masjid",
    stat_coord: "Sistem Koordinat",
    layout_desc: "Tampilan kartografi standar layout peta Kecamatan Klojen.",
    btn_newtab: "Buka Tab Baru",
    btn_download: "Unduh Layout",
    webgis_desc: "Gunakan fitur zoom dan pan untuk eksplorasi detail lokasi.",
    btn_fullscreen: "Mode Layar Penuh",
    dir_title: "Direktori Masjid",
    dir_desc: "Daftar lengkap 15 masjid yang terdata dalam sistem.",
    table_header: "Data Masjid",
    th_name: "Nama Masjid",
    th_address: "Alamat Lengkap",
    th_nav: "Navigasi",
    btn_load: "Memuat Data...",
    btn_show_more: "Tampilkan Semua",
    btn_show_less: "Tampilkan Lebih Sedikit",
    profile_role: "Prodi Teknik Informatika",
    profile_quote: '"Website ini dikembangkan sebagai tugas akhir mata kuliah <strong>Sistem Informasi Geografis (SIG)</strong> di Institut Asia Malang."',
    search_placeholder: "Cari nama atau jalan...",
  },
  en: {
    nav_home: "Home",
    nav_layout: "Layout",
    nav_webgis: "WebGIS",
    nav_data: "Data",
    nav_profile: "My Profile",
    hero_badge: "Geographic Information System",
    hero_title: "Spatial Mapping of <br />Mosques in Klojen District",
    hero_desc: "Interactive visualization of 15 strategic worship places in the heart of Malang City. Built with QGIS and modern Web Mapping technology.",
    btn_explore: "Start Exploring",
    btn_directory: "View Directory",
    stat_points: "Mosque Points",
    stat_coord: "Coordinate System",
    layout_desc: "Standard cartographic layout display of Klojen District map.",
    btn_newtab: "Open New Tab",
    btn_download: "Download Layout",
    webgis_desc: "Use zoom and pan features to explore location details.",
    btn_fullscreen: "Fullscreen Mode",
    dir_title: "Mosque Directory",
    dir_desc: "Complete list of 15 mosques recorded in the system.",
    table_header: "Mosque Data",
    th_name: "Mosque Name",
    th_address: "Full Address",
    th_nav: "Navigation",
    btn_load: "Loading Data...",
    btn_show_more: "Show All",
    btn_show_less: "Show Less",
    profile_role: "Informatics Engineering Program",
    profile_quote: '"This website was developed as a final project for the <strong>Geographic Information Systems (GIS)</strong> course at Asia Institute Malang."',
    search_placeholder: "Search name or street...",
  },
};

// Set Initial Theme
const savedTheme = localStorage.getItem("theme") || "light";
htmlEl.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

// Set Initial Lang
let currentLang = localStorage.getItem("lang") || "id";
langToggle.textContent = currentLang.toUpperCase();
applyLanguage(currentLang);

// Theme Event
themeToggle.addEventListener("click", () => {
  const currentTheme = htmlEl.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  htmlEl.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.classList.replace("bi-moon-stars-fill", "bi-sun-fill");
  } else {
    themeIcon.classList.replace("bi-sun-fill", "bi-moon-stars-fill");
  }
}

// Language Event
langToggle.addEventListener("click", () => {
  currentLang = currentLang === "id" ? "en" : "id";
  localStorage.setItem("lang", currentLang);
  langToggle.textContent = currentLang.toUpperCase();
  applyLanguage(currentLang);
  renderTable(document.getElementById("searchInput").value);
});

function applyLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  document.getElementById("searchInput").placeholder = translations[lang].search_placeholder;
}

// 3. Navbar Scroll Effect Logic
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// 4. ScrollSpy Logic
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function highlightMenu() {
  let current = "";
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    current = "profile";
  } else {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });
  }
  navLinks.forEach((li) => {
    li.classList.remove("active");
    if (li.getAttribute("href").includes(current)) {
      li.classList.add("active");
    }
  });
}
window.addEventListener("scroll", highlightMenu);
window.addEventListener("load", highlightMenu);

// 5. Data Masjid
const masjidData = [
  { name: "Masjid Al Ikhlas", location: "Bareng", address: "Jl. Raya Langsep, Bareng, Kota Malang" },
  { name: "Masjid Besar Quba", location: "Bareng", address: "Jl. Terusan Ijen No.24, Bareng" },
  { name: "Masjid Al-Ihsan", location: "Gading Kasri", address: "Jl. Simpang Bondowoso No.10, Gading Kasri" },
  { name: "Masjid Al-Falah MAN 2", location: "Penanggungan", address: "Jl. Bandung No.7, Penanggungan" },
  { name: "Masjid Baitut Taqwa", location: "Oro-oro Dowo", address: "Jl. Jakarta, Oro-oro Dowo (Bea Cukai)" },
  { name: "Masjid An-Nur", location: "Samaan", address: "Jl. J.A. Suprapto II No.86, Samaan" },
  { name: "Masjid Al-Mu'minun", location: "Rampal Celaket", address: "Jl. Mahakam No.29, Rampal Celaket" },
  { name: "Masjid Assyifa Lavalette", location: "Rampal Celaket", address: "Jl. W.R. Supratman (RS Lavalette)" },
  { name: "Masjid Jami' Nurul Falah", location: "Klojen", address: "Jl. Cokroaminoto, Klojen" },
  { name: "Masjid Al-Falah Stasiun", location: "Klojen", address: "Jl. Trunojoyo No.10 (Stasiun Kota Baru)" },
  { name: "Masjid Agung Jami'", location: "Kauman", address: "Jl. Merdeka Barat No.3 (Alun-Alun)" },
  { name: "Masjid Jend. Ahmad Yani", location: "Bareng", address: "Jl. Jend Ahmad Yani, Bareng" },
  { name: "Masjid Khadijah", location: "Kauman", address: "Jl. Arjuno No.19 A, Kauman" },
  { name: "Masjid Nur Inka", location: "Gading Kasri", address: "Jl. Ijen No.25 A (Museum Brawijaya)" },
  { name: "Masjid Darussalam", location: "Rampal", address: "Jl. Jaksa Agung Suprapto, Rampal" },
];

// 6. Logic Rendering Table
const tableBody = document.getElementById("masjid-list-body");
const viewBtn = document.getElementById("viewAllBtn");
const searchInput = document.getElementById("searchInput");
let isExpanded = false;

function renderTable(keyword = "") {
  tableBody.innerHTML = "";
  const filteredData = masjidData.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()) || item.address.toLowerCase().includes(keyword.toLowerCase()));

  if (filteredData.length === 0) {
    const msg = currentLang === "id" ? "Data tidak ditemukan" : "Data not found";
    tableBody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-muted">${msg}</td></tr>`;
    viewBtn.style.display = "none";
    return;
  }

  let limit;
  if (keyword.length > 0) {
    limit = filteredData.length;
    viewBtn.style.display = "none";
  } else {
    limit = isExpanded ? filteredData.length : 5;
    viewBtn.style.display = "inline-block";
  }

  filteredData.slice(0, limit).forEach((masjid, index) => {
    const realIndex = masjidData.indexOf(masjid) + 1;
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(masjid.name + " " + masjid.location + " Malang")}`;
    const rowHtml = `
      <tr class="fade-in-row">
        <td class="ps-4 fw-bold text-muted">${String(realIndex).padStart(2, "0")}</td>
        <td>
          <div class="fw-bold" style="color: var(--text-heading)">${masjid.name}</div>
          <div class="small text-muted"><i class="bi bi-geo-alt me-1"></i>${masjid.location}</div>
        </td>
        <td class="small" style="color: var(--text-muted)">${masjid.address}</td>
        <td class="text-center">
          <a href="${mapLink}" target="_blank" class="btn-icon text-decoration-none" title="Google Maps">
            <i class="bi bi-map-fill"></i>
          </a>
        </td>
      </tr>
    `;
    tableBody.innerHTML += rowHtml;
  });

  if (keyword.length === 0) {
    const btnTextMore = translations[currentLang].btn_show_more;
    const btnTextLess = translations[currentLang].btn_show_less;

    if (isExpanded) {
      viewBtn.innerHTML = `<i class="bi bi-chevron-up me-2"></i> ${btnTextLess}`;
      viewBtn.classList.replace("btn-outline-primary", "btn-custom-outline");
    } else {
      viewBtn.innerHTML = `<i class="bi bi-chevron-down me-2"></i> ${btnTextMore} (${masjidData.length})`;
      viewBtn.classList.replace("btn-custom-outline", "btn-outline-primary");
    }
  }
}

viewBtn.addEventListener("click", () => {
  isExpanded = !isExpanded;
  renderTable(searchInput.value);
});

searchInput.addEventListener("keyup", (e) => {
  renderTable(e.target.value);
});

// Initial Render
renderTable();

// 7. Back to Top Logic (Floating Right)
const backToTopContainer = document.getElementById("backToTopContainer");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopContainer.classList.add("show");
  } else {
    backToTopContainer.classList.remove("show");
  }
});

function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
