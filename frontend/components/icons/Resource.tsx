function Resource({ size }: { size?: number }) {
  return (
    <svg
      width={size ?? 16}
      height={size ?? 16}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3 3H15C15.1989 3 15.3897 3.07902 15.5303 3.21967C15.671 3.36032 15.75 3.55109 15.75 3.75V6.75C15.75 6.94891 15.671 7.13968 15.5303 7.28033C15.3897 7.42098 15.1989 7.5 15 7.5H3C2.80109 7.5 2.61032 7.42098 2.46967 7.28033C2.32902 7.13968 2.25 6.94891 2.25 6.75V3.75C2.25 3.55109 2.32902 3.36032 2.46967 3.21967C2.61032 3.07902 2.80109 3 3 3ZM6.75 6H7.5V4.5H6.75V6ZM3.75 4.5V6H5.25V4.5H3.75ZM6 12H8.25V9.75H9.75V12H12V13.5H9.75V15.75H8.25V13.5H6V12Z'
        fill='white'
      />
    </svg>
  );
}

export default Resource;