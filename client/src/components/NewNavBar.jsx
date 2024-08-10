import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export function NewNavBar() {
  return (
    <NavigationMenu className="md:hidden mx-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/dashboard">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Overview
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/dashboard/transactions">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Transactions
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/dashboard/calendar">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Calendar
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <UserButton />
    </NavigationMenu>
  );
}

export default NewNavBar;
