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
  WHERE users.is_active = 1 AND tweets.is_posted = 1
  ORDER BY 
    CASE
      WHEN tweets.updated_at IS NOT NULL THEN tweets.updated_at
      ELSE tweets.created_at
    END DESC;
  
`;

  const [rows] = await connection.execute(sql);
  console.log(rows);
  res.render('../views/pages/home', { tweets: rows });
}

exports.post_comment = async (req, res) => {
  let { tweetId, comment } = req.body;
  let user_id = req.user[0][0].id
  console.log(user_id);
  let sql = `
        INSERT INTO tweet_comments (user_id, tweet_id, content)
        VALUES (?, ?, ?)
    `;



  let [result] = await connection.execute(sql, [user_id, tweetId, comment]);
  console.log("result", result);
  let [tweet_user_id] = await connection.execute(`SELECT user_id FROM tweets WHERE id = ?`, [tweetId])
  console.log("tweet_user_id", tweet_user_id);
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
  let sql = 'SELECT * FROM tweet_comments JOIN users ON tweet_comments.user_id = users.id WHERE tweet_comments.tweet_id = ?';
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
