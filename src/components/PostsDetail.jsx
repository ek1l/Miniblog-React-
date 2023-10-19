import styles from './PostDetail.module.css';

import { Link } from 'react-router-dom';

const PostsDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <h2> {post.tile}</h2>
      <p className={styles.createdby}>{post.createdBy}</p>
      <div className={styles.tags}>
        {post.tagsArray.map((tag, index) => (
          <p key={index}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Ler
      </Link>
    </div>
  );
};

export default PostsDetail;
