import React from "react"

import { Defs, Image, Path, Pattern, Rect, Svg, Use } from "react-native-svg"

const LogoIcon = ({
  width = 24,
  height = 24,
  color = "#000",
}: {
  width?: number
  height?: number
  color?: string
}) => (
  <Svg width={width} height={height} viewBox="0 0 512 512" fill="none">
    <Rect width="512" height="512" rx="60" fill="url(#pattern0_585_23)" />
    <Defs>
      <Pattern id="pattern0_585_23" patternContentUnits="objectBoundingBox" width="1" height="1">
        <Use href="#image0_585_23" transform="scale(0.000976562)" />
      </Pattern>
      <Image
        id="image0_585_23"
        width="1024"
        height="1024"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAYAAAB/HSuDAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAC6bSURBVHgB7d1NjFXngebx121kvkJ1YEyLKqNOwFJDiLtHMmYWgzdt2IzkNrMwq+CRHLWjthfxLvGCllqKN/YuackeyZrMwvTKXoQeRpoFEI0UxguCF4lMwBI41uAqNPRAughfEchT73UqiScG7j3369z7/H5SqWgpC6wubt3nf95z7gOvPPbepwUAAACYan9SAAAAgKknAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAA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AAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAAIAAAAABBAAAAAAIIAAAAAAAAEEAAAAAAggAAAAAEAAAQAAAAACCAAAAAAQQAAAAACAAP8PBOxaGfbYMqMAAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
)

export default LogoIcon
