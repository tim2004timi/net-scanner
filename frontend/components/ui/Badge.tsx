import { twMerge } from 'tailwind-merge';

const statuses = {
  'В процессе': { name: 'В процессе', color: 'bg-[#312107] text-[#F5A524]' },
  'Провалено': { name: 'Провалено', color: 'bg-[#F3126020] text-[#F31260]' },
  'Готово': { name: 'Готово', color: 'bg-[#17C96420] text-[#17C964]' }
};

function Badge({
  type,
  customText
}: {
  type: 'В процессе' | 'Провалено' | 'Готово';
  customText?: string;
}) {
  return (
    <span
      className={twMerge(
        'flex w-fit items-center rounded-full px-2 py-0.5 text-sm font-normal text-white shadow-md',
        statuses[type].color
      )}
    >
      {customText || statuses[type].name}
    </span>
  );
}

export default Badge;
