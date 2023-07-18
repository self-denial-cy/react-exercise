import { Link, Route, Redirect, Switch } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div>首页</div>
      <nav>
        <Link to="/home/a">A</Link>
        <span> | </span>
        <Link to="/home/b">B</Link>
        <span> | </span>
        <Link to="/home/c">C</Link>
      </nav>
      <div>
        <Switch>
          <Redirect exact from="/home" to="/home/a"></Redirect>
          <Route path="/home/a" component={A}></Route>
          <Route path="/home/b" component={B}></Route>
          <Route path="/home/c" component={C}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </div>
    </>
  );
}

function A() {
  return <div>A</div>;
}

function B() {
  return <div>B</div>;
}

function C() {
  return <div>C</div>;
}
