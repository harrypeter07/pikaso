// components/shared/Sidebar.tsx
"use client";
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { getUserByEmail } from '@/lib/actions/user.actions'; // Import the action

const Sidebar = () => {
    const pathname = usePathname();
    const { isAuthenticated, userEmail } = useAuth(); // Get userEmail
    const [user, setUser] = useState(null); // State for user data

    useEffect(() => {
        const fetchUser = async () => {
            if (userEmail) { // Fetch only if userEmail exists (user is logged in)
                try {
                    const userData = await getUserByEmail(userEmail);
                    setUser(userData);
                } catch (error) {
                    console.error("Error fetching user:", error);
                    setUser(null) // Clear user data in case of error
                }
            } else {
                setUser(null)
            }
        };

        fetchUser();
    }, [userEmail]); // Run when userEmail changes (login/logout)


    return (
        <aside className="sidebar">
            <div className="flex size-full flex-col gap-4">
                <Link href="/" className="sidebar-logo">
                    <Image
                        src="assets/images/logo-text.svg"
                        alt="logo"
                        width={180}
                        height={28}
                    />
                </Link>

                <nav className="sidebar-nav">
                    {isAuthenticated ? (
                        <>
                            <ul className="sidebar-nav_elements">
                                {navLinks.slice(0, 6).map((link) => {
                                    const isActive = link.route === pathname;
                                    return (
                                        <li
                                            key={link.route}
                                            className={`sidebar-nav_element group ${
                                                isActive ? "bg-purple-gradient text-white" : "text-gray-700"
                                            }`}
                                        >
                                            <Link className="sidebar-link" href={link.route}>
                                                <Image
                                                    src={link.icon}
                                                    alt={link.label}
                                                    width={24}
                                                    height={24}
                                                    className={`${isActive && "brightness-200"}`}
                                                />
                                                {link.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>

                            <ul className="sidebar-nav_elements">
                                {navLinks.slice(6).map((link) => {
                                    const isActive = link.route === pathname;
                                    return (
                                        <li
                                            key={link.route}
                                            className={`sidebar-nav_element group ${
                                                isActive ? "bg-purple-gradient text-white" : "text-gray-700"
                                            }`}
                                        >
                                            <Link className="sidebar-link" href={link.route}>
                                                <Image
                                                    src={link.icon}
                                                    alt={link.label}
                                                    width={24}
                                                    height={24}
                                                    className={`${isActive && "brightness-200"}`}
                                                />
                                                {link.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>

                            {user && ( // Only render if user data is available
                                <div className="user-info p-4"> {/* Added some padding */}
                                    
                                    <div>
                                        <h3>{user}</h3> {/* Or user.firstName */}
                                        {/* ... other user info */}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <Button className="button bg-purple-gradient bg-cover">
                            <Link href="/sign-in">Login</Link>
                        </Button>
                    )}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;