import { useRouteMatch, useParams, useLocation } from 'react-router-dom';

export default function About() {
  const match = useRouteMatch();
  console.log(match.params);
  console.log(useParams());

  const location = useLocation();
  console.log(location.state);
  return (
    <>
      <div>关于</div>
    </>
  );
}
