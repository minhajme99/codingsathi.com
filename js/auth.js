/**
 * Authentication system for CodingSathi.
 * Uses localStorage to store users and sessions.
 */
const Auth = {
  STORAGE_KEY: "codingsathi_users",
  SESSION_KEY: "codingsathi_session",

  getUsers() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUsers(users) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  },

  getSession() {
    const data = localStorage.getItem(this.SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },

  isLoggedIn() {
    return this.getSession() !== null;
  },

  getCurrentUser() {
    return this.getSession();
  },

  signup(name, email, password) {
    if (!name || !email || !password) {
      return { success: false, message: "All fields are required." };
    }
    if (password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters." };
    }

    const users = this.getUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: "An account with this email already exists." };
    }

    const user = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    this.saveUsers(users);

    const session = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return { success: true, user: session };
  },

  login(email, password) {
    if (!email || !password) {
      return { success: false, message: "Email and password are required." };
    }

    const users = this.getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return { success: false, message: "Invalid email or password." };
    }

    const session = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return { success: true, user: session };
  },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  },

  escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  },
};
