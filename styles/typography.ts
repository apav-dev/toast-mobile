import { TextStyle } from "react-native";

type FontFamily = "regular" | "semiBold" | "bold";
export const fontFamily: Record<FontFamily, string> = {
  regular: "Sora_400Regular",
  semiBold: "Sora_600SemiBold",
  bold: "Sora_700Bold",
};

type FontSize = "x10" | "x20" | "x30" | "x40" | "x50" | "x60" | "x70";
export const fontSize: Record<FontSize, TextStyle> = {
  x10: {
    fontSize: 13,
  },
  x20: {
    fontSize: 14,
  },
  x30: {
    fontSize: 16,
  },
  x40: {
    fontSize: 19,
  },
  x50: {
    fontSize: 24,
  },
  x60: {
    fontSize: 32,
  },
  x70: {
    fontSize: 38,
  },
};
