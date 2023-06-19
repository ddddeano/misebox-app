export const useDevice = () => {
  let device = ref(process.server ? 'mobile' : 'desktop');

  if (process.client) {
    const { width } = useWindowSize();

    const getDeviceType = (widthValue) => {
      const breakpointValues = Object.values(breakpoints).map((value) =>
        parseInt(value),
      );
      const index = breakpointValues.findIndex((value) => widthValue < value);
      return index >= 0 ? Object.keys(breakpoints)[index] : 'desktop';
    };

    // Set initial device type
    device.value = getDeviceType(parseInt(width.value));

    // Watch for changes in screen width and update device type
    watch(width, (newWidthValue) => {
      device.value = getDeviceType(parseInt(newWidthValue));
    });
  }

  return { device };
};
