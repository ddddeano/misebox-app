export const useDeliveryZones = () => {
  const zones = [
    {
      name: "Ringgenberg",
    },
    {
      name: "Interlaken",
    },
    {
      name: "Matten",
    },
    {
      name: "Wilderswil",
    },
    {
      name: "Unterseen",
    },
  ];

  const zoneNames = zones.map((zone) => zone.name);

  return { zones, zoneNames };
};
