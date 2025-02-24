"use client";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { getUserByEmail } from "@/lib/actions/user.actions";
import { useAuth } from "@/context/AuthContext";

const MobileNav = () => {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const { isAuthenticated, userEmail } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      if (userEmail) {
        try {
          const userData = await getUserByEmail(userEmail);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, [userEmail]);

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      <nav className="flex gap-2">
        {isAuthenticated ? (
          <>
            {user && <span className="text-dark-700">Hello, {user}!</span>}
            <Sheet>
              <SheetTrigger>
                <Image
                  src="/assets/icons/menu.svg"
                  alt="menu"
                  width={32}
                  height={32}
                  className="cursor-pointer"
                />
              </SheetTrigger>
              <SheetContent className="sheet-content sm:w-64">
                <Image
                  src="/assets/images/logo-text.svg"
                  alt="logo"
                  width={152}
                  height={23}
                />
                <ul className="header-nav_elements">
                  {navLinks.map((link) => {
                    const isActive = link.route === pathname;
                    return (
                      <li
                        key={link.route}
                        className={`${isActive ? "gradient-text" : ""} p-18 flex whitespace-nowrap text-dark-700`}
                      >
                        <Link className="sidebar-link cursor-pointer" href={link.route}>
                          <Image
                            src={link.icon}
                            alt={link.label}
                            width={24}
                            height={24}
                          />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <Button className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </nav>
    </header>
  );
};

export default MobileNav;
