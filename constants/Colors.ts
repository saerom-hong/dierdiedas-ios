export interface ColorScheme {
  primary: string;
  secondary: string;
  text: string;
  text_dark: string;
  chip_color_der: string;
  chip_color_die: string;
  chip_color_das: string;
  title: string;
  background: string;
  background_play: string;
  background_wordbox: string;
  background_wordbox_shadow: string;
  background_wordbox_correct: string;
  background_wordbox_incorrect: string;
  background_placeholder: string;
  background_tutorial_bubble: string;
  button_tutorial: string;
}

export const Colors: ColorScheme = {
  primary: "#347433",
  secondary: "#FF6F00",
  text: "#FFFFFF",
  text_dark: "#000000",
  chip_color_der: "#C62F32",
  chip_color_die: "#FFBB00",
  chip_color_das: "#3EC03E",
  title: "#201e2b",
  background: "#045CE6",
  background_play: "#334B82",
  background_wordbox: "#1C2444", 
  background_wordbox_shadow: "#0CBFBD",
  background_wordbox_correct: "#28a745",
  background_wordbox_incorrect: "#dc3545",
  background_placeholder: "#ececec",
  background_tutorial_bubble: "rgba(255, 255, 255, 0.6)",
  button_tutorial: "#2563eb",
}; 