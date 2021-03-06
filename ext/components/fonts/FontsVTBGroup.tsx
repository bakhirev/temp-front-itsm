import { createGlobalStyle } from 'styled-components';

import VTBGroupUI_Medium_eot from './VTBGroupUI-Medium/VTBGroupUI-Medium.eot';
import VTBGroupUI_Medium_woff2 from './VTBGroupUI-Medium/VTBGroupUI-Medium.woff2';
import VTBGroupUI_Medium_woff from './VTBGroupUI-Medium/VTBGroupUI-Medium.woff';
import VTBGroupUI_Medium_ttf from './VTBGroupUI-Medium/VTBGroupUI-Medium.ttf';
import VTBGroupUI_Medium_svg from './VTBGroupUI-Medium/VTBGroupUI-Medium.svg';
import VTBGroupUI_Regular_eot from './VTBGroupUI-Regular/VTBGroupUI-Regular.eot';
import VTBGroupUI_Regular_woff2 from './VTBGroupUI-Regular/VTBGroupUI-Regular.woff2';
import VTBGroupUI_Regular_woff from './VTBGroupUI-Regular/VTBGroupUI-Regular.woff';
import VTBGroupUI_Regular_ttf from './VTBGroupUI-Regular/VTBGroupUI-Regular.ttf';
import VTBGroupUI_Regular_svg from './VTBGroupUI-Regular/VTBGroupUI-Regular.svg';

console.log(`VTBGroupUI_Medium_woff2 url: ${VTBGroupUI_Medium_woff2}`);
export const FontsVTBGroup = createGlobalStyle`
  @font-face {
    font-family: 'VTB Group UI';
    src: url('${VTBGroupUI_Medium_eot}');
    src: url('${VTBGroupUI_Medium_eot}?#iefix') format('embedded-opentype'),
      url('${VTBGroupUI_Medium_woff2}') format('woff2'),
      url('${VTBGroupUI_Medium_woff}') format('woff'),
      url('${VTBGroupUI_Medium_ttf}') format('truetype'),
      url('${VTBGroupUI_Medium_svg}#VTBGroupUIWeb-Book') format('svg');
    font-weight: 500;
    font-style: normal;
    font-feature-settings: 'tnum' on, 'lnum' on, 'cv03' on, 'cv04' on;
  }

  @font-face {
    font-family: 'VTB Group UI';
    src: url('${VTBGroupUI_Regular_eot}');
    src: url('${VTBGroupUI_Regular_eot}?#iefix') format('embedded-opentype'),
      url('${VTBGroupUI_Regular_woff2}') format('woff2'),
      url('${VTBGroupUI_Regular_woff}') format('woff'),
      url('${VTBGroupUI_Regular_ttf}') format('truetype'),
      url('${VTBGroupUI_Regular_svg}#VTBGroupUIWeb-Book') format('svg');
    font-weight: normal;
    font-style: normal;
    font-feature-settings: 'tnum' on, 'lnum' on, 'cv03' on, 'cv04' on;
  }
`;
