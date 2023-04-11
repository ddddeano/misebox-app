export const useDevice = () => {
  const { width } = useWindowSize();
  const device = ref("");

  const getDeviceType = (widthValue) => {
    const breakpointValues = Object.values(breakpoints).map((value) => parseInt(value));
    const index = breakpointValues.findIndex((value) => widthValue < value);
    return index >= 0 ? Object.keys(breakpoints)[index] : "desktop";
  };

  // Set initial device type
  device.value = getDeviceType(parseInt(width.value));

  // Watch for changes in screen width and update device type
  watch(width, (newWidthValue) => {
    device.value = getDeviceType(parseInt(newWidthValue));
    console.log("device:", device.value);
  });

  return { device };
};
