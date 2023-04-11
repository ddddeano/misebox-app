<template>
  <div class="color-grid">
    <ColorSample class="color-box primary-color" name="Primary Color" color="var(--primary-color)" />
    <ColorSample class="color-box primary-color-light" name="Primary Color Light" color="var(--primary-color-light)" />
    <ColorSample class="color-box primary-color-dark" name="Primary Color Dark" color="var(--primary-color-dark)" />
    <ColorSample class="color-box secondary-color" name="Secondary Color" color="var(--secondary-color)" />
    <ColorSample class="color-box secondary-color-light" name="Secondary Color Light" color="var(--secondary-color-light)" />
    <ColorSample class="color-box secondary-color-dark" name="Secondary Color Dark" color="var(--secondary-color-dark)" />
    <ColorSample class="color-box tertiary-color" name="Tertiary Color" color="var(--tertiary-color)" />
    <ColorSample class="color-box tertiary-color-light" name="Tertiary Color Light" color="var(--tertiary-color-light)" />
    <ColorSample class="color-box tertiary-color-dark" name="Tertiary Color Dark" color="var(--tertiary-color-dark)" />
    <ColorSample class="color-box quaternary-color" name="Quaternary Color" color="var(--quaternary-color)" />
    <ColorSample class="color-box quaternary-color-light" name="Quaternary Color Light" color="var(--quaternary-color-light)" />
    <ColorSample class="color-box quaternary-color-dark" name="Quaternary Color Dark" color="var(--quaternary-color-dark)" />
    <ColorSample class="color-box quinary-color" name="Quinary Color" color="var(--quinary-color)" />
    <ColorSample class="color-box quinary-color-light" name="Quinary Color Light" color="var(--quinary-color-light)" />
    <ColorSample class="color-box quinary-color-dark" name="Quinary Color Dark" color="var(--quinary-color-dark)" />
    <ColorSample class="color-box background-color" name="Background Color" color="var(--background-color)" />
    <ColorSample class="color-box text-color" name="Text Color" color="var(--text-color)" />
    <ColorSample class="color-box text-color-light" name="Text Color Light" color="var(--text-color-light)" />
    <ColorSample class="color-box text-color-muted" name="Text Color Muted" color="var(--text-color-muted)" />
    <ColorSample class="color-box accent-color" name="Accent Color" color="var(--accent-color)" />
    <ColorSample class="color-box accent-color-light" name="Accent Color Light" color="var(--accent-color-light)" />
    <ColorSample class="color-box accent-color-dark" name="Accent Color Dark" color="var(--accent-color-dark)" />
    <ColorSample class="color-box alert-color" name="Alert Color" color="var(--alert-color)" />
    <ColorSample class="color-box alert-color-light" name="Alert Color Light" color="var(--alert-color-light)" />
    <ColorSample class="color-box alert-color-dark" name="Alert Color Dark" color="var(--alert-color-dark)" />
    <ColorSample class="color-box notification-color" name="Notification Color" color="var(--notification-color)" />
    <ColorSample class="color-box notification-color-light" name="Notification Color Light" color="var(--notification-color-light)" />
    <ColorSample class="color-box notification-color-dark" name="Notification Color Dark" color="var(--notification-color-dark)" />
  </div>
</template>

<script setup></script>

<style lang="scss">
.color-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
}
</style>
