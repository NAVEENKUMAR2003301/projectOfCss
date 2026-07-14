import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./topics/Home";

import Selectors from "./topics/Selectors";
import BoxModel from "./topics/BoxModel";
import Cascade from "./topics/Cascade";

import DisplayPosition from "./topics/DisplayPosition";
import Flexbox from "./topics/Flexbox";
import Grid from "./topics/Grid";

import TypographyColor from "./topics/TypographyColor";
import Transitions from "./topics/Transitions";
import Animations from "./topics/Animations";

import Responsive from "./topics/Responsive";
import Pseudo from "./topics/Pseudo";
import VariablesStacking from "./topics/VariablesStacking";

const topicRoutes = {
  selectors: Selectors,
  "box-model": BoxModel,
  cascade: Cascade,
  "display-position": DisplayPosition,
  flexbox: Flexbox,
  grid: Grid,
  "typography-color": TypographyColor,
  transitions: Transitions,
  animations: Animations,
  responsive: Responsive,
  pseudo: Pseudo,
  "variables-stacking": VariablesStacking,
};

const App = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {Object.entries(topicRoutes).map(([id, Comp]) => (
            <Route key={id} path={`/topic/${id}`} element={<Comp />} />
          ))}
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
