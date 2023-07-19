import { useLocation } from 'react-router-dom';
import qs from 'qs';

export default function My() {
  const location = useLocation();
  console.log(qs.parse(location.search.slice(1)));
  console.log(new URLSearchParams(location.search));
  return (
    <>
      <div>我的</div>
    </>
  );
}
