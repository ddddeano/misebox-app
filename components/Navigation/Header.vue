<template>
  <header>
    <div class="elements">
      <NavigationLogo />
      <div class="header-right">
        <client-only>
        <h1>"Avatar"</h1>
        </client-only>
      </div>
    </div>
  </header>
</template>

<script setup>

</script>

<style scoped>
.elements {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (min-width: 768px) {
    width: 90%;
    margin: auto;
  }

  @media (min-width: 992px) {
    width: 70%;
    margin: auto;
  }
}

.header-right {
  display: flex;
  align-items: center;
}
</style>


<style scoped lang="scss">
.elements {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (min-width: 768px) {
    width: 90%;
    margin: auto;
  }

  @media (min-width: 992px) {
    width: 70%;
    margin: auto;
  }
}

.header-right {
  display: flex;
  align-items: center;
}
</style>
