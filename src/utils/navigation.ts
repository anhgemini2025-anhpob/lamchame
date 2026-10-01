/**
 * Navigation utility for safely opening external links across all platforms:
 * - Desktop browsers: Opens in a new tab (_blank).
 * - Mobile & In-app WebViews (Zalo, Messenger, Facebook, Safari iOS):
 *   Direct top-level navigation so links never get silently blocked by WKWebView popup restrictions.
 */

export const isMobileOrWebview = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /iPhone|iPad|iPod|Android|Zalo|FBAN|FBAV|Instagram|Line|MicroMessenger|Snapchat/i.test(ua);
};

export const openExternalApp = (url: string, e?: React.MouseEvent) => {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  if (!url) return;

  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const isWebview = /Zalo|FBAN|FBAV|Instagram|Line|MicroMessenger|Snapchat|HeyTap|MiuiBrowser/i.test(ua);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);

  // In in-app browsers like Zalo or mobile devices, WKWebView silently blocks target="_blank".
  // Navigating via window.location.href guarantees the link opens immediately.
  if (isWebview || isMobile) {
    window.location.href = url;
    return;
  }

  // On desktop: open in new tab with popup blocker fallback
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url;
    }
  } catch {
    window.location.href = url;
  }
};
