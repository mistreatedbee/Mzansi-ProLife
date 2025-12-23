/**
 * Utility functions for the application
 */

/**
 * Creates a URL for a given page name
 * Maps page names to their routes
 */
export function createPageUrl(pageName: string, params?: Record<string, string>): string {
  const routes: Record<string, string> = {
    'Home': '/',
    'About': '/about',
    'Projects': '/projects',
    'Questionnaire': '/questionnaire',
    'Donate': '/donate',
    'Contact': '/contact',
    'AdminDashboard': '/admin',
  };

  let url = routes[pageName] || '/';
  
  // Add query parameters if provided
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
    url += `?${searchParams.toString()}`;
  }

  return url;
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats currency (South African Rand)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(amount);
}

/**
 * Validates email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates South African phone number
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Remove spaces and dashes
  const cleaned = phone.replace(/[\s-]/g, '');
  // Check if it's a valid SA phone number (10 digits starting with 0)
  return /^0\d{9}$/.test(cleaned);
}

/**
 * Validates South African ID number
 */
export function isValidIDNumber(idNumber: string): boolean {
  // Basic validation - SA ID numbers are 13 digits
  return /^\d{13}$/.test(idNumber);
}

/**
 * Generates a reference number
 */
export function generateReferenceNumber(prefix: string = 'MPD'): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

