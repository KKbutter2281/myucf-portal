'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const menuItems = [
    {
        title: "Profile & Security",
        tabs: [
            { name: "FERPA", url: "/profile-security/ferpa" },
            { name: "Emails & Phone Numbers", url: "/profile-security/emails-phones" },
            { name: "Login Information", url: "/profile-security/login-info" },
            { name: "UCFID & NetID", url: "/profile-security/ucfid-netid" },
        ],
    },
    {
        title: "Academics",
        tabs: [
            { name: "Class Schedule", url: "/academics/class-schedule" },
            { name: "Degree Audit", url: "/academics/degree-audit" },
            { name: "Transcripts", url: "/academics/transcripts" },
            { name: "Enrollment Verification", url: "/academics/enrollment-verification" },
        ],
    },
    {
        title: "Tasks & Holds",
        tabs: [
            { name: "Holds", url: "/tasks-holds/holds" },
            { name: "To-Do List", url: "/tasks-holds/todo-list" },
        ],
    },
    {
        title: "Financial Services",
        tabs: [
            { name: "Tuition & Fees", url: "/financial-services/tuition-fees" },
            { name: "Financial Aid", url: "/financial-services/financial-aid" },
        ],
    },
    {
        title: "Campus Living",
        tabs: [
            { name: "Housing", url: "/campus-living/housing" },
            { name: "Room Assignment", url: "/campus-living/room-assignment" },
            { name: "Dining Locations", url: "/campus-living/dining-locations" },
            { name: "Meal Plans", url: "/campus-living/meal-plans" },
        ],
    },
];

export default function Sidebar() {
    const [openSections, setOpenSections] = useState({});

    const toggleSection = (title) => {
        setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    return (
        <aside className="w-72 bg-[#FFF5CC] text-black p-6 rounded-2xl shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-center text-[#B8860B]">myUCF Portal</h2>
            <nav className="space-y-2">
                {menuItems.map((section) => (
                    <Card
                        key={section.title}
                        className={cn(
                            "bg-[#FFD700] p-3 rounded-lg shadow-md transition-all overflow-hidden", 
                            openSections[section.title] ? "h-auto p-4" : "h-12"
                        )}
                    >
                        <button
                            onClick={() => toggleSection(section.title)}
                            className="flex justify-between items-center w-full text-md font-semibold"
                        >
                            <span>{section.title}</span>
                            <ChevronDown className={cn("transition-transform", { "rotate-180": openSections[section.title] })} size={16} />
                        </button>
                        <div className={cn("transition-all mt-2 space-y-2", openSections[section.title] ? "block" : "hidden")}>
                            {section.tabs.map((tab) => (
                                <a
                                    key={tab.name}
                                    href={tab.url}
                                    className="block py-2 px-4 text-sm bg-[#FFE680] hover:bg-[#FFD700] rounded-md transition"
                                >
                                    {tab.name}
                                </a>
                            ))}
                        </div>
                    </Card>
                ))}
            </nav>
        </aside>
    );
}
