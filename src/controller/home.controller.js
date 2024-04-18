const connection = require("../../config/connection");
const logger = require('../../logger/logger');

exports.getHome = async (req, res) => {
  let sql = `
  SELECT users.username,
  users.id as user_id, 
  users.name, 
  COALESCE(users.profile_img_url, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOFx557XPIXXmnhk7joe2Pq2uQhb1iCJ688RgQZzH5ZA&s') as profile_img_url, 
  tweets.content,
  tweets.id as tweet_id,
  tweet_comments.content as comments, 
  CASE
    WHEN tweets.updated_at IS NOT NULL THEN
      CASE
        WHEN TIMESTAMPDIFF(SECOND, tweets.updated_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, tweets.updated_at, NOW()+1), ' seconds ago')
        WHEN TIMESTAMPDIFF(MINUTE, tweets.updated_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, tweets.updated_at, NOW()), ' minutes ago')
        WHEN TIMESTAMPDIFF(HOUR, tweets.updated_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, tweets.updated_at, NOW()), ' hours ago')
        ELSE CONCAT(DATE_FORMAT(tweets.updated_at, '%d'), ' ', DATE_FORMAT(tweets.updated_at, '%M'))
      END
    ELSE
      CASE
        WHEN TIMESTAMPDIFF(SECOND, tweets.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, tweets.created_at, NOW()+1), ' seconds ago')
        WHEN TIMESTAMPDIFF(MINUTE, tweets.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, tweets.created_at, NOW()), ' minutes ago')
        WHEN TIMESTAMPDIFF(HOUR, tweets.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, tweets.created_at, NOW()), ' hours ago')
        ELSE CONCAT(DATE_FORMAT(tweets.created_at, '%d'), ' ', DATE_FORMAT(tweets.created_at, '%M'))
      END
  END as time,
  COALESCE(medias.media_url) as media_url
  FROM users
  JOIN tweets ON users.id = tweets.user_id
  LEFT JOIN medias ON tweets.id = medias.tweet_id
  LEFT JOIN tweet_comments ON tweet_comments.user_id = tweets.id 
  WHERE users.is_active = 1 AND tweets.is_posted = 1 AND tweets.deleted_at IS NULL
  ORDER BY 
    CASE
      WHEN tweets.updated_at IS NOT NULL THEN tweets.updated_at
      ELSE tweets.created_at
    END DESC;
`;

  const [rows] = await connection.execute(sql);
  res.render('../views/pages/home', { tweets: rows });
}

exports.post_comment = async (req, res) => {
  let { tweetId, comment } = req.body;
  let user_id = req.user[0][0].id
  let sql = `
        INSERT INTO tweet_comments (user_id, tweet_id, content)
        VALUES (?, ?, ?)
    `;

  let [result] = await connection.execute(sql, [user_id, tweetId, comment]);
  let [comment_mention] = await connection.execute(`SELECT * FROM tweet_comments WHERE tweet_id = ?`, [tweetId])
  comment_mention.forEach((mention_name) => {
    console.log("result", mention_name.content);
  })
  const mentionedUsernames = extractMentionedUsernames(
    comment_mention[0].content
  );
  const mentionedUsers = await getUsersByUsernames(mentionedUsernames);
  console.log(mentionedUsers);


  // console.log(sql);

  let [tweet_user_id] = await connection.execute(`SELECT user_id FROM tweets WHERE id = ?`, [tweetId])
  await connection.execute(`INSERT INTO notifications (user_id, tweet_id, type, related_user_id)
    VALUES (?, ?, 'Comment', ?);`, [tweet_user_id[0].user_id, tweetId, user_id])

  res.json({
    success: result.affectedRows > 0,
    comment: {
      id: result.insertId,
      content: comment,
    },
  });
}
exports.get_comment = async (req, res) => {
  let tweetId = req.params.id;
  let sql = `SELECT tc.id, tc.user_id, tc.tweet_id, tc.content, tc.created_at, tc.updated_at, tc.deleted_at, u.username, u.name, u.profile_img_url, t.id as tweet_id,
  CASE
      WHEN TIMESTAMPDIFF(SECOND, tc.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, tc.created_at, NOW()+1), ' seconds ago')
      WHEN TIMESTAMPDIFF(MINUTE, tc.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, tc.created_at, NOW()), ' minutes ago')
      WHEN TIMESTAMPDIFF(HOUR, tc.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, tc.created_at, NOW()), ' hours ago')
      ELSE CONCAT(DATE_FORMAT(tc.created_at, '%d'), ' ', DATE_FORMAT(tc.created_at, '%M'))
  END as time
FROM tweet_comments tc
JOIN users u ON tc.user_id = u.id 
JOIN tweets t ON tc.tweet_id = t.id
WHERE tc.tweet_id = ?
ORDER BY tc.created_at DESC  ;
  `;

  let [result] = await connection.execute(sql, [tweetId]);
  console.log(result);
  res.render('../views/pages/comments', {
    comments: result.map(comment => {
      if (comment && comment.profile_img_url) {
        return comment;
      } else {
        return { ...comment, profile_img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOFx557XPIXXmnhk7joe2Pq2uQhb1iCJ688RgQZzH5ZA&s' };
      }
    })
  });
}


function extractMentionedUsernames(tweetContent) {
  const regex = /@(\w+)/g;
  const matches = tweetContent.match(regex);
  if (matches) {
    return matches.map((match) => match.substring(1));
  }
  return [];
}

async function getUsersByUsernames(usernames) {
  if (usernames.length === 0) {
    return [];
  }
  const [users] = await connection.query(
    "SELECT id, username FROM users WHERE username IN (?)",
    [usernames]
  );
  return users;
}
