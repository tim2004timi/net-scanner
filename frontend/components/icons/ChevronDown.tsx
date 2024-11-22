function ChevronDown({ size }: { size?: number }) {
  return (
    <svg
      width={size ?? 16}
      height={size ?? 16}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_1084_240)'>
        <path
          d='M4 6L8 10L12 6'
          stroke='#A1A1AA'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_1084_240'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ChevronDown;
