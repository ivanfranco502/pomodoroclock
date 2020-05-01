const InfoLabel = props => React.createElement("div", { id: props.id, className: "col-4" }, React.createElement("span", null, props.text));
const InfoValue = props => React.createElement("input", { id: props.id, className: "col-1", value: props.value });

const Arrow = props => {
  const isUp = props.up;
  const componentName = `${props.id}-${isUp ? "increment" : "decrement"}`;
  const className = `fa-angle-double-${isUp ? "up" : "down"}`;
  return (
    React.createElement("button", { onClick: props.handleClick, className: "col-1 btn" },
    React.createElement("i", { id: componentName, className: `fas ${className}` })));


};

const Setting = (props) =>
React.createElement("div", { className: "row" },
React.createElement("div", { className: "col-2" }),
React.createElement(InfoLabel, { id: `${props.id}-label`, text: `${props.text} Length` }),
React.createElement(InfoValue, { id: `${props.id}-length`, value: props.value, className: "col-4" }),
React.createElement(Arrow, { up: true, id: props.id, handleClick: props.upClick, className: "" }),
React.createElement(Arrow, { up: false, id: props.id, handleClick: props.downClick, className: "" }));


const SessionLabel = (props) =>
React.createElement("span", { id: "timer-label", className: "col-3" }, props.isSession ? "Session" : "Break");

const Clock = (props) =>
React.createElement("div", { className: "row" },
React.createElement("div", { className: "col-2" }),
React.createElement(SessionLabel, { isSession: props.isSession }),
React.createElement("input", { id: "time-left", className: "col-2", value: new Date(props.remaining * 1000).toISOString().substr(14, 5) }),
React.createElement("button", { id: "start_stop", onClick: props.onPlayPauseClick, className: "col-1 btn" },
React.createElement("i", { className: "fas fa-play" })),

React.createElement("button", { id: "reset", onClick: props.onResetClick, className: "col-1 btn" },
React.createElement("i", { className: "fas fa-sync" })),

React.createElement("audio", { id: "beep", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" }));


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


    event.preventDefault();
  }

  handleDecrementBreak()
  {
    this.setState(state => ({
      break: state.break > 0 && state.break < 60 ? state.break - 1 : state.break }));

    event.preventDefault();
  }

  handleIncrementBreak()
  {
    this.setState(state => ({
      break: state.break > 0 && state.break < 60 ? state.break + 1 : state.break }));

    event.preventDefault();
  }

  handleDecrementSession()
  {
    this.setState(state => ({
      session: state.session > 0 && state.session < 60 ? state.session - 1 : state.session }));

    event.preventDefault();
  }

  handleIncrementSession()
  {
    this.setState(state => ({
      session: state.session > 0 && state.session < 60 ? state.session + 1 : state.session }));

    event.preventDefault();
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


    event.preventDefault();
  }

  render()
  {
    return (
      React.createElement("div", { className: "container" },
      React.createElement("div", { className: "row" },
      React.createElement("h1", null, "Pomodoro timer")),

      React.createElement(Setting, { id: "break", text: "Break", value: this.state.break, upClick: this.handleIncrementBreak, downClick: this.handleDecrementBreak }),
      React.createElement(Setting, { id: "session", text: "Session", value: this.state.session, upClick: this.handleIncrementSession, downClick: this.handleDecrementSession }),
      React.createElement(Clock, { isSession: this.state.isSession, remaining: this.state.remaining, onResetClick: this.handleReset, onPlayPauseClick: this.handlePlayPause })));


  }}


ReactDOM.render(React.createElement(PomodoroApp, null), document.getElementById("root"));