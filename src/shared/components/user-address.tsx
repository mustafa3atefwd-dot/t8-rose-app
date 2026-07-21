import { MapPinPen } from "lucide-react";

export default function UserAddress() {
  return (
    <div className="py-1.75 px-2.5">
      <span className="text-sm text-zinc-500">Deliver to:</span>
      <div className="flex items-center gap-1.5 text-ds-text-primary">
        <MapPinPen className="size-5"/>
        <span className="font-medium">Cairo</span>
      </div>
    </div>
  );
}
