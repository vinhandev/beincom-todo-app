import React from "react"

import { Rect, Svg } from "react-native-svg"

const MenuIcon = ({
  width = 24,
  height = 24,
  color = "#000",
}: {
  width?: number
  height?: number
  color?: string
}) => (
  <Svg width={width} height={height} fill={color} viewBox="0 0 24 24" id="menu">
    <Rect width="18" height="2" x="3" y="11" rx=".95" ry=".95"></Rect>
    <Rect width="18" height="2" x="3" y="16" rx=".95" ry=".95"></Rect>
    <Rect width="18" height="2" x="3" y="6" rx=".95" ry=".95"></Rect>
  </Svg>
)

export default MenuIcon
