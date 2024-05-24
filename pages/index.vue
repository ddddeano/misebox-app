<template>
  <div class="home-page">
    <h1>Welcome to Our Site</h1>
    <ul>
      <li>
        <router-link to="/misebox-users" class="router-link">Meet Our Misebox Users</router-link>
      </li>
      <li>
        <router-link to="/professionals" class="router-link">Meet Our Professionals</router-link>
      </li>
      <li>
        <router-link to="/dummy" class="router-link">Dummy</router-link>
      </li>
    </ul>
  </div>
</template>

<style>
.home-page {
  text-align: center;
  padding: 20px;
}

.home-page h1 {
  margin-bottom: 20px;
}

ul {
  list-style: none; /* Removes default list styling */
  padding: 0;
}

li {
  margin-bottom: 10px; /* Adds spacing between list items */
}

.router-link {
  display: inline-block; /* Aligns link correctly and allows padding */
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s; /* Smooth transition for hover effect */
}

.router-link:hover {
  background-color: #0056b3; /* Darker blue on hover for better interaction feedback */
}
</style>
