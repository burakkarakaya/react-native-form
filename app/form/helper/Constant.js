/* 
  form için gerekli iconlar burdan tanımlanır 
*/
export const ICONS = {
  loading: require("../assets/loading.gif"),
  checkBig: require("../assets/check-big.png"),
  drpIco: require("../assets/drpIco.png"),
  startFull: require('../assets/star-full.png'),
  starEmpty: require('../assets/star-empty.png'),
  calendar: require('../assets/calendar.png'),
  trash: require("../assets/trash.png"),
  check: require("../assets/check.png"),
  close: require("../assets/close.png"),
};

/* 
  form style, components->container.js 
*/
export const FORMSTYLE = {
  LIGHT: {
    BORDER_WIDTH: 0,
    BORDER_COLOR: 'rgba(255, 255, 255, 0)',
    TITLE_COLOR: '#FFFFFF',
    ERROR_COLOR: '#d3838d',
    BACKGROUND_COLOR: 'rgba(255, 255, 255, 0.4)'
  },
  DARK: {
    BORDER_WIDTH: 1,
    BORDER_COLOR: '#dddddd',
    TITLE_COLOR: '#9b9b9b',
    ERROR_COLOR: '#d3838d',
    BACKGROUND_COLOR: '#FFFFFF'
  }
};

/* 
  Redux Action
*/
export const SHOW_PRELOADING = "SHOW_PRELOADING";
export const SHOW_CUSTOM_POPUP = "SHOW_CUSTOM_POPUP";