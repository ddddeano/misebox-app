export function useShowNav() {
  const showNav = ref(false);

  const toggleNav = () => {
    showNav.value = !showNav.value;
  };

  const closeNav = () => {
    showNav.value = false;
  };

  return {
    showNav,
    toggleNav,
    closeNav,
  };
}
