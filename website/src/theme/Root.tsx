import React, { useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function Root({ children }: { children: React.ReactNode }) {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    // Force dark mode on load
    setColorMode('dark');
    // Also set the data-theme attribute on html element
    document.documentElement.setAttribute('data-theme', 'dark');
    // Clear any localStorage settings that might override this
    localStorage.removeItem('theme');
    localStorage.setItem('theme', 'dark');
  }, [setColorMode]);

  return <>{children}</>;
}
