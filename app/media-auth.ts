// The existing Sites access policy already allows this account. Keep the upload
// API restricted even if the public portfolio is opened to everyone later.
export const MEDIA_ADMIN_EMAIL = "emmanuel.cyr159@gmail.com";

export function isMediaAdmin(email: string): boolean {
  return email.trim().toLowerCase() === MEDIA_ADMIN_EMAIL;
}
