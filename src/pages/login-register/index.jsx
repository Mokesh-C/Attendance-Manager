
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InstitutionalHeader from './components/InstitutionalHeader';
import MobileOptimizedLayout from './components/MobileOptimizedLayout';

const STATIC_CLASS_CODE = '24MXG1'; // Only this code can access main pages

const LoginPage = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check for session
    const session = localStorage.getItem('psg_class_session');
    if (session === 'active') {
      navigate('/dashboard');
    }
    document.title = 'Class Code Login - PSG Attendance Manager';
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === STATIC_CLASS_CODE) {
      localStorage.setItem('psg_class_session', 'active');
      navigate('/dashboard');
    } else {
      setError('Invalid Class Code');
    }
  };

  return (
    <MobileOptimizedLayout>
      <div className="space-y-8 flex flex-col items-center justify-center min-h-screen">
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg"
            required
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