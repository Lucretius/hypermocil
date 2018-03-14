const YAML = require('yamljs');
const path = require('path');
const _ = require('lodash');
const uuid = require('uuid');

const resolveHome = (filepath) => {
  if (filepath[0] === '~') {
    return path.join(process.env.HOME, filepath.slice(1));
  }
  return filepath;
}

const getFileName = (data) => {
  return _.last(new RegExp('\nhypermocil (.*?)\r.*').exec(data));
}

let savedChars = '';

exports.middleware = (store) => (next) => (action) => {
  if ('SESSION_ADD_DATA' === action.type) {
    const { data } = action;

    if (detectHypermocilCommand(data)) {
      const filename = getFileName(data);
      const yamlConfig = YAML.load(resolveHome(`~/.itermocil/${filename}.yml`));
      _.each(yamlConfig.windows, w => {
        window.rpc.emit('new', { isNewGroup: true, cols: 20, rows: 20, cwd: resolveHome(w.root) })
        for (let i = 1; i < w.panes.length; i++) {
          window.rpc.emit('new', { splitDirection: 'HORIZONTAL', cwd: resolveHome(w.root) })
        }
      });

      store.dispatch({
        type: 'CREATE_HYPERMOCIL_WINDOWS',
        hypermocilLayout: yamlConfig.windows[0].layout,
        hypermocilPaneCount: yamlConfig.windows[0].panes.length,
        hypermocilPanes: yamlConfig.windows[0].panes
      });
    } else {
      next(action);
    }
  } else {
    next(action);
  }
}

exports.reduceUI = (state, action) => {
  switch (action.type) {
    case 'CREATE_HYPERMOCIL_WINDOWS':
      state = state.set('hypermocilLayout', action.hypermocilLayout);
      state = state.set('hypermocilPaneCount', action.hypermocilPaneCount);
      state = state.set('hypermocilPanes', action.hypermocilPanes);
  }
  return state;
};

exports.decorateConfig = (config) => {
  debugger;
  return Object.assign({}, this.props, {
    css: `
        ${config.css || ''}
        ${require('./styles.js')}
      `
  });
}

const termCommands = {};

exports.mapTermsState = (state, map) => {
  return Object.assign(map, {
    hypermocilLayout: state.ui.hypermocilLayout,
    hypermocilPaneCount: state.ui.hypermocilPaneCount,
    hypermocilPanes: state.ui.hypermocilPanes
  });
};

const passProps = (uid, parentProps, props) => {
  return Object.assign(props, {
    hypermocilLayout: parentProps.hypermocilLayout,
    hypermocilPaneCount: parentProps.hypermocilPaneCount,
    hypermocilPanes: parentProps.hypermocilPanes
  });
}

exports.getTermGroupProps = passProps;
exports.getTermProps = passProps;
let commandsExecuted;

exports.decorateTerm = (Term, { React, notify }) => {
  return class extends React.Component {
    constructor(props, context) {
      super(props, context);
      this._onTerminal = this._onTerminal.bind(this);
    }
    _onTerminal(term) {
      if (this.props.onTerminal) this.props.onTerminal(term);
      const isActiveTermGroup = term.div_.parentElement.parentElement.parentElement.parentElement.classList.contains("terms_termGroupActive");
      if (isActiveTermGroup) {
        if (_.isNil(commandsExecuted) || commandsExecuted === 0) {
          commandsExecuted = this.props.hypermocilPaneCount;
        }
        const commands = _.get(this.props, `hypermocilPanes[${this.props.hypermocilPaneCount - commandsExecuted}].commands`, []);
        commandsExecuted--;
        term.div_.parentElement.parentElement.parentElement.classList.add(`itermocil-${this.props.hypermocilLayout}`)
        term.div_.parentElement.parentElement.parentElement.classList.add(`itermocil`)
        term.div_.parentElement.parentElement.classList.add(`itermocilTab`)
        const originalTermHandler = term.onTerminalReady;
        term.onTerminalReady = () => {
          originalTermHandler();
          for (let i = 0; i < commands.length; i++) {
            term.io.sendString(commands[i] + "\r");
          }
        };
      }
    }
    render() {
      return React.createElement(Term, Object.assign({}, this.props, {
        onTerminal: this._onTerminal
      }));
    }
  }
}

function detectHypermocilCommand(data) {
  return new RegExp('\nhypermocil .*\r.*').test(data)
}