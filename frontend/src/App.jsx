import { useCallback, useEffect, useState } from 'react';
import { getPosts, getReports, getStats, errorKey, isMock } from './api.js';
import { useI18n } from './i18n.jsx';
import { href, useRoute } from './router.js';
import Header from './components/Header.jsx';
import Ticker from './components/Ticker.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import ReportForm from './components/ReportForm.jsx';
import ReportList from './components/ReportList.jsx';
import Gallery from './components/Gallery.jsx';
import NewsCard from './components/NewsCard.jsx';
import BlogPage from './components/BlogPage.jsx';
import ArticlePage from './components/ArticlePage.jsx';
import PostEditor from './components/PostEditor.jsx';
import AgentDialog from './components/AgentDialog.jsx';
import ContactPage from './components/ContactPage.jsx';
import Footer from './components/Footer.jsx';
import Icon from './components/Icon.jsx';

const FILTERS = ['', 'signale', 'en_cours', 'resolu'];
const AGENT_KEY = 'ecocollecte-agent';

function readAgentKey() {
  try {
    return sessionStorage.getItem(AGENT_KEY) || '';
  } catch {
    return '';
  }
}

export default function App() {
  const { t } = useI18n();
  const route = useRoute();

  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState('');
  const [reportsLoading, setReportsLoading] = useState(true);

  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  const [adminKey, setAdminKeyState] = useState(readAgentKey);
  const [agentOpen, setAgentOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [errorK, setErrorK] = useState('');

  const setAdminKey = (key) => {
    setAdminKeyState(key);
    try {
      if (key) sessionStorage.setItem(AGENT_KEY, key);
      else sessionStorage.removeItem(AGENT_KEY);
    } catch {
      /* ignoré */
    }
  };

  const loadReports = useCallback(async () => {
    setReportsLoading(true);
    try {
      const [r, s] = await Promise.all([getReports(filter), getStats()]);
      setReports(r);
      setStats(s);
      setErrorK('');
    } catch (err) {
      setErrorK(errorKey(err));
    } finally {
      setReportsLoading(false);
    }
  }, [filter]);

  const loadPosts = useCallback(async () => {
    setPostsLoading(true);
    try {
      setPosts(await getPosts());
    } catch (err) {
      setErrorK(errorKey(err));
    } finally {
      setPostsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const banners = (
    <>
      {isMock && (
        <p className="alert alert-info">
          <Icon name="info" size={18} /> {t('app.mockBanner')}
        </p>
      )}
      {errorK && (
        <p className="alert alert-error" role="alert">
          <Icon name="alert" size={18} /> {t(errorK)}
        </p>
      )}
    </>
  );

  return (
    <>
      <a className="skip-link" href="#contenu">
        {t('nav.skip')}
      </a>
      <Header route={route} adminKey={adminKey} onAgent={() => setAgentOpen(true)} />
      <Ticker posts={posts} />

      <div id="contenu">
        {route.name === 'home' && (
          <>
            <Hero />
            <main className="shell main">
              <Stats stats={stats} />
              {banners}

              <div className="layout">
                <aside id="signaler" className="layout-form">
                  <ReportForm onCreated={loadReports} />
                </aside>

                <section id="signalements" className="layout-list">
                  <div className="section-head">
                    <div>
                      <span className="kicker">{t('list.eyebrow')}</span>
                      <h2>
                        {t('list.title')}
                        <span className="count">{reports.length}</span>
                      </h2>
                    </div>
                    <div className="filters" role="group" aria-label={t('list.filter')}>
                      {FILTERS.map((f) => (
                        <button
                          key={f || 'all'}
                          type="button"
                          className={`filter ${f || 'all'} ${filter === f ? 'active' : ''}`}
                          aria-pressed={filter === f}
                          onClick={() => setFilter(f)}
                        >
                          {f && <span className="dot" />}
                          {f ? t(`status.${f}`) : t('list.all')}
                          <span className="filter-count">{(f ? stats[f] : stats.total) ?? 0}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {!adminKey && (
                    <button type="button" className="agent-hint" onClick={() => setAgentOpen(true)}>
                      <Icon name="lock" size={16} /> {t('list.agentHint')}
                      <Icon name="arrowRight" size={16} />
                    </button>
                  )}

                  <ReportList
                    reports={reports}
                    loading={reportsLoading}
                    adminKey={adminKey}
                    onChanged={loadReports}
                    onError={setErrorK}
                  />
                </section>
              </div>

              <Gallery />

              <section className="section" id="actualites">
                <div className="section-intro section-intro-row">
                  <div>
                    <span className="kicker">{t('news.eyebrow')}</span>
                    <h2>{t('news.title')}</h2>
                    <p className="muted">{t('news.lead')}</p>
                  </div>
                  <a href={href.blog} className="btn btn-outline">
                    {t('news.all')} <Icon name="arrowRight" size={18} />
                  </a>
                </div>
                <div className="news-grid">
                  {posts.slice(0, 3).map((p) => (
                    <NewsCard key={p._id} post={p} />
                  ))}
                </div>
              </section>
            </main>
          </>
        )}

        {route.name === 'blog' && (
          <>
            <BlogPage
              posts={posts}
              loading={postsLoading}
              adminKey={adminKey}
              onPublish={() => setEditorOpen(true)}
            />
            <div className="shell">{banners}</div>
          </>
        )}

        {route.name === 'contact' && <ContactPage />}

        {route.name === 'article' && (
          <ArticlePage
            id={route.id}
            posts={posts}
            loading={postsLoading}
            adminKey={adminKey}
            onDeleted={loadPosts}
          />
        )}
      </div>

      <Footer />

      <AgentDialog
        open={agentOpen}
        onClose={() => setAgentOpen(false)}
        adminKey={adminKey}
        setAdminKey={setAdminKey}
      />
      <PostEditor
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        adminKey={adminKey}
        onCreated={(post) => {
          setEditorOpen(false);
          loadPosts();
          window.location.hash = href.article(post._id);
        }}
      />
    </>
  );
}
