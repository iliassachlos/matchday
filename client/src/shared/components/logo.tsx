type LogoProps = {
  size?: number
}

// The seats that draw the M on a 5 × 5 grid, as [x, y] in a 64 × 64 box
const M_SEATS = [
  [11, 11],
  [47, 11],
  [11, 20],
  [20, 20],
  [38, 20],
  [47, 20],
  [11, 29],
  [47, 29],
  [11, 38],
  [47, 38],
  [11, 47],
  [47, 47],
]

export const Logo = ({ size = 32 }: LogoProps) => {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#121821" />
      {M_SEATS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" rx="1.5" fill="#E8EDF2" />
      ))}
      <rect x="29" y="29" width="6" height="6" rx="1.5" fill="#C8FF3D" />
    </svg>
  )
}
