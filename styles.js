module.exports = `
.itermocil > .splitpane_divider {
  display: none !important;
}

.itermocil-3-columns {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row !important;
  flex: 3;
}

.itermocil-3-columns>div {
  flex-basis: 33% !important;
  flex-grow: 3 !important;
  border: 1px solid #333;
}

.itermocil-tiled {
  display: flex;
  flex-wrap: wrap;
  flex: 2;
  flex-direction: row !important
}

.itermocil-tiled>div {
  flex-basis: 49% !important;
  flex-grow: 2 !important;
  border: 1px solid #333;
}

.itermocil-main-vertical {
  display: inline-flex;
  flex: 8;
  flex-flow: column wrap;
  height: 100%;
}


.itermocil-main-vertical>div {
  flex: 1;
  flex-basis: 1 !important;
  flex-grow: 1 !important;
  border: 1px solid #333;
  margin:-1px;
}

.itermocil-main-vertical>div:first-child {
  flex-basis: 100% !important;
  flex-grow: 9 !important;
  height: 100%;
}

.itermocil-main-vertical-flipped {
  display: inline-flex;
  flex: 9;
  flex-flow: column wrap;
  height: 100%;
}

.itermocil-main-vertical-flipped>div {
  flex: 1;
  border: 1px solid #333;
}

.itermocil-main-vertical-flipped>div:last-child {
  flex-basis: 100%;
  flex-grow: 9;
  height: 100%;
}

.itermocil-double-main-horizontal {
  display: flex;
  flex-wrap: wrap;
  flex: 9;
  flex-direction: row !important;
}

.itermocil-double-main-horizontal>div {
  flex: 1 !important;
  flex-basis: 13% !important;
  flex-grow: 5 !important;
  border: 1px solid #333;
}

// accounting for extra div
.itermocil-double-main-horizontal>div:nth-last-child(2),
.itermocil-double-main-horizontal>div:nth-last-child(4) {
  flex-basis: 49% !important;
  flex-grow: 4.5 !important;
}

.itermocil-double-main-vertical {
  display: inline-flex;
  flex: 8;
  flex-flow: column wrap;
  height: 100%;
  flex-direction: column !important;
}

.itermocil-double-main-vertical>div {
  flex: 1 !important;
  border: 1px solid #333;
}

// nth-child(3) to account for border div
.itermocil-double-main-vertical>.itermocilTab:first-child,
.itermocil-double-main-vertical>.itermocilTab:nth-child(3) {
  flex-basis: 100% !important;
  flex-grow: 9 !important;
  height: 100%;
}

.itermocil-even-vertical {
  display: flex;
  flex-direction: column;
}

.itermocil-even-vertical>div {
  flex: 1;
  border-bottom: 1px solid #333;
}

.itermocil-even-horizontal {
  display: flex !important;
  flex-direction: row !important;
}

.itermocil-even-horizontal>div {
  flex: 1 !important;
  border-right: 1px solid #333;
}
`;