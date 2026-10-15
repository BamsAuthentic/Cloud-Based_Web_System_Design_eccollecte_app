import { useState } from 'react';
import { errorKey, verifyAgent } from '../api.js';
import { useI18n } from '../i18n.jsx';
import Icon from './Icon.jsx';
import Modal from './Modal.jsx';

export default function AgentDialog({ open, onClose, adminKey, setAdminKey }) {
  const { t } = useI18n();
  const [key, setKey] = useState('');
  const [errorK, setErrorK] = useState('');
  const [loading, setLoading] = useState(false);

  async function login(e) {
    e.preventDefault();
    const value = key.trim();
    if (!value) return;
    setErrorK('');
    setLoading(true);
    try {
      await verifyAgent(value);
      setAdminKey(value);
      setKey('');
      onClose();
    } catch (err) {
      setErrorK(errorKey(err));
    } finally {
      setLoading(false);
    }
  }

  function close() {
    setErrorK('');
    onClose();
  }

  return (
    <Modal open={open} onClose={close} labelledBy="agent-title" className="modal-sm">
      <div className="modal-head">
        <span className="head-icon head-icon-blue">
          <Icon name="shield" />
        </span>
        <div>
          <h2 id="agent-title">{t('agent.title')}</h2>
          <p className="muted">{t('agent.lead')}</p>
        </div>
        <button type="button" className="icon-btn" onClick={close} aria-label={t('nav.close')}>
          <Icon name="x" />
        </button>
      </div>

      {adminKey ? (
        <div className="modal-body">
          <p className="alert alert-success">
            <Icon name="check" size={18} /> {t('agent.connected')}
          </p>
          <button
            type="button"
            className="btn btn-outline btn-block"
            onClick={() => {
              setAdminKey('');
              close();
            }}
          >
            <Icon name="logout" size={18} /> {t('agent.logout')}
          </button>
        </div>
      ) : (
        <form className="modal-body" onSubmit={login}>
          <div className="field">
            <label htmlFor="agent-key">{t('agent.key')}</label>
            <div className="input-icon">
              <Icon name="lock" size={18} />
              <input
                id="agent-key"
                type="password"
                autoComplete="current-password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                autoFocus
                required
              />
            </div>
          </div>
          {errorK && (
            <p className="alert alert-error" role="alert">
              <Icon name="alert" size={18} /> {t(errorK)}
            </p>
          )}
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading && <span className="spinner" aria-hidden="true" />}
            {t('agent.login')}
          </button>
        </form>
      )}
    </Modal>
  );
}
