//Delete and incorporate into wt file?
//This is only temporary for the different chakras for each of the 7 days as a little design element for the workout plan
//screen

import type { ImageSourcePropType } from "react-native";
import { theme } from "../styles/theme";

// each chakra should contain a name, its sanskrit name, its color, and the symbol that represents it
export type Chakra = {
  name: string;
  sanskritName: string;
  color: string;
  symbol: string;
  image: ImageSourcePropType;
};

export const chakraImages = {
  root: require("../assets/chakras/root.png"),
  sacral: require("../assets/chakras/sacral.png"),
  solarPlexus: require("../assets/chakras/solarPlexus.png"),
  heart: require("../assets/chakras/heart.png"),
  throat: require("../assets/chakras/throat.png"),
  thirdEye: require("../assets/chakras/thirdEye.png"),
  crown: require("../assets/chakras/crown.png"),
};

// 7 chakra symbols for use in app development - TODO: look online
//What is the order? (random, each isn't REALLy associated with a day of the week but people do group them so we can
//kind of play along and add those as well)
//https://www.coolsymbol.top/all-symbol.html
export const chakras: Record<string, Chakra> = {

  // Monday - Root
  Monday: {
    name: "Root",
    sanskritName: "Muladhara",
    color: theme.chakras.root,
    //temporary symbol for all, need to import
    symbol: "◇",
    image: chakraImages.root
  },

  // Tuesday - Sacral
  Tuesday: {
    name: "Sacral",
    sanskritName: "Svadhisthana",
    color: theme.chakras.sacral,
    symbol: "◈",
    image: chakraImages.sacral
  },

  // Wednesday - Solar Plexus
  Wednesday: {
    name: "Solar Plexus",
    sanskritName: "Manipura",
    color: theme.chakras.solarPlexus,
    symbol: "△",
    image: chakraImages.solarPlexus
  },

  // Thursday - Heart
  Thursday: {
    name: "Heart",
    sanskritName: "Anahata",
    color: theme.chakras.heart,
    symbol: "✧",
    image: chakraImages.heart
  },

  // Friday - Throat
  Friday: {
    name: "Throat",
    sanskritName: "Vishuddha",
    color: theme.chakras.throat,
    symbol: "○",
    image: chakraImages.throat
  },

  // Saturday - Thrd Eye
  Saturday: {
    name: "Third Eye",
    sanskritName: "Ajna",
    color: theme.chakras.thirdEye,
    symbol: "◉",
    image: chakraImages.thirdEye
  },

  // Sunday - Crown
  Sunday: {
    name: "Crown",
    sanskritName: "Sahasrara",
    color: theme.chakras.crown,
    symbol: "✺",
    image: chakraImages.crown
  },
};
