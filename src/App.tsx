import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import styles from './App.module.css';
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import pagesAnimation from './constants/animations';
import Main from './components/Pages/Main/Main';
import Tournaments from './components/Pages/Tournaments/Tournaments';

function App() {
  const location = useLocation();
  const getTitleByPath = (path: string): string => {
    switch (path) {
      case "/":
        return "Главная";
      case "/fighters":
        return "Бойцы";
      case "/tournaments":
        return "Турниры";
      case "/achievements":
        return "Достижения";
      case "/news":
        return "Новости";
      case "/comparison":
        return "Сравнение";
      default:
        return "Главная";
    }
  };
  const title = getTitleByPath(location.pathname);
  return (
      <div className={styles.container}>
        <SideBar />
        <div className={styles.wrapper}>
          <Header title={title} />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <motion.div
                    key="main"
                    initial="initial"
                    animate="in"
                    variants={pagesAnimation}
                    transition={{ duration: 0.3 }}
                  >
                    <Main />
                  </motion.div>
                }
              />
              <Route
                path="/fighters"
                element={
                  <motion.div
                    key="fighters"
                    initial="initial"
                    animate="in"
                    variants={pagesAnimation}
                    transition={{ duration: 0.3 }}
                  >
                    <div></div>
                  </motion.div>
                }
              />
              <Route
                path="/tournaments"
                element={
                  <motion.div
                    key="tournaments"
                    initial="initial"
                    animate="in"
                    variants={pagesAnimation}
                    transition={{ duration: 0.3 }}
                  >
                    <Tournaments />
                  </motion.div>
                }
              />
              <Route
                path="/achievements"
                element={
                  <motion.div
                    key="achievements"
                    initial="initial"
                    animate="in"
                    variants={pagesAnimation}
                    transition={{ duration: 0.3 }}
                  >
                    <div></div>
                  </motion.div>
                }
              />
              <Route
                path="/news"
                element={
                  <motion.div
                    key="news"
                    initial="initial"
                    animate="in"
                    variants={pagesAnimation}
                    transition={{ duration: 0.3 }}
                  >
                    <div></div>
                  </motion.div>
                }
              />
              <Route
                path="/comparison"
                element={
                  <motion.div
                    key="comparison"
                    initial="initial"
                    animate="in"
                    variants={pagesAnimation}
                    transition={{ duration: 0.3 }}
                  >
                    <div></div>
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
  );
}

export default App;