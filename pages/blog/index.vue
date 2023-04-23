<template>
  <div class="index">
    <h1 class="title">Blog</h1>
    <div class="description">we update our blog on the regular so please subscribe to keep in the loop</div>
    <button class="button">Turn on Notifications</button>
    <div class="posts" v-for="post in posts">
      <Post :post="post" />
    </div>
  </div>
</template>

<script setup>
const { data: posts } = await useFetch("/api/posts");
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  margin: auto;
}
</style>
