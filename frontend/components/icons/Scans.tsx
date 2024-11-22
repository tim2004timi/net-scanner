function Scans({ size }: { size?: number }) {
  return (
    <svg
      width={size ?? 16}
      height={size ?? 16}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.581 5.954C16.01 6.88 16.25 7.912 16.25 9C16.25 13.004 13.004 16.25 9 16.25C4.996 16.25 1.75 13.004 1.75 9C1.75 4.996 4.996 1.75 9 1.75C11.002 1.75 12.815 2.561 14.126 3.873'
        stroke='#A1A1AA'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.744 8.791C12.748 8.86 12.75 8.93 12.75 9C12.75 11.071 11.071 12.75 9 12.75C6.929 12.75 5.25 11.071 5.25 9C5.25 6.929 6.929 5.25 9 5.25C10.036 5.25 10.973 5.67 11.652 6.348'
        stroke='#A1A1AA'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9 9L15.75 2.25'
        stroke='#A1A1AA'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default Scans;
