<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ColorGrid />
  </div>
</template>

<script setup></script>

<style lang="scss">
:root {
  --box-shadow-element: 0 0 10px rgba(0, 0, 0, 0.2);
  --box-shadow-button: 0 0 10px rgba(0, 0, 0, 0.2);
  --box-shadow-hover: 0px 2px 6px rgba(0, 0, 0, 0.2);
}

@import "@/assets/styles/colorTheme1.scss";
@import "@/assets/styles/defaults.scss";
@import "@/assets/styles/global.scss";
.icon {
  // <IconCSS name="uil:github" class="icon" />
  font-size: 2rem;
}
.welcome {
  font-family: "Didact Gothic", sans-serif;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
  background-color: var(--secondary-color);
  box-shadow: var(--box-shadow-element);
  padding: 1rem;
  border-radius: 0.5rem;
  line-height: 2rem;
  color: var(--primary-color-dark);
}
.index {
  // width: 100%;
  // display: flex;
  // flex-direction: column;
  // text-align: center;
  // padding: 2rem;
  // background-color: #d31616;
  // border-radius: 4px;
  // box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
.title {
  width: 100%;
  text-align: left;
  font-size: 1rem;
  margin-top: 1rem;
}
</style>
