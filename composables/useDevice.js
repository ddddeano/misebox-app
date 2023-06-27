export const useDevice = () => {
  const device = ref(process.server ? 'mobile' : 'desktop');

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
      const newDeviceType = getDeviceType(parseInt(newWidthValue));
      if (newDeviceType !== device.value) {
        console.log(`Device changed: ${device.value} => ${newDeviceType}`);
        device.value = newDeviceType;
      }
    });
  }

  return { device };
};

export const breakpoints = {
  mobile: '576px',
  tablet: '768px',
  desktop: '992px',
};
