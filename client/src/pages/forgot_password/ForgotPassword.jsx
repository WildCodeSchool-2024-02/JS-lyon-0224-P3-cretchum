import { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Un e-mail de réinitialisation du mot de passe a été envoyé.');
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Une erreur est survenue. Veuillez réessayer.');
        setMessage('');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Réinitialisation du mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Adresse e-mail :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;