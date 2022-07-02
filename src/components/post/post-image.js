import PropTypes from 'prop-types';

export default function PostImage({ src, caption }) {
  return <img src={src} alt={caption} className="" />;
}

PostImage.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
