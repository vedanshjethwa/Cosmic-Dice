const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Auth endpoints
  async register(userData: {
    email: string;
    password: string;
    username: string;
    phone?: string;
    referralCode?: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout() {
    await this.request('/auth/logout', { method: 'POST' });
    this.clearToken();
  }

  async sendOTP(email: string) {
    return this.request('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyOTP(email: string, otp: string) {
    return this.request('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  }

  // User endpoints
  async getProfile() {
    return this.request('/user/profile');
  }

  async updateProfile(profileData: any) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/user/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async getUserStats() {
    return this.request('/user/stats');
  }

  // Wallet endpoints
  async getWalletBalance() {
    return this.request('/wallet/balance');
  }

  async getTransactionHistory(page = 1, limit = 20, type?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(type && { type }),
    });
    return this.request(`/wallet/transactions?${params}`);
  }

  // Game endpoints
  async getGames() {
    return this.request('/game/list');
  }

  async placeBet(gameId: string, betAmount: number, gameData: any, clientSeed?: string) {
    return this.request('/game/bet', {
      method: 'POST',
      body: JSON.stringify({ gameId, betAmount, gameData, clientSeed }),
    });
  }

  async getGameHistory(page = 1, limit = 20, gameId?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(gameId && { gameId }),
    });
    return this.request(`/game/history?${params}`);
  }

  // Payment endpoints
  async createDepositOrder(amount: number, paymentMethod: string) {
    return this.request('/payment/deposit/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount, paymentMethod }),
    });
  }

  async verifyDeposit(orderId: string, paymentId: string, signature: string) {
    return this.request('/payment/deposit/verify', {
      method: 'POST',
      body: JSON.stringify({ orderId, paymentId, signature }),
    });
  }

  async createWithdrawalRequest(amount: number, paymentMethod: string, paymentDetails: any) {
    return this.request('/payment/withdraw/request', {
      method: 'POST',
      body: JSON.stringify({ amount, paymentMethod, paymentDetails }),
    });
  }

  async getWithdrawalRequests() {
    return this.request('/payment/withdraw/requests');
  }

  // Bonus endpoints
  async getAvailableBonuses() {
    return this.request('/bonus/available');
  }

  async claimBonus(bonusId: string, promoCode?: string) {
    return this.request('/bonus/claim', {
      method: 'POST',
      body: JSON.stringify({ bonusId, promoCode }),
    });
  }

  async getUserBonuses() {
    return this.request('/bonus/my-bonuses');
  }

  async applyPromoCode(code: string) {
    return this.request('/bonus/promo-code', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  // Referral endpoints
  async getReferralStats() {
    return this.request('/referral/stats');
  }

  async getReferralEarnings() {
    return this.request('/referral/earnings');
  }

  // Notification endpoints
  async getNotifications() {
    return this.request('/notification');
  }

  async markNotificationRead(notificationId: string) {
    return this.request(`/notification/${notificationId}/read`, {
      method: 'POST',
    });
  }

  async markAllNotificationsRead() {
    return this.request('/notification/read-all', {
      method: 'POST',
    });
  }

  // CMS endpoints
  async getCMSContent(slug: string) {
    return this.request(`/cms/${slug}`);
  }
}

export const api = new ApiClient(API_BASE_URL);