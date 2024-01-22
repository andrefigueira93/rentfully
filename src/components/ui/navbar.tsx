import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher";
import { Button } from "./button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Locations", href: "/locations" },
  { name: "Properties", href: "/properties" },
];

type NavLinkProps = (typeof navLinks)[number];

function DirectLink({ name, href }: NavLinkProps) {
  return (
    <NavigationMenuItem className="w-full text-left">
      <NavigationMenuLink asChild>
        <NavLink to={href ?? "/404"}>
          <Button variant="ghost">{name}</Button>
        </NavLink>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

export function SimpleNavLinks() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navLinks.map((link) => (
          <DirectLink key={link.name} {...link} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function NavLinks({ vertical }: { vertical?: boolean }) {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList
          className={vertical ? "flex flex-col" : "flex flex-row"}
        >
          {navLinks.map((link) => (
            <DirectLink key={link.name} {...link} />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <ThemeSwitcher />
      <AuthProfileButton />
    </>
  );
}

function AuthProfileButton() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <NavLink to="/sign-in">
        <Button variant="outline">Access your account</Button>
      </NavLink>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {`${user.firstName} ${user.lastName}`}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4">
              <ListItem href="/my-bookings" title="My Bookings" />
              <li>
                <Button
                  variant="outline"
                  onClick={() => {
                    signOut();
                  }}
                  className="w-full"
                >
                  Sign out
                </Button>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export const NavBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <NavLink to="/">
        <h1>Rentfully</h1>
      </NavLink>
      <div className="hidden sm:flex space-x-2 items-center">
        <NavLinks />
      </div>
      <Sheet>
        <SheetTrigger className="sm:hidden">
          <HamburgerMenuIcon />
        </SheetTrigger>
        <SheetContent className="max-w-[250px]">
          <SheetHeader>
            <SheetTitle>Rentfully</SheetTitle>
            <NavLinks vertical />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={props.href ?? "#"}
          ref={ref}
          className={cn(
            "block min-w-max select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
