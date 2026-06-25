"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  // CAUSE: We need a state to track if the component has arrived in the browser
  const [mounted, setMounted] = useState(false);

  // EFFECT: This only runs ONCE the component is safely inside the browser
  useEffect(() => {
    setMounted(true); 
  }, []);

  // CAUSE/EFFECT: If we aren't mounted yet, render a blank placeholder.
  // This prevents the Server HTML from mismatching the Browser HTML.
  if (!mounted) {
    return <div className="w-9 h-9 items-center justify-center d-flex" />; 
  }

  // Once mounted is true, it is 100% safe to render the real UI
  return (
    <button 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 border rounded-md"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}


// import { useTheme } from "next-themes";

// export function ToggleIcon() {
//   const { resolvedTheme, setTheme } = useTheme();

//   return (
//     <button
//       onClick={() =>
//         setTheme(resolvedTheme === "dark" ? "light" : "dark")
//       }
//     >
//       {resolvedTheme === "dark" ? "🌙" : "☀️"}
//     </button>
//   );
