function Reload({ size }: { size?: number }) {
  return (
    <svg
      width={size ?? 16}
      height={size ?? 16}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_1084_264)'>
        <path
          d='M16.6666 9.16667C16.4628 7.70018 15.7825 6.34138 14.7304 5.29958C13.6784 4.25778 12.313 3.59077 10.8446 3.40129C9.37624 3.21182 7.88627 3.5104 6.60425 4.25104C5.32224 4.99167 4.31929 6.13328 3.74992 7.5M3.33325 4.16667V7.5H6.66659'
          stroke='#A1A1AA'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M3.33325 10.8333C3.53705 12.2998 4.21736 13.6586 5.26939 14.7004C6.32141 15.7422 7.68679 16.4092 9.15519 16.5987C10.6236 16.7882 12.1136 16.4896 13.3956 15.749C14.6776 15.0083 15.6805 13.8667 16.2499 12.5M16.6666 15.8333V12.5H13.3333'
          stroke='#A1A1AA'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_1084_264'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Reload;
