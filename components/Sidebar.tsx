'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const menuItems = [
    {
        title: "Profile & Security",
        tabs: [
            { name: "FERPA", url: "/profile/ferpa" },
            { name: "Personal Information", url: "/profile/personal" },
            { name: "Login Information", url: "/profile/login" },
        ],
    },
    {
        title: "Academics",
        tabs: [
            { name: "Schedule Generator", url: "/academics/schedule-gen" },
            { name: "Degree Audit", url: "/academics/degree" },
            { name: "Transcripts", url: "/academics/transcripts" },
            { name: "Enrollment Verification", url: "/academics/enrollment" },
        ],
    },
    {
        title: "Tasks & Holds",
        tabs: [
            { name: "Holds", url: "/tasks/holds" },
            { name: "To-Do List", url: "/tasks/to-dos" },
        ],
    },
    {
        title: "Financial Services",
        tabs: [
            { name: "Tuition & Fees", url: "/financial-services/tuition-fees" },
            { name: "Financial Aid", url: "/financial-services/financial-aid" },
            { name: "Pay My Bill", url: "/financial-services/pay" },
            { name: "Donate to UCF (giv moneh)", url: "/financial-services/donate" },
        ],
    },
    {
        title: "Campus Living",
        tabs: [
            { name: "Housing", url: "/campus-living/housing" },
            { name: "Clubs", url: "/campus-living/clubs" },
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
