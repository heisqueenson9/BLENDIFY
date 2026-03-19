import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [productRequests, setProductRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('blendify_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  // Load user data when user changes (Isolation)
  useEffect(() => {
    if (user && user.email) {
      const email = user.email;
      const savedWallet = localStorage.getItem(`blendify_${email}_wallet`) || '0';
      const savedTransactions = localStorage.getItem(`blendify_${email}_transactions`) || '[]';
      const savedRequests = localStorage.getItem(`blendify_${email}_requests`) || '[]';

      setWallet(parseFloat(savedWallet));
      setTransactions(JSON.parse(savedTransactions));
      setProductRequests(JSON.parse(savedRequests));
    } else {
      setWallet(0);
      setTransactions([]);
      setProductRequests([]);
    }
  }, [user]);

  const requestProduct = (requestData) => {
    if (!user) return false;
    const email = user.email;
    const newRequest = { ...requestData, id: Date.now(), status: 'pending', date: new Date().toISOString() };
    const updated = [newRequest, ...productRequests];
    setProductRequests(updated);
    localStorage.setItem(`blendify_${email}_requests`, JSON.stringify(updated));
    return true;
  };

  const login = (userData) => {
    localStorage.setItem('blendify_user', JSON.stringify(userData));
    setUser(userData);
  };

  const signup = (userData) => {
    localStorage.setItem('blendify_user', JSON.stringify(userData));
    // Initialize data for new user if not exists
    const email = userData.email;
    if (!localStorage.getItem(`blendify_${email}_wallet`)) {
      localStorage.setItem(`blendify_${email}_wallet`, '0');
    }
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('blendify_user');
    setUser(null);
  };

  const addFunds = (amount) => {
    if (!user) return false;
    const email = user.email;
    const newBalance = wallet + amount;
    setWallet(newBalance);
    localStorage.setItem(`blendify_${email}_wallet`, newBalance.toString());
    
    const newTransaction = { id: Date.now(), msg: `Loaded funds: GHS ${amount}`, type: 'credit', date: new Date().toISOString(), amount };
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem(`blendify_${email}_transactions`, JSON.stringify(updatedTransactions));
    return true;
  };

  const deductFunds = (amount) => {
    if (!user || wallet < amount) return false;
    const email = user.email;
    const newBalance = wallet - amount;
    setWallet(newBalance);
    localStorage.setItem(`blendify_${email}_wallet`, newBalance.toString());
    
    const newTransaction = { id: Date.now(), msg: `Payment for Order`, type: 'debit', date: new Date().toISOString(), amount };
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem(`blendify_${email}_transactions`, JSON.stringify(updatedTransactions));
    return true;
  };

  const withdrawFunds = (amount, method, details) => {
    if (!user || wallet < amount) return false;
    const email = user.email;
    const newBalance = wallet - amount;
    setWallet(newBalance);
    localStorage.setItem(`blendify_${email}_wallet`, newBalance.toString());
    
    const newTransaction = { id: Date.now(), msg: `Withdrawal via ${method}`, type: 'debit', date: new Date().toISOString(), amount, details };
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem(`blendify_${email}_transactions`, JSON.stringify(updatedTransactions));
    return true;
  };

  const refundFunds = (amount) => {
    if (!user) return;
    const email = user.email;
    const newBalance = wallet + amount;
    setWallet(newBalance);
    localStorage.setItem(`blendify_${email}_wallet`, newBalance.toString());
    
    const newTransaction = { id: Date.now(), msg: `Refund Received`, type: 'refund', date: new Date().toISOString(), amount };
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem(`blendify_${email}_transactions`, JSON.stringify(updatedTransactions));
  };

  return (
    <AuthContext.Provider value={{ 
      user, wallet, transactions, productRequests, requestProduct, 
      login, signup, logout, addFunds, deductFunds, refundFunds, withdrawFunds, loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
