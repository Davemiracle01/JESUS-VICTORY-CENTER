can you edit the images to be sliding <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Jesus Victory Center | Faith • Hope • Victory</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta
    name="description"
    content="Jesus Victory Center is a Christ-centered church in Nairobi, Kenya, committed to worship, discipleship, and transforming lives through Jesus Christ."
  />

  <!-- Preload first visible image -->
  <link rel="preload" as="image" href="/images/img-1.jpg">

  <link rel="stylesheet" href="style.css" />
</head>

<body>

<!-- NAVIGATION -->
<nav class="navbar">
  <div class="brand">Jesus Victory Center</div>
  <div class="nav-links">
    <a href="index.html" class="active">Home</a>
    <a href="about.html">About</a>
    <a href="sermons.html">Sermons</a>
    <a href="contact.html">Contact</a>
  </div>
</nav>

<!-- HERO -->
<header class="hero">
  <div class="hero-content">
    <h1>Faith • Hope • Victory</h1>
    <p>
      A place of worship, prayer, and love — where lives are transformed
      through the grace of Jesus Christ.
    </p>
    <a href="#welcome" class="btn">You Are Welcome Here</a>
  </div>
</header>

<main>

  <!-- WELCOME -->
  <section id="welcome">
    <div class="wrap">
      <div class="welcome-card">
        <h2>Welcome to Jesus Victory Center</h2>
        <p>
          We are a Christ-centered church committed to worship, discipleship,
          and building a loving community rooted in the Word of God.
        </p>
        <p class="muted">
          Whether you are seeking hope, healing, or spiritual growth,
          our doors and hearts are open to you.
        </p>
      </div>
    </div>
  </section>

  <!-- CTA BUTTONS -->
  <div class="wrap cta-buttons">
    <a href="about.html" class="btn">Discover Our Church</a>
    <a href="contact.html" class="btn">Contact Us</a>
    <a href="sermons.html" class="btn">Listen to Our Sermons</a>
  </div>

  <!-- GALLERY -->
  <section class="img-section">
    <div class="wrap">
      <h2 class="section-title">Life in Our Church</h2>
      <p class="muted center">Moments of worship, fellowship, and service.</p>

      <div class="img-grid">
        <!-- First image (higher priority if near top) -->
        <img src="/images/img-1.jpg" 
             alt="Church worship moment"
             width="400" height="300"
             fetchpriority="high"
             decoding="async">

        <!-- Lazy loaded images -->
        <img src="/images/img-2.jpg" alt="Church fellowship moment"
             width="400" height="300"
             loading="lazy" decoding="async">

        <img src="/images/img-3.jpg" alt="Church prayer gathering"
             width="400" height="300"
             loading="lazy" decoding="async">

        <img src="/images/img-4.jpg" alt="Church service moment"
             width="400" height="300"
             loading="lazy" decoding="async">

        <img src="/images/img-5.jpg" alt="Church choir worship"
             width="400" height="300"
             loading="lazy" decoding="async">

        <img src="/images/img-6.jpg" alt="Church congregation"
             width="400" height="300"
             loading="lazy" decoding="async">

        <img src="/images/img-7.jpg" alt="Church outreach event"
             width="400" height="300"
             loading="lazy" decoding="async">

        <img src="/images/img-8.jpg" alt="Church community gathering"
             width="400" height="300"
             loading="lazy" decoding="async">
      </div>
    </div>
  </section>

</main>

<!-- FOOTER -->
<footer>
  © <span id="year"></span> Jesus Victory Center · All Rights Reserved
</footer>

<script defer>
  document.getElementById("year").textContent = new Date().getFullYear();
</script>

</body>
</html>
