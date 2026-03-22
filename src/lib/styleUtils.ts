export const profilesStyles = [
  { accent: "#C0272D", shadowMove: "-4px 4px 0px #C0272D", rotate: -1, yOffset: -5 },
  { accent: "#1A1A1A", shadowMove: "4px -4px 0px #1A1A1A", rotate: 2, yOffset: -8 },
  { accent: "#8A1C20", shadowMove: "-6px -6px 0px #8A1C20", rotate: -2, yOffset: -6 },
  { accent: "#333333", shadowMove: "6px 6px 0px #333333", rotate: 1, yOffset: -10 },
  { accent: "#E53E3E", shadowMove: "0px 8px 0px #E53E3E", rotate: -1.5, yOffset: -7 },
];

export const getProfileStyle = (id: string = '') => {
  const safeId = id || 'fallback';
  const charSum = safeId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return profilesStyles[charSum % profilesStyles.length];
};
