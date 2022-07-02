import PropTypes from 'prop-types';

export default function PostFooter({ caption, username }) {
  return (
    <div className="p-4 pt-0 pb-2 text-sm">
      <span className="font-bold mr-1">{username}</span>
      <span>{caption}</span>
    </div>
  );
}

PostFooter.propType = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
