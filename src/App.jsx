import React, { useEffect, useState } from "react";
import Routes from "./Routes";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installVisible, setInstallVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

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

  return (
    <>
      {installVisible && (
        <div style={{ position: 'fixed', bottom: 18, right: 18, zIndex: 1000 }}>
          <button
            onClick={handleInstallClick}
            style={{
              padding: '10px 18px',
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              cursor: 'pointer'
            }}
          >
            Install App
          </button>
        </div>
      )}
      <Routes />
    </>
  );
}

export default App;
