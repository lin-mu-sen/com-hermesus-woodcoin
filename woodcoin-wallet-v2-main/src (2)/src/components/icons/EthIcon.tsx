import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function BitcoinIcon({ size, ...props }: SvgProps & { size?: number }) {
  return (
    <Svg
      width={size || 36}
      height={size || 36}
      viewBox="0 0 36 36"
      fill="none"
      {...props}
    >
      <Path
        d="M35.898 18c0 9.89-8.016 17.906-17.905 17.906C8.104 35.906.088 27.889.088 18 .088 8.112 8.104.095 17.993.095 27.882.095 35.898 8.112 35.898 18"
        fill="#fff"
        fillOpacity={0.2}
      />
    </Svg>
  );
}

export default BitcoinIcon;