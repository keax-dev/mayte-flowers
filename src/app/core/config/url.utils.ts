export function buildAbsoluteUrl(path: string, siteUrl: string): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildWhatsappUrl(message: string, whatsappUrl: string): string {
  return `${whatsappUrl}&text=${encodeURIComponent(message)}`;
}
