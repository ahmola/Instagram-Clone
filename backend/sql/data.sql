USE user_db;
-- ========================
-- USERS
-- ========================
INSERT INTO users (username, password_hash, bio)
VALUES
    ('alice', 'hashed_pw_1', 'Hello, I am Alice'),
    ('bob', 'hashed_pw_2', 'Hi, Bob here!'),
    ('charlie', 'hashed_pw_3', 'Charlie’s world'),
    ('david', 'hashed_pw_4', 'Love coding!');

-- ========================
-- FOLLOWS
-- alice(1)을 bob(2), charlie(3), david(4)이 팔로우하는 구조
-- ========================
INSERT INTO follows (follower_id, followee_id)
VALUES
    (2, 1),  -- bob → alice
    (3, 1),  -- charlie → alice
    (4, 1),  -- david → alice
    (1, 2),  -- alice → bob
    (1, 3);  -- alice → charlie

USE post_db;
-- ========================
-- POSTS
-- alice가 2개, bob이 1개, charlie 1개
-- ========================
INSERT INTO posts (user_id, caption)
VALUES
    (1, 'Alice first post!'),
    (1, 'Another day, another post'),
    (2, 'Bob is here'),
    (3, 'Charlie’s first post');

-- ========================
-- POST IMAGES
-- ========================

USE comment_db;
-- ========================
-- COMMENTS
-- alice의 포스트 1번에 bob/charlie가 댓글
-- ========================
INSERT INTO comments (user_id, post_id, content)
VALUES
    (2, 1, 'Nice post Alice!'),
    (3, 1, 'Looks great!'),
    (1, 3, 'Cool post Bob'),
    (4, 2, 'Good vibe!'),
    (1, 4, 'Charlie, nice photo!');

USE like_db;
-- ========================
-- LIKES
-- 다양한 사용자 간 좋아요 데이터
-- ========================
INSERT INTO likes (post_id, user_id)
VALUES
    (1, 2),  -- bob → alice post
    (1, 3),  -- charlie → alice post
    (1, 4),  -- david → alice post
    (2, 2),  -- bob → alice post2
    (3, 1),  -- alice → bob post
    (4, 1),  -- alice → charlie post
    (4, 2);  -- bob → charlie post