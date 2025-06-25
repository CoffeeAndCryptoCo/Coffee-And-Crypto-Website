import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

export interface PaymentData {
  amount: number;
  currency: string;
  description: string;
  paymentMethod: 'card' | 'crypto';
  customerEmail?: string;
}

export interface PaymentSession {
  sessionId: string;
  url: string;
  amount: number;
  currency: string;
  paymentMethod: string;
}

class StripeService {
  private baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  async createPaymentSession(paymentData: PaymentData): Promise<PaymentSession> {
    try {
      const response = await fetch(`${this.baseUrl}/api/create-payment-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment session');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating payment session:', error);
      throw error;
    }
  }

  async verifyPayment(sessionId: string): Promise<{ success: boolean; accessToken?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }

  async redirectToCheckout(sessionId: string): Promise<void> {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      throw error;
    }
  }

  // Store access token in localStorage with expiration
  storeAccessToken(token: string, expirationHours: number = 24): void {
    const expirationTime = Date.now() + (expirationHours * 60 * 60 * 1000);
    const accessData = {
      token,
      expiration: expirationTime
    };
    localStorage.setItem('exclusive_access', JSON.stringify(accessData));
  }

  // Check if user has valid access
  hasValidAccess(): boolean {
    try {
      const accessData = localStorage.getItem('exclusive_access');
      if (!accessData) return false;

      const { token, expiration } = JSON.parse(accessData);
      if (!token || !expiration) return false;

      // Check if token is expired
      if (Date.now() > expiration) {
        localStorage.removeItem('exclusive_access');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking access:', error);
      return false;
    }
  }

  // Get access token
  getAccessToken(): string | null {
    try {
      const accessData = localStorage.getItem('exclusive_access');
      if (!accessData) return null;

      const { token, expiration } = JSON.parse(accessData);
      if (Date.now() > expiration) {
        localStorage.removeItem('exclusive_access');
        return null;
      }

      return token;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  // Clear access token
  clearAccess(): void {
    localStorage.removeItem('exclusive_access');
  }
}

export const stripeService = new StripeService();
export { stripePromise };