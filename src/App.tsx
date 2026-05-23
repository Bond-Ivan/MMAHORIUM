import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import styles from "./App.module.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import pagesAnimation from "./constants/animations";
import { lazy, Suspense, useState, type ReactNode } from "react";
import ScrollToTop from "./shared/scrollTop/scrollTop";
import { useLang } from "./hooks/useLang";

const Main = lazy(() => import("./components/Pages/Main/Main"));
const Tournaments = lazy(() => import("./components/Pages/Tournaments/Tournaments"));
const News = lazy(() => import("./components/Pages/News/News"));
const Achievements = lazy(() => import("./components/Pages/Achievements/Achievements"));
const Fighters = lazy(() => import("./components/Pages/Fighters/Fighters"));
const Compare = lazy(() => import("./components/Pages/Compare/Compare"));

type AnimatedPageProps = {
  pageKey: string;
  children: ReactNode;
};

function AnimatedPage({ pageKey, children }: AnimatedPageProps) {
  return (
    <motion.div
      key={pageKey}
      initial="initial"
      animate="in"
      exit="out"
      variants={pagesAnimation}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function PageLoader() {
  return <div className={styles.pageLoader}>Loading...</div>;
}

function App() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useLang();

  const titles: Record<string, string> = {
    "/": t("sidebar.overview"),
    "/fighters": t("sidebar.fighters"),
    "/tournaments": t("sidebar.tournaments"),
    "/achievements": t("sidebar.achievements"),
    "/news": t("sidebar.news"),
    "/compare": t("sidebar.compare"),
  };

  const title = titles[location.pathname] ?? t("sidebar.overview");

  return (
    <div className={styles.container}>
      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.overlayVisible : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className={styles.wrapper}>
        <Header
          title={title}
          onMenuToggle={() => setIsSidebarOpen((prev) => !prev)}
          isSidebarOpen={isSidebarOpen}
        />

        <ScrollToTop />

        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <AnimatedPage pageKey="main">
                    <Main />
                  </AnimatedPage>
                }
              />
              <Route
                path="/fighters"
                element={
                  <AnimatedPage pageKey="fighters">
                    <Fighters />
                  </AnimatedPage>
                }
              />
              <Route
                path="/tournaments"
                element={
                  <AnimatedPage pageKey="tournaments">
                    <Tournaments />
                  </AnimatedPage>
                }
              />
              <Route
                path="/achievements"
                element={
                  <AnimatedPage pageKey="achievements">
                    <Achievements />
                  </AnimatedPage>
                }
              />
              <Route
                path="/news"
                element={
                  <AnimatedPage pageKey="news">
                    <News />
                  </AnimatedPage>
                }
              />
              <Route
                path="/compare"
                element={
                  <AnimatedPage pageKey="compare">
                    <Compare />
                  </AnimatedPage>
                }
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
    </div>
  );
}

export default App;