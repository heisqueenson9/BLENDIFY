// ============================================================
// BLENDIFY — Main JS (Robust & Error-Free)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ─── 1. LOADER ───
  const loader = document.getElementById("globalLoader");
  if (loader) {
    loader.classList.add("hidden");
    setTimeout(() => { loader.style.display = 'none'; }, 600);
  }

  // ─── 2. STICKY NAV & SCROLL EFFS ───
  const navbar = document.getElementById("navbar");
  const backBtn = document.getElementById("backToTop");
  
  if (navbar || backBtn) {
    window.addEventListener("scroll", () => {
      if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);
      if (backBtn) backBtn.classList.toggle("visible", window.scrollY > 400);
    });
  }

  // ─── 3. MOBILE HAMBURGER ───
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const spans = hamburger.querySelectorAll("span");
      if (spans.length === 3) {
        if (navLinks.classList.contains("open")) {
          spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
          spans[1].style.opacity = "0";
          spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
        } else {
          spans[0].style.transform = "none";
          spans[1].style.opacity = "1";
          spans[2].style.transform = "none";
        }
      }
    });

    // Close mobile menu on click outside
    document.addEventListener("click", (e) => {
      if (navLinks.classList.contains("open") && !navbar.contains(e.target)) {
        hamburger.click();
      }
    });
  }

  // ─── 4. SEARCH TOGGLE ───
  const searchBtn = document.getElementById("searchToggle");
  const searchBar = document.getElementById("searchBar");
  const searchInput = document.getElementById("searchInput");
  
  if (searchBtn && searchBar) {
    searchBtn.addEventListener("click", () => {
      searchBar.classList.toggle("open");
      if (searchBar.classList.contains("open") && searchInput) {
        searchInput.focus();
      }
    });
  }

  // ─── 5. SCROLL REVEAL ANIMATIONS ───
  const revealElements = document.querySelectorAll(
    ".reveal, .step, .why-card, .blog-card, .testimonial-card, .product-card, .feat-card, .stat-block, .value-card, .team-card, .marketing-p"
  );
  
  if (revealElements.length > 0 && typeof IntersectionObserver !== "undefined") {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach((el, index) => {
      // Add staggered delay for siblings inside grids
      const delay = (index % 4) * 0.1;
      el.style.transitionDelay = `${delay}s`;
      el.classList.add("reveal"); // ensure class exists
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add("visible"));
  }

  // ─── 6. COOKIE BANNER ───
  const cookieBanner = document.getElementById("cookieBanner");
  if (cookieBanner) {
    if (!localStorage.getItem("blendify_cookies")) {
      setTimeout(() => { cookieBanner.style.setProperty("display", "flex"); }, 2000);
    }
    
    window.acceptCookies = function() {
      localStorage.setItem("blendify_cookies", "accepted");
      cookieBanner.style.display = "none";
    };
  }

  // ─── 7. NEWSLETTER HANDLING ───
  window.handleNewsletter = function(e) {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector("input[type='email']");
    const btn = form.querySelector("button[type='submit']");
    
    if (input && btn && input.value) {
      const email = input.value;
      btn.textContent = "Subscribed! 🎉";
      btn.style.background = "var(--olive-dark)";
      input.value = "";
      input.placeholder = "Welcome to Blendify!";
      
      localStorage.setItem("blendify_nl_subscribed", "true");
      
      setTimeout(() => {
        btn.textContent = "Subscribe";
        btn.style.background = "";
        input.placeholder = "Enter your email address";
      }, 5000);
    }
  };

  // ─── 8. ACTIVE NAV HIGHLIGHT ───
  try {
    const activePath = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-links a").forEach(link => {
      const href = link.getAttribute("href") || "";
      const linkPath = href.split("/").pop().split("?")[0];
      
      link.classList.remove("active");
      if ((activePath === "" || activePath === "index.html") && (linkPath === "index.html" || linkPath === "")) {
        link.classList.add("active");
      } else if (activePath === linkPath && activePath !== "") {
        link.classList.add("active");
      }
    });
  } catch(e) {
    console.warn("Nav highlight skipped", e);
  }

});

// Global Window Error Catch (prevents full white-screen crashes)
window.addEventListener("error", function(e) {
  console.error("Blendify JS Error CAUGHT: ", e.error);
  // We keep the UI intact despite JS errors
  const loader = document.getElementById("globalLoader");
  if (loader && !loader.classList.contains("hidden")) {
    loader.classList.add("hidden");
    loader.style.display = "none";
  }
});
