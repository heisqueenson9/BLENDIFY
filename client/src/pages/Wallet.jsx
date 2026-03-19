import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';
import { Icon } from '../components/Icon';

export default function Wallet() {
  const { wallet, transactions, addFunds, withdrawFunds } = useAuth();
  const [showAdd, setShowAdd] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Mobile Money');
  const [carrier, setCarrier] = useState('MTN');
  const [details, setDetails] = useState('');

  const handleDeposit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;
    addFunds(parseFloat(amount));
    showToast("Deposit successful.", "success");
    setShowAdd(false);
    setAmount('');
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;
    if (parseFloat(amount) > wallet) {
      showToast("Insufficient balance.", "error");
      return;
    }
    withdrawFunds(parseFloat(amount), `${method} (${carrier})`, details);
    showToast("Withdrawal successful.", "success");
    setShowWithdraw(false);
    setAmount('');
  };

  return (
    <div className="wallet-page" style={{ padding: '120px 24px', minHeight: '100vh', background: 'var(--black)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', marginBottom: '40px' }}>Wallet <span style={{ color: 'var(--lime)' }}>Account</span></h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          
          {/* Balance Card */}
          <div className="card-luxury" style={{ padding: '48px', borderRadius: '32px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(197, 231, 16, 0.1) 0%, rgba(10,10,10,0) 100%)' }}>
            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px' }}>Current Balance</span>
            <h2 style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--lime)', margin: '12px 0' }}>GHS {wallet.toFixed(2)}</h2>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '32px' }}>
               <button onClick={() => setShowAdd(true)} className="btn-primary" style={{ padding: '16px 32px' }}>+ Load Funds</button>
               <button onClick={() => setShowWithdraw(true)} className="btn-ghost" style={{ padding: '16px 32px', border: '1px solid rgba(255,255,255,0.1)' }}>Withdraw</button>
            </div>
          </div>

          {/* Transactions */}
          <div className="card-luxury" style={{ padding: '32px', borderRadius: '32px', overflow: 'hidden' }}>
            <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', marginBottom: '24px' }}>Transaction History</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
               {transactions.length === 0 ? (
                 <p style={{ opacity: 0.3, textAlign: 'center', padding: '40px' }}>No transactions yet</p>
               ) : transactions.map(t => (
                 <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                       <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.msg}</p>
                       <small style={{ opacity: 0.4 }}>{new Date(t.date).toLocaleDateString()}</small>
                    </div>
                    <div style={{ color: t.type === 'debit' ? '#ff4757' : 'var(--lime)', fontWeight: 800 }}>
                       {t.type === 'debit' ? '-' : '+'} GHS {t.amount?.toFixed(2) || '0.00'}
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Load Funds Modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
           <div className="card-luxury" style={{ maxWidth: '450px', width: '100%', padding: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                 <h3 style={{ fontSize: '1.5rem' }}>Load <span style={{ color: 'var(--lime)' }}>Funds</span></h3>
                 <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
              </div>
              <form onSubmit={handleDeposit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                 <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (GHS)" style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} required />
                 <input placeholder="Card Number / Momo Number" style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} required />
                 <button className="btn-primary" style={{ width: '100%', padding: '18px' }}>Confirm Deposit</button>
              </form>
           </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
           <div className="card-luxury" style={{ maxWidth: '450px', width: '100%', padding: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                 <h3 style={{ fontSize: '1.5rem' }}>Withdraw <span style={{ color: 'var(--lime)' }}>Funds</span></h3>
                 <button onClick={() => setShowWithdraw(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
              </div>
              
              <form onSubmit={handleWithdraw} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                 <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" onClick={() => setMethod('Mobile Money')} style={{ flex: 1, padding: '12px', borderRadius: '12px', background: method === 'Mobile Money' ? 'var(--lime)' : 'transparent', color: method === 'Mobile Money' ? '#000' : '#fff', border: '1px solid rgba(197, 231, 16, 0.2)', fontWeight: 700, fontSize: '0.8rem' }}>Momo</button>
                    <button type="button" onClick={() => setMethod('Bank')} style={{ flex: 1, padding: '12px', borderRadius: '12px', background: method === 'Bank' ? 'var(--lime)' : 'transparent', color: method === 'Bank' ? '#000' : '#fff', border: '1px solid rgba(197, 231, 16, 0.2)', fontWeight: 700, fontSize: '0.8rem' }}>Bank</button>
                 </div>

                 {method === 'Mobile Money' && (
                   <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                      {['MTN', 'Telecel', 'AirtelTigo'].map(m => (
                        <div key={m} onClick={() => setCarrier(m)} style={{ 
                           flexShrink: 0, padding: '10px 20px', borderRadius: '12px', 
                           background: carrier === m ? 'rgba(197, 231, 16, 0.1)' : 'rgba(255,255,255,0.03)',
                           border: `1px solid ${carrier === m ? 'var(--lime)' : 'rgba(255,255,255,0.05)'}`,
                           cursor: 'pointer', transition: 'all 0.2s'
                        }}>
                           <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>{m}</span>
                        </div>
                      ))}
                   </div>
                 )}

                 <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (GHS)" style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} required />
                 <input placeholder={method === 'Bank' ? "Account Number" : "Mobile Number"} value={details} onChange={e => setDetails(e.target.value)} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} required />
                 <button className="btn-primary" style={{ width: '100%', padding: '18px', background: '#ff4757', border: 'none' }}>Confirm Withdrawal</button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
