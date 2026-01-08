document.addEventListener("DOMContentLoaded", function () {
  // Navbar Toggle
  const container = document.getElementById("containerNavbar");
  const toggleMenu = document.getElementById("toggleMenu");
  const toggleClose = document.getElementById("toggleClose");

  if (toggleMenu && toggleClose) {
    toggleMenu.addEventListener("click", () => {
      container.classList.toggle("-translate-x-full");
    });
    toggleClose.addEventListener("click", () => {
      container.classList.toggle("-translate-x-full");
    });
  }

  // password insibility
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.innerHTML = '<i class="fa-solid fa-eye"></i>'; // Ganti ikon menjadi "eye"
      } else {
        passwordInput.type = "password";
        this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'; // Kembali ke "eye-slash"
      }
    });
  } else {
    console.error("Element #togglePassword atau #password tidak ditemukan!");
  }

  // Search Input Toggle
  const searchButton = document.getElementById("searchButton");
  const searchBox = document.getElementById("searchBox");
  const closeButton = document.getElementById("closeButton");

  searchButton.addEventListener("click", () => {
    searchBox.classList.remove("hidden");
  });

  closeButton.addEventListener("click", () => {
    searchBox.classList.add("hidden");
  });

  document.addEventListener("click", (event) => {
    if (
      !searchBox.contains(event.target) &&
      !searchButton.contains(event.target)
    ) {
      searchBox.classList.add("hidden");
    }
  });

  // Love Button Toggle
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("icon-love")) {
      let defaultSrc1 = "./assets/svg/icon-love.svg";
      let defaultSrc2 = "../assets/svg/icon-love.svg";
      let likedSrc1 = "./assets/svg/icon-love-red.svg";
      let likedSrc2 = "../assets/svg/icon-love-red.svg";

      if (event.target.classList.contains("liked")) {
        let img = new Image();
        img.src = defaultSrc1;
        img.onload = function () {
          event.target.src = defaultSrc1;
        };
        img.onerror = function () {
          event.target.src = defaultSrc2;
        };

        event.target.classList.remove("liked");
      } else {
        let img = new Image();
        img.src = likedSrc1;
        img.onload = function () {
          event.target.src = likedSrc1;
        };
        img.onerror = function () {
          event.target.src = likedSrc2;
        };

        event.target.classList.add("liked");
      }
    }
  });

  // dropdown
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const menuContainer = document.getElementById("menuContainer");

  dropdownButton.addEventListener("click", function (event) {
    event.stopPropagation();
    dropdownMenu.classList.toggle("hidden");
    if (!dropdownMenu.classList.contains("hidden")) {
      menuContainer.classList.add("mt-0");
    } else {
      menuContainer.classList.remove("mt-0");
    }
  });

  document.addEventListener("click", function (event) {
    if (
      !dropdownButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.add("hidden");
      menuContainer.classList.remove("mt-0");
    }
  });

  // hover img barang
  document.querySelectorAll(".product-image").forEach((img) => {
    img.addEventListener("mouseover", () => {
      setTimeout(() => {
        img.src = img.getAttribute("data-hover");
      }, 100);
    });

    img.addEventListener("mouseout", () => {
      setTimeout(() => {
        img.src = img.getAttribute("data-original");
      }, 100);
    });
  });

  // Mengambil pathname saat ini dan membersihkannya dari trailing slashes
  const currentPath = window.location.pathname.replace(/\/$/, "");

  // Ambil semua link navigasi di Desktop dan Mobile
  const navLinks = document.querySelectorAll("nav a, #containerNavbar a");

  navLinks.forEach((link) => {
    const hrefAttr = link.getAttribute("href");

    // PERBAIKAN: Jika href hanya "#", jangan diproses sebagai link aktif utama.
    if (!hrefAttr || hrefAttr === "#" || hrefAttr.startsWith("javascript:"))
      return;

    // Gunakan properti 'pathname' dari objek URL link tersebut
    let linkPath = link.pathname.replace(/\/$/, "");

    // Logika khusus untuk mendeteksi Home/Halaman Utama
    const isHomePath = (path) =>
      path === "" || path === "/" || path.endsWith("index.html");

    const isCurrentPageHome = isHomePath(currentPath);
    const isLinkHome = isHomePath(linkPath);

    let isMatch = false;

    if (isCurrentPageHome && isLinkHome) {
      isMatch = true;
    } else if (!isCurrentPageHome && linkPath === currentPath) {
      isMatch = true;
    }

    if (isMatch) {
      // --- LOGIKA DESKTOP NAVBAR ---
      if (link.closest("nav")) {
        const dropdownParent = link.closest(".group");
        const isSubMenuItem = dropdownParent
          ?.querySelector(".absolute")
          ?.contains(link);

        if (isSubMenuItem) {
          // Sub-menu Desktop: Teks kuning saja
          link.classList.add("text-primary");

          // Parent "Kategori" di Desktop tetap diberi border-b
          const parentLink = dropdownParent.querySelector("a");
          if (parentLink) {
            parentLink.classList.add(
              "text-primary",
              "border-primary",
              "border-b-2"
            );
            parentLink.classList.remove("border-transparent");
          }
        } else {
          // Link Utama Desktop: Teks Kuning + Border-b
          link.classList.add("text-primary", "border-primary", "border-b-2");
          link.classList.remove("border-transparent");
        }
      }

      // --- LOGIKA SIDEBAR MOBILE ---
      if (link.closest("#containerNavbar")) {
        const isMobileSubMenu = link.closest("#dropdownMenu");

        if (isMobileSubMenu) {
          // Sub-menu mobile: Teks kuning
          link.classList.add("text-primary");

          // PERBAIKAN: Parent "Kategori" di mobile menggunakan bg-primary (bukan border-b)
          const mobileParentBtn = document.getElementById("dropdownButton");
          if (mobileParentBtn) {
            mobileParentBtn.classList.add("bg-primary", "text-black");
            mobileParentBtn.classList.remove(
              "text-primary",
              "border-primary",
              "border-b-2"
            );
          }
        } else {
          // Menu utama sidebar lainnya: Background kuning
          const parentLi = link.closest("li");
          if (parentLi) {
            parentLi.classList.add("bg-primary");
            link.classList.add("text-black");
          }
        }
      }
    }
  });
});
