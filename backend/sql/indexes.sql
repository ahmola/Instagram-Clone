-- 특정 유저의 게시물을 날짜 기준 내림차순 정렬
-- EXPLAIN SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC;
CREATE INDEX idx_posts_user_created_at
ON posts (user_id, created_at DESC);

-- 특정 게시물의 댓글 목록 날짜 기준 오름차순 정렬
-- EXPLAIN SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC;
CREATE INDEX idx_comments_post_created_at
ON comments (post_id, created_at);

-- 특정 유저의 팔로잉 목록 날짜별 내림차순 정렬
-- EXPLAIN SELECT followee_id FROM follows WHERE follower_id = ? ORDER BY created_at DESC;
CREATE INDEX idx_follows_follower
ON follows (follower_id, created_at DESC);

-- 게시글 이미지 순서별 오름차순 정렬
-- EXPLAIN SELECT * FROM post_images where post_id = ? ORDER BY ASC;
CREATE INDEX idx_post_images_post_seq
ON post_images (post_id, seq);