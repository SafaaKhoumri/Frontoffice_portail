import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, LogIn, Sparkles, Shield, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Form submitted:', formData);
      alert('Connexion simulée réussie !');
    }, 2000);
  };

  const containerStyle = {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    background: `
      radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
      linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)
    `,
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const particleStyle = (particle) => ({
    position: 'absolute',
    left: `${particle.x}%`,
    top: `${particle.y}%`,
    width: `${particle.size}px`,
    height: `${particle.size}px`,
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #60a5fa, #a855f7)',
    opacity: 0.2,
    animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s alternate`
  });

  const cardStyle = {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '32px',
    transition: 'all 0.5s ease',
    transform: 'scale(1)',
    maxWidth: '28rem',
    width: '100%'
  };

  const inputStyle = (focused) => ({
    width: '100%',
    paddingLeft: '48px',
    paddingRight: '16px',
    paddingTop: '16px',
    paddingBottom: '16px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: `1px solid ${focused ? '#60a5fa' : 'rgba(255, 255, 255, 0.2)'}`,
    borderRadius: '16px',
    color: 'white',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(8px)'
  });

  const buttonStyle = {
    width: '100%',
    padding: '16px 24px',
    borderRadius: '16px',
    fontWeight: '600',
    color: 'white',
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
    border: 'none',
    cursor: formData.username && formData.password && !isLoading ? 'pointer' : 'not-allowed',
    opacity: formData.username && formData.password && !isLoading ? 1 : 0.5,
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25%); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .login-card:hover {
          transform: scale(1.02) !important;
        }
        .login-button:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
        }
        .input-group:hover .input-glow {
          opacity: 0.3;
        }
        .social-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.2s ease;
          cursor: pointer;
          text-decoration: none;
        }
        .social-button:hover {
          color: white;
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
      
      <div style={containerStyle} onMouseMove={handleMouseMove}>
        {/* Particules animées */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {particles.map((particle) => (
            <div key={particle.id} style={particleStyle(particle)} />
          ))}
        </div>

        {/* Grille de fond */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />

        {/* Conteneur principal */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '16px',
          position: 'relative',
          zIndex: 10
        }}>
          <div className="login-card" style={cardStyle}>
            {/* Effet de lueur */}
            <div style={{
              position: 'absolute',
              inset: '-4px',
              background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
              borderRadius: '24px',
              filter: 'blur(12px)',
              opacity: 0.25,
              zIndex: -1
            }} />
            
            {/* En-tête */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                  borderRadius: '50%',
                  filter: 'blur(16px)',
                  opacity: 0.5,
                  animation: 'pulse 2s infinite'
                }} />
                <div style={{
                  position: 'relative',
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}>
                  <Shield size={40} color="white" style={{ animation: 'pulse 2s infinite' }} />
                </div>
                <Sparkles 
                  size={24} 
                  color="#fbbf24"
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    animation: 'bounce 1s infinite'
                  }}
                />
              </div>
              
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, white, #bfdbfe, #ddd6fe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                Connexion
              </h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
                Accédez à votre espace
              </p>
            </div>

            {/* Formulaire */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Nom d'utilisateur */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '12px'
                }}>
                  Nom d'utilisateur
                </label>
                <div className="input-group" style={{ position: 'relative' }}>
                  <div className="input-glow" style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                    borderRadius: '16px',
                    filter: 'blur(4px)',
                    opacity: focusedField === 'username' ? 0.5 : 0,
                    transition: 'opacity 0.3s ease'
                  }} />
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <User
                      size={20}
                      style={{
                        position: 'absolute',
                        left: '16px',
                        color: focusedField === 'username' ? '#60a5fa' : 'rgba(255, 255, 255, 0.5)',
                        transition: 'color 0.3s ease'
                      }}
                    />
                    <input
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('username')}
                      onBlur={() => setFocusedField('')}
                      style={inputStyle(focusedField === 'username')}
                      placeholder="Entrez votre nom d'utilisateur"
                    />
                  </div>
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '12px'
                }}>
                  Mot de passe
                </label>
                <div className="input-group" style={{ position: 'relative' }}>
                  <div className="input-glow" style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                    borderRadius: '16px',
                    filter: 'blur(4px)',
                    opacity: focusedField === 'password' ? 0.5 : 0,
                    transition: 'opacity 0.3s ease'
                  }} />
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Lock
                      size={20}
                      style={{
                        position: 'absolute',
                        left: '16px',
                        color: focusedField === 'password' ? '#a855f7' : 'rgba(255, 255, 255, 0.5)',
                        transition: 'color 0.3s ease'
                      }}
                    />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                      style={{...inputStyle(focusedField === 'password'), paddingRight: '48px'}}
                      placeholder="Entrez votre mot de passe"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.5)',
                        cursor: 'pointer',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = 'white'}
                      onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '14px'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    style={{
                      marginRight: '8px',
                      accentColor: '#3b82f6'
                    }}
                  />
                  Se souvenir de moi
                </label>
                <a
                  href="#"
                  style={{
                    color: '#60a5fa',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#93c5fd'}
                  onMouseLeave={(e) => e.target.style.color = '#60a5fa'}
                >
                  Mot de passe oublié ?
                </a>
              </div>

              {/* Bouton de connexion */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !formData.username || !formData.password}
                className="login-button"
                style={buttonStyle}
              >
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1
                }}>
                  {isLoading ? (
                    <>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        border: '2px solid white',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginRight: '12px'
                      }} />
                      <span>Connexion en cours...</span>
                    </>
                  ) : (
                    <>
                      <LogIn size={20} style={{ marginRight: '8px' }} />
                      <span>Se connecter</span>
                      <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                    </>
                  )}
                </div>
              </button>

              {/* Séparateur */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '100%',
                    height: '1px',
                    background: 'rgba(255, 255, 255, 0.2)'
                  }} />
                </div>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '14px'
                }}>
                  <span style={{
                    padding: '0 8px',
                    background: 'transparent',
                    color: 'rgba(255, 255, 255, 0.5)'
                  }}>
                    ou
                  </span>
                </div>
              </div>

              {/* Boutons sociaux */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <button className="social-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="social-button">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter
                </button>
              </div>
            </div>

            {/* Pied de page */}
            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '12px' }}>
                © 2025 Votre Application. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;