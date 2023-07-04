import PropTypes from 'prop-types';
import { Children } from 'react';

export default function Dialog(props) {
  let { title, content, children } = props;
  children = Children.toArray(children);
  return (
    <>
      <div className="dialog" style={{ width: '200px' }}>
        <div className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="title">{title}</div>
          <span>x</span>
        </div>
        <div className="content">{content}</div>
        {children.length ? <div className="footer">{children}</div> : null}
      </div>
    </>
  );
}

Dialog.defaultProps = {
  title: '提示'
};

Dialog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string.isRequired
};
