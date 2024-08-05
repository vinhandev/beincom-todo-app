import React from "react"

import { Path, Svg } from "react-native-svg"

const PlusIcon = ({
  width = 24,
  height = 24,
  color = "#000",
}: {
  width?: number
  height?: number
  color?: string
}) => (
  <Svg viewBox="0 0 24 24" fill={color} width={width} height={height}>
    <Path d="M19 11h-6V5a1 1 0 00-2 0v6H5a1 1 0 000 2h6v6a1 1 0 002 0v-6h6a1 1 0 000-2z"></Path>
  </Svg>
)

export default PlusIcon
