<template>
  <footer>
    <div class="footer-content">
      <div class="footer-section">
        <h2>Contact Us</h2>
        <ul>
          <li>Nr 21</li>
          <li>Bachtalenweg</li>
          <li>Ringgenberg</li>
          <li>Interlaken</li>
          <li>3852</li>
          <li>d.m.watson1985@gmail.com</li>
        </ul>
      </div>

      <div class="footer-section">
        <h2>Follow Us</h2>
        <ul class="social-links">
          <li>
            <a href="#"><i class="fab fa-facebook fa-lg"></i></a>
          </li>
          <li>
            <a href="#"><i class="fab fa-twitter fa-lg"></i></a>
          </li>
          <li>
            <a href="#"><i class="fab fa-instagram fa-lg"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Footer Styles */
footer {
  /* color: var(--primary-color); */
  text-align: center;
  padding: 2rem;
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.footer-section {
  flex-basis: 100%;
  margin-bottom: 2rem;
}

.footer-section h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.footer-section p {
  margin-bottom: 1.5rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.social-links {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.social-links li {
  margin: 0 1rem;
}

.social-links a {
  /* color: var(--secondary-color); */
}

.social-links a:hover {
  /* color: var(--tertiary-color); */
}
</style>
