'use client';

/**
 * ThemeScript — injected as the very first child of <html> so the correct
 * data-theme is set before any CSS or React paint, preventing a flash of the
 * wrong theme on reload.
 */
export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem('lumina-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
      }}
    />
  );
}
