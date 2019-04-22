import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import "./index.css";

import App from "./App";
import {BrowserRouter, HashRouter} from 'react-router-dom';

/////////////////////////////////  MOBX - Start
import { configure } from 'mobx';
configure({
    enforceActions: "observed"
});
import {Provider as MobxProvider} from 'mobx-react'
import * as stores from './stores';

///////////////////////////////// MOBX - End


ReactDOM.render(
  <MobxProvider { ...stores }>
    <HashRouter>
    {/* <BrowserRouter> */}
        <App/>
    {/* </BrowserRouter> */}
    </HashRouter>
  </MobxProvider>,
document.getElementById("root"));