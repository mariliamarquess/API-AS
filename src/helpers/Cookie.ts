class CookieManager {
  /**
   * Sets a cookie with optional expiration days
   * @param name Cookie name
   * @param value Cookie value
   * @param days Expiration in days (optional)
   */
  static setCookie(name: string, value: string, days?: number): void {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
  }

  /**
   * Gets a cookie value by name
   * @param name Cookie name to retrieve
   * @returns Cookie value or null if not found
   */
  static getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    
    for (const cookie of cookies) {
      const trimmedCookie = cookie.trim();
      if (trimmedCookie.startsWith(nameEQ)) {
        return decodeURIComponent(trimmedCookie.substring(nameEQ.length));
      }
    }
    return null;
  }

  /**
   * Removes a cookie by name
   * @param name Cookie name to remove
   */
  static removeCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

export default CookieManager;