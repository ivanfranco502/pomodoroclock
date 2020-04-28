const InfoLabel = props => React.createElement("div", { id: props.id }, React.createElement("span", null, props.text));
const InfoValue = props => React.createElement("input", { id: props.id, value: props.value });

const Arrow = props => {
  const isUp = props.up;
  const componentName = `${props.id}-${isUp ? "increment" : "decrement"}`;
  const className = `angle-double-${isUp ? "up" : "down"}`;
  return (
    React.createElement("i", { id: componentName, className: `fa ${className}` }));

};

const Setting = (props) =>
React.createElement("div", { className: "row" },
React.createElement(InfoLabel, { id: `${props.id}-label`, text: `${props.text} Length` }),
React.createElement(InfoValue, { id: `${props.id}-length`, value: props.value }),
React.createElement(Arrow, { up: true, id: props.id }),
React.createElement(Arrow, { up: false, id: props.id }));


class PomodoroApp extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      break: 5,
      session: 25 };

  }

  render()
  {
    return (
      React.createElement("div", { className: "container" },
      React.createElement(Setting, { id: "break", text: "Break", value: this.state.break }),
      React.createElement(Setting, { id: "session", text: "Session", value: this.state.session })));


  }}


ReactDOM.render(React.createElement(PomodoroApp, null), document.getElementById("root"));