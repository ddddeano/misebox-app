<!-- FrameworkFooter -->
<template>
  <footer>
    <div class="footer-content">
      <div class="footer-section">
        <h3>Contact</h3>
        <ul>
          <li>Misebox HQ, 21</li>
          <li>Bachtalenweg</li>
          <li>Ringgenberg</li>
          <li>Interlaken</li>
          <li>3852</li>
          <li>misebox@misebox.app</li>
        </ul>
      </div>

      <div class="footer-section">
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
      <FrameworkLogo />
    </div>
  </footer>
</template>

<style scoped>
/* Footer Styles */
footer {
  text-align: center;
  padding: 2rem;
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.footer-section {
  flex-basis: 100%;
  margin-bottom: 1rem;
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
  color: var(--secondary-color);
}

.social-links a:hover {
  color: var(--dev-todo);
}
</style>
