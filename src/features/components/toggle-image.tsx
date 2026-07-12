"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import separator1 from '../../../public/image-removebg-preview.png'
import separator2 from '../../../public/separator-1 1.png'

interface ClassNamePrors{

  className: string | undefined
}

export function WelcomeArt({className}: ClassNamePrors) {
  const {theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; 
  

  const srcImg = theme === 'dark' ? separator1 : separator2



  return  <Image className={className} src={srcImg} alt="Welcome back" width={160} height={60} />;
}