import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

export function ExpandableTabs({ tabs, activeColor = "text-brand-green", className = "" }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={`flex items-center gap-2 p-1.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-xs ${className}`}>
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <div key={index} className="w-px h-5 bg-gray-300 mx-1" />;
        }

        const Icon = tab.icon;
        
        return (
          <NavLink
            key={tab.title}
            to={tab.to}
            className={({ isActive }) => {
              const active = isActive;
              return `relative flex items-center h-10 px-3 rounded-full cursor-pointer transition-all duration-300 outline-none select-none
                ${active ? `bg-white shadow-sm ${activeColor}` : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"}`;
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {({ isActive }) => {
              const isExpanded = hoveredIndex === index || isActive;

              return (
                <>
                  <Icon size={20} strokeWidth={2} />
                  
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.span
                        initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                        animate={{ width: "auto", opacity: 1, marginLeft: 8 }}
                        exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden whitespace-nowrap text-sm font-medium"
                      >
                        {tab.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              );
            }}
          </NavLink>
        );
      })}
    </div>
  );
}