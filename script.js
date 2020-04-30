const InfoLabel = props => React.createElement("div", { id: props.id }, React.createElement("span", null, props.text));
const InfoValue = props => React.createElement("input", { id: props.id, value: props.value });

const Arrow = props => {
  const isUp = props.up;
  const componentName = `${props.id}-${isUp ? "increment" : "decrement"}`;
  const className = `fa-angle-double-${isUp ? "up" : "down"}`;
  return (
    React.createElement("button", { onClick: props.handleClick },
    React.createElement("i", { id: componentName, className: `fas ${className}` })));


};

const Setting = (props) =>
React.createElement("div", { className: "row" },
React.createElement(InfoLabel, { id: `${props.id}-label`, text: `${props.text} Length` }),
React.createElement(InfoValue, { id: `${props.id}-length`, value: props.value }),
React.createElement(Arrow, { up: true, id: props.id, handleClick: props.upClick }),
React.createElement(Arrow, { up: false, id: props.id, handleClick: props.downClick }));


const SessionLabel = (props) =>
React.createElement("div", { className: "row" },
React.createElement("span", { id: "timer-label" }, props.isSession ? "Session" : "Break"));


const Clock = (props) =>
React.createElement("div", { className: "row" },
React.createElement("input", { id: "time-left", value: new Date(props.remaining * 1000).toISOString().substr(14, 5) }),
React.createElement("button", { id: "start_stop" },
React.createElement("i", { className: "fas fa-play" })),

React.createElement("button", { id: "reset", onClick: props.onResetClick },
React.createElement("i", { className: "fas fa-sync" })),

React.createElement("audio", { id: "beep", src: "https://goo.gl/65cBl1" }));


class PomodoroApp extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      isSession: true,
      remaining: 0,
      firstTime: true,
      inPlay: false };


    this.handleReset = this.handleReset.bind(this);
    this.handleDecrementBreak = this.handleDecrementBreak.bind(this);
    this.handleIncrementBreak = this.handleIncrementBreak.bind(this);
    this.handleDecrementSession = this.handleDecrementSession.bind(this);
    this.handleIncrementSession = this.handleIncrementSession.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.clockRunning = this.clockRunning(this);
  }

  clockRunning() {
    setInterval(() => {
      if (this.state.inPlay)
      {
        if (this.state.remaining === 0) {
          const sound = document.getElementById("beep");
          sound.currentTime = 0;
          sound.play();
          if (this.state.isSession)
          {
            this.setState(state => ({
              remaining: state.break * 60 - 1,
              isSession: false }));

          } else

          {
            this.setState(state => ({
              remaining: state.session * 60 - 1,
              isSession: true }));

          }
        } else

        {
          this.setState(({ remaining }) => ({
            remaining: remaining - 1 }));

        }
      }
    }, 1000);
  }

  handlePlayPause()
  {
    this.setState(
    state => {
      if (state.firstTime)
      {
        return {
          firstTime: false,
          remaining: state.session * 60,
          inPlay: true };

      }
      return {
        inPlay: false };

    },
    this.clockRunning);

  }

  handleDecrementBreak()
  {
    this.setState(state => ({
      break: state.break > 0 && state.break < 60 ? state.break - 1 : state.break }));

  }

  handleIncrementBreak()
  {
    this.setState(state => ({
      break: state.break > 0 && state.break < 60 ? state.break + 1 : state.break }));

  }

  handleDecrementSession()
  {
    this.setState(state => ({
      session: state.session > 0 && state.session < 60 ? state.session - 1 : state.session }));

  }

  handleIncrementSession()
  {
    this.setState(state => ({
      session: state.session > 0 && state.session < 60 ? state.session + 1 : state.session }));

  }

  handleReset()
  {
    this.setState(
    {
      break: 5,
      session: 25,
      isSession: true,
      remaining: 0,
      firstTime: true,
      inPlay: false });


    e.preventDefault();
  }

  render()
  {
    return (
      React.createElement("div", { className: "container" },
      React.createElement(Setting, { id: "break", text: "Break", value: this.state.break, upClick: this.state.handleIncrementBreak, downClick: this.state.handleDecrementBreak }),
      React.createElement(Setting, { id: "session", text: "Session", value: this.state.session, upClick: this.state.handleIncrementSession, downClick: this.state.handleDecrementSession }),
      React.createElement(SessionLabel, { isSession: this.state.isSession }),
      React.createElement(Clock, { remaining: this.state.remaining, onResetClick: this.state.handleReset })));


  }}


ReactDOM.render(React.createElement(PomodoroApp, null), document.getElementById("root"));