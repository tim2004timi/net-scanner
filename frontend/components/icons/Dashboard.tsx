function Dashboard({ size }: { size?: number }) {
  return (
    <svg
      width={size ?? 16}
      height={size ?? 16}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.25 8.38V6.996C15.25 6.684 15.104 6.389 14.855 6.2L9.605 2.21C9.247 1.938 8.752 1.938 8.395 2.21L3.145 6.2C2.896 6.389 2.75 6.684 2.75 6.996V14.25C2.75 15.354 3.645 16.25 4.75 16.25H9.504'
        stroke='#A1A1AA'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.5 10.75L17.25 12V14.94C17.25 16.48 14.5 17.25 14.5 17.25C14.5 17.25 11.75 16.48 11.75 14.94V12L14.5 10.75Z'
        stroke='#A1A1AA'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default Dashboard;
