type Props = {
  count: number;
};
export default function HeaderBadge({ count }: Props) {
  return (
    <div className="bg-ds-bg-danger ring-ds-bg-plain absolute -end-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full text-[10px] leading-none font-semibold text-white ring-2">
      {count > 99 ? '99+' : count}
    </div>
  );
}
