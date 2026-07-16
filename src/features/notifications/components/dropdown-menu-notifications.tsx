import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { Bell, BrushCleaning, CheckCheck } from "lucide-react";

export default function DropdownMenuNotifications() {
  return <>
   <DropdownMenu>
  <DropdownMenuTrigger>
  
      <Bell />
    
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end" className="w-84">
  <DropdownMenuGroup>
    <DropdownMenuLabel className={'bg-ds-bg-primary-saturated font-bold text-xl text-ds-text-inverse'}>
      Notifications
    </DropdownMenuLabel>
    <DropdownMenuLabel className={'flex items-center justify-between'}>
        <div className="flex items-center justify-center gap-1.5">
            <BrushCleaning className="size-4.5"/>
            <span>Clear all notifications</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
            <CheckCheck className="size-3.75"/>
            <span>Mark all as read</span>
        </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator/>

    <DropdownMenuItem>
      Notification 1
    </DropdownMenuItem>

    <DropdownMenuItem>
      Notification 2
    </DropdownMenuItem>
  </DropdownMenuGroup>
</DropdownMenuContent>
</DropdownMenu>
  </>
}
