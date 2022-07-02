import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import PostHeader from './post-header';
import PostImage from './post-image';
import PostAction from './post-actions';
import PostFooter from './post-footer';
import PostComment from './comment';

export default function Post({ content }) {
  const commentInput = useRef(null);

  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="rounded col-span-2 w-7/12 border bg-white border-gray-primary mb-4 overflow-hidden">
      <PostHeader username={content.username} />
      <PostImage src={content.imageSrc} caption={content.caption} />
      <PostAction
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <PostFooter caption={content.caption} username={content.username} />
      <PostComment
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
}

Post.propType = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};
