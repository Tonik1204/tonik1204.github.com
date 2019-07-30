# [Weather-Forecast](https://tonik1204.github.io/weather-forecast/)

<!-- TOC -->

Responsive single HTML page displaying a 5 day weather forecast.

- App was created with help of `Create React App`.

- Technology stack used: `React(Hooks), Typescript, styled-components, webpack, npm, axios, moment, jest, enzyme`.

- API used: [weather-forecast](https://openweathermap.org/forecast5), [city-finder](https://developers.teleport.org/api/).

Current solution is fully responsive and fits all modern browsers.

## Init

<!-- TOC -->

Since `Create React App` uses latest packages, the only thing you might need is the latest npm and node: `npm install -g npm@latest` and `npm install -g node@latest`. If you are Windows user just get the latest version from https://nodejs.org/

To start project locally just run `npm install` and then `npm start`, or if you preffer `yarn install` and `yarn start`.

No need to do additional `build` steps, http://localhost:3000/ should be opened automatically in your browser with current page.

To test project run `npm test` or `yarn test`.
Next please follow the instructions in your terminal:

```sh
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

### Live Demo: [weather-forecast](https://tonik1204.github.io/weather-forecast/)

## Motivation

<!-- TOC -->

There are a lot of weather forecast apps with lots of data indicators and parameters. This is most simple and fast solution, based on new React Hooks API. Due to lack of possibility to try it on a real project, the curent app looks the best fit.
The idea is to create app without additional state container libraries(Redux) and use only React tools.

## Next steps

<!-- TOC -->

- Fully cover code with unit and integration tests
- Include IE 11 support, improve HTML Accessibility and keyboard navigation
- Add country/city name detection by geolocation - [x]
- Add weather map with help of [weather-map-api](https://openweathermap.org/api/weather-map-2)
- Add 16 day / daily weather forecast with help of [weather-forecast-16](https://openweathermap.org/forecast16)
- Add routes, integrate login/logout/register system and bind app with some analytical tool
