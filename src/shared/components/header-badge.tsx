import { Badge } from "./ui/badge";
type Props = {
    count: number;
}
export default function HeaderBadge({count}: Props) {
  return <div
  className="flex items-center justify-center size-4 rounded-full bg-ds-bg-danger text-[10px] font-medium text-white absolute -top-1/5 -right-1/5"
>
  {count > 99 ? "99+" : count}
</div>
}
