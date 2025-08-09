
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InstitutionalHeader from './components/InstitutionalHeader';
import MobileOptimizedLayout from './components/MobileOptimizedLayout';
import authData from '../../data/auth.json';
import Icon from '../../components/AppIcon';

const LoginPage = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installVisible, setInstallVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for session
    const session = localStorage.getItem('psg_class_session');
    if (session === 'active') {
      navigate('/dashboard');
    }
    document.title = 'Class Code Login - PSG RepBuddy';

    // Install prompt logic
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [navigate]);
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted install');
        } else {
          console.log('User dismissed install');
        }
        setDeferredPrompt(null);
        setInstallVisible(false);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validCredentials = authData.credentials;
    const foundCredential = validCredentials.find(cred => cred.classCode === code.toUpperCase());
    
    if (foundCredential) {
      localStorage.setItem('psg_class_session', 'active');
      localStorage.setItem('psg_class_code', foundCredential.classCode);
      localStorage.setItem('psg_class_name', foundCredential.className);
      localStorage.setItem('psg_user_type', foundCredential.userType);
      navigate('/dashboard');
    } else {
      setError('Invalid Class Code');
    }
  };

  return (
    <MobileOptimizedLayout>
      <div className="space-y-8 flex flex-col items-center justify-center " style={{ position: 'relative' }}>
        {/* Install App Button - Top Right */}
        {installVisible && (
          <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
            <button
              onClick={handleInstallClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                background: '#2a4365',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                cursor: 'pointer'
              }}
            >
              <Icon name="Download" size={20} color="#fff" />
              Install App
            </button>
          </div>
        )}
        <InstitutionalHeader />
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-4 text-center">
            Enter Class Code
          </h2>
          <input
            type="text"
            value={code}
            onChange={e => { setCode(e.target.value); setError(''); }}
            placeholder="Class Code"
            className="w-full rounded-lg px-4 py-2 text-lg"
            required
            style={{ border: '2px solid #d1d5db', outline: 'none', boxShadow: 'none' }}
            onFocus={e => {
              e.target.style.border = '2px solid #9bb0d4';
            }}
            onBlur={e => {
              e.target.style.border = '2px solid #d1d5db';
            }}
          />
          {error && (
            <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold text-lg"
          >
            Continue
          </button>
        </form>
      </div>
    </MobileOptimizedLayout>
  );
};

export default LoginPage;