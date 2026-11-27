//Full colorpalette theme from figma design (Green, Yellow, Red, etc)
//Want all 7 chakra colors

//hades inspired colors

export const theme = {
  //main darker background
  background: "#171A17",
  stone: "#292A24",
  stoneDark: "#20231E",
  forest: "#263D32",

  //accent
  gold: "#C5A46A",
  goldDark: "#816C46",

  //for the text
  parchment: "#E8DCC4",
  mutedText: "#A9A99A",

  //for the borders
  border: "#61563D",

  // extra colors for a dark fantasy type UI (Hadesesque)
  black: "#101110",
  panel: "#1C1C1C",
  button: "#5B4019",
  buttonBorder: "#9C772A",
  goldHighlight: "#D6A94D",

    // Transparent overlays
  overlay: "rgba(0, 0, 0, 0.25)",
  panelOverlay: "rgba(15, 15, 15, 0.85)",

  // Additional shared UI colors
  text: "#FFFFFF",
  selectedBorder: "#FFFFFF",
  cornerBorder: "#76501C",

  // all 7 chakras, each has a different color, we want them to be less bright and more "artisinal"
  chakras: {
    root: "#B85750",
    sacral: "#D88A4D",
    solarPlexus: "#D7B75B",
    heart: "#70A57A",
    throat: "#6CA6C6",
    thirdEye: "#8A83C3",
    crown: "#B68CC2",
  },

};
