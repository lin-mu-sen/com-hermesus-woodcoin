import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function BitcoinIcon({size,...props}: SvgProps&{size?:number}) {
  return (
    <Svg
      width={size || 36}
      height={size || 36}
      viewBox="0 0 36 36"
      fill="none"
      {...props}
    >
      <Path
        d="M35.46 22.357c-2.402 9.642-12.17 15.51-21.816 13.104C4 33.054-1.866 23.29.54 13.648 2.947 4.005 12.71-1.866 22.353.54c9.643 2.406 15.514 12.17 13.107 21.816z"
        fill="#FFC648"
      />
    </Svg>
  );
}

export default BitcoinIcon;