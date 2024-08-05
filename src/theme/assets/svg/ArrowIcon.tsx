import { Defs, G, Path, Svg } from "react-native-svg"

export default function ArrowIcon({
  width = 24,
  height = 24,
  color = "#000",
}: {
  width?: number
  height?: number
  color?: string
}) {
  return (
    <Svg width={width} height={height} fill={color} viewBox="0 -4.5 20 20">
      <Defs></Defs>
      <G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <G
          id="Dribbble-Light-Preview"
          transform="translate(-220.000000, -6684.000000)"
          fill={color}
        >
          <G id="icons" transform="translate(56.000000, 160.000000)">
            <Path
              d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"
              id="arrow_down-[#338]"
            ></Path>
          </G>
        </G>
      </G>
    </Svg>
  )
}
