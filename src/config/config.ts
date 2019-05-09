const API_KEY = '19dbd912b0a14c54b850b2f480f357fc';
const MAX_DAY_HOURS = 20;
const MIN_DAY_HOURS = 6;

const hours = new Date().getHours();

const config = {
  forecast_api_url: `http://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}`,
  city_api_url: `https://api.teleport.org/api/cities/?embed=city:search-results/city:item/{city:country,city:admin1_division,city:timezone/tz:offsets-now,city:urban_area}&limit=10&search=`,
  forecast_icons_url: 'http://openweathermap.org/img/w/',
};

export const toastTimer = 12000;

export const isDayTime = hours > MIN_DAY_HOURS && hours < MAX_DAY_HOURS;

export const breakpoints = {
  mobile: '425px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px',
};

export const device = {
  mobile: `(max-width: ${breakpoints.mobile})`,
  tablet: `(max-width: ${breakpoints.tablet})`,
  laptop: `(max-width: ${breakpoints.laptop})`,
  desktop: `(max-width: ${breakpoints.desktop})`,
};

export const symbols = {
  celsius: '\u2103',
};

export default config;
