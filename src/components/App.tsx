import React from "react";
import Pomodoro from "./Pomodoro/Pomodoro";
import {Provider} from "react-redux";
import store from "../store/Store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Pomodoro />
    </Provider>
  );
};

export default App;
