
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'futura';
  src: url('../fonts/futura/futura-bold-03-webfont.woff2') format('woff2'),
    url('../fonts/futura/futura-bold-03-webfont.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'futura narrow';
  src: url('../fonts/futura/futura-condensedextrabold-05-webfont.woff2') format('woff2'),
    url('../fonts/futura/futura-condensedextrabold-05-webfont.woff') format('woff');
  font-weight: 900;
  font-style: normal;
  font-display: swap;

}

@font-face {
  font-family: 'futura narrow';
  src: url('../fonts/futura/futura-condensedmedium-04-webfont.woff2') format('woff2'),
    url('../fonts/futura/futura-condensedmedium-04-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;

}

@font-face {
  font-family: 'futura';
  src: url('../fonts/futura/futura-medium-01-webfont.woff2') format('woff2'),
    url('../fonts/futura/futura-medium-01-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;

}

@font-face {
  font-family: 'futura';
  src: url('../fonts/futura/futura-mediumitalic-02-webfont.woff2') format('woff2'),
    url('../fonts/futura/futura-mediumitalic-02-webfont.woff') format('woff');
  font-weight: normal;
  font-style: italic;
  font-display: swap;

}

@font-face {
  font-family: 'Roboto Flex';
  src: url('https://pixelambacht.nl/remote/RobotoFlex[slnt,wdth,wght,opsz].woff2')
      format('woff2 supports variations'),
    url('https://pixelambacht.nl/remote/RobotoFlex[slnt,wdth,wght,opsz].woff2')
      format('woff2-variations');
  font-weight: 100 1000;
  font-stretch: 25% 300%;
  font-display: swap;
}

html,
body {
  height: 100%;
  font-size: 1.1rem;
  font-family: Futura, Optima, Arial, Helvetica, sans-serif;
  font-variation-settings: 'wght' 444, 'wdth' 111, 'opsz' 72
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style-type: none;
}

:root {
  --headerHeight: 70px;
  --mainHeight: calc(100vh - var(--headerHeight));
  
  --pageWidth: 60ch;
  --unit: 0.5rem;

  --dodger-blue: #1e90ffff;
  --opal: #c2d3cdff;
  --dark-liver: #56494cff;
  --sandy-brown: #f29e4cff;

}`;


export default GlobalStyle