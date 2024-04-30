const { log } = require("winston");
const connection = require("../../config/connection");
const logger = require('../../logger/logger');

exports.getHomeForyou = async (req, res) => {
  let sql = `
  SELECT users.username,
  users.id as user_id, 
  users.name,
  tweets.user_id,
  tweet_comments.content as comments,
  tweets.content,
  users.profile_img_url as profile_img_url, 
  tweets.id as tweet_id,
  tweet_comments.content as comments, 
  tweets.user_id = ${req.user[0][0].id} as isAuthor,
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
  medias.media_url as media_url,
  bookmarks.status as isBookmarked,
  tweet_likes.status as isLiked,
  (SELECT COUNT(*) FROM tweet_likes WHERE tweet_likes.tweet_id = tweets.id AND tweet_likes.status = 1) as likeCount,
  (SELECT COUNT(*) FROM retweets where retweets.tweet_id=tweets.id and retweets.deleted_at IS NULL) as repostCount,
  retweets.deleted_at as notRetweeted,
  retweets.created_at as createdAt
  FROM users
  JOIN tweets ON users.id = tweets.user_id
  LEFT JOIN medias ON tweets.id = medias.tweet_id
  LEFT JOIN tweet_comments ON tweet_comments.user_id = tweets.id 
  LEFT JOIN bookmarks ON bookmarks.tweet_id = tweets.id AND bookmarks.user_id = ${req.user[0][0].id}
  LEFT JOIN tweet_likes ON tweet_likes.tweet_id = tweets.id AND tweet_likes.user_id = ${req.user[0][0].id}
  left join retweets on retweets.tweet_id=tweets.id and retweets.user_id = ${req.user[0][0].id} and retweets.deleted_at IS NULL
  WHERE users.is_active = 1 AND tweets.is_posted = 1 AND tweets.deleted_at IS NULL 
  ORDER BY 
    CASE
      WHEN tweets.updated_at IS NOT NULL THEN tweets.updated_at
      ELSE tweets.created_at
    END DESC;
`;

const retweet = `SELECT users.username,users.id as userId, users.name,users.profile_img_url as profile_img_url, 
tweets.content,tweets.id as tweet_id,
tweet_comments.content as comments, 
medias.media_url as media_url,
bookmarks.status as isBookmarked,
tweet_likes.status as isLiked,
(SELECT COUNT(*) FROM tweet_likes WHERE tweet_likes.tweet_id = tweets.id) as likeCount,
u2.name retweeter_name, u2.username as rt_username, u2.profile_img_url as rt_profile_img_url, 
(select count(*) From retweets where retweets.id=tweets.retweet_id and retweets.deleted_at IS NULL) as repostCount,
retweets.deleted_at as notRetweeted,
retweets.created_at as createdAt,
retweets.tweet_id as retweetId,
retweets.user_id as retweeterId,
retweets.retweet_message as retweetContent,
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
END as time
FROM users
LEFT JOIN tweets ON tweets.user_id = users.id 
LEFT JOIN medias ON tweets.id = medias.tweet_id
LEFT JOIN tweet_comments ON tweet_comments.user_id = tweets.id 
LEFT JOIN bookmarks ON bookmarks.tweet_id = tweets.id AND bookmarks.user_id = 1
LEFT JOIN tweet_likes ON tweet_likes.tweet_id = tweets.id AND tweet_likes.user_id = 1
LEFT JOIN retweets on retweets.id = tweets.retweet_id 
LEFT JOIN users u2 on retweets.user_id = u2.id 
WHERE users.is_active = 1 AND tweets.is_posted = 1 AND tweets.deleted_at IS NULL and retweets.deleted_at IS NULL  
and tweets.retweet_id in(select retweets.id from retweets join tweets on retweets.id=tweets.retweet_id  where retweets.id=tweets.retweet_id )
ORDER BY 
  CASE
    WHEN tweets.updated_at IS NOT NULL THEN tweets.updated_at
    ELSE tweets.created_at
  END DESC;`

  const [retweetData] = await connection.query(retweet);
  const [rows] = await connection.query(sql);
  res.status(200).json({
    success: true,
    message: {rows,retweetData},
  })
}

exports.getRetweet = async (req,res) =>{
  const retweet = `SELECT users.username, 
  users.id as user_id, 
  users.name,  
  tweets.content,
  users.profile_img_url as profile_img_url, 
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
  medias.media_url as media_url,
  bookmarks.status as isBookmarked,
  tweet_likes.status as isLiked,
  (SELECT COUNT(*) FROM tweet_likes WHERE tweet_likes.tweet_id = tweets.id) as likeCount,
  (select count(*) From retweets where retweets.tweet_id=tweets.id and retweets.deleted_at IS NULL) as repostCount,
  retweets.deleted_at as notRetweeted,
  retweets.created_at as createdAt,
  retweets.tweet_id as retweetId,
  retweets.user_id as retweeterId,
  retweets.retweet_message as retweetContent
  FROM users
  JOIN tweets ON users.id = tweets.user_id
  LEFT JOIN medias ON tweets.id = medias.tweet_id
  LEFT JOIN tweet_comments ON tweet_comments.user_id = tweets.id 
  LEFT JOIN bookmarks ON bookmarks.tweet_id = tweets.id AND bookmarks.user_id = ${req.user[0][0].id}
  LEFT JOIN tweet_likes ON tweet_likes.tweet_id = tweets.id AND tweet_likes.user_id = ${req.user[0][0].id}
  LEFT JOIN retweets on retweets.tweet_id=tweets.id 
  WHERE users.is_active = 1 AND tweets.is_posted = 1 AND tweets.deleted_at IS NULL and retweets.user_id IN 
  (SELECT retweets.user_id from retweets 
 left join users on retweets.user_id = users.id 
 left join tweets on retweets.tweet_id = tweets.id
 where retweets.user_id = users.id ) and retweets.deleted_at IS NULL 
  ORDER BY 
    CASE
      WHEN tweets.updated_at IS NOT NULL THEN tweets.updated_at
      ELSE tweets.created_at
    END DESC;`
 
    const [retweetData] = await connection.query(retweet);
    res.status(200).json({
      success: true,
      retweetData: retweetData,
    });
}

exports.getHomeFollowing = async (req, res) => {
  let followingSql = `
  SELECT users.username,
  users.id as user_id, 
  users.name, 
  tweet_comments.content as comments,
  tweets.content,
  users.profile_img_url as profile_img_url, 
  tweets.id as tweet_id,
  tweet_comments.content as comments, 
  tweets.user_id = ${req.user[0][0].id} as isAuthor,
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
  medias.media_url as media_url,
  bookmarks.status as isBookmarked,
  tweet_likes.status as isLiked,
  (SELECT COUNT(*) FROM tweet_likes WHERE tweet_likes.tweet_id = tweets.id AND tweet_likes.status = 1) as likeCount
  FROM users
  JOIN tweets ON users.id = tweets.user_id
  LEFT JOIN medias ON tweets.id = medias.tweet_id
  LEFT JOIN tweet_comments ON tweet_comments.user_id = tweets.id 
  LEFT JOIN bookmarks ON bookmarks.tweet_id = tweets.id AND bookmarks.user_id = ${req.user[0][0].id}
  LEFT JOIN tweet_likes ON tweet_likes.tweet_id = tweets.id AND tweet_likes.user_id = ${req.user[0][0].id}
  JOIN followers ON followers.following_id = users.id AND followers.follower_id = ${req.user[0][0].id}
  WHERE users.is_active = 1 AND tweets.is_posted = 1 AND tweets.deleted_at IS NULL
  ORDER BY 
    CASE
      WHEN tweets.updated_at IS NOT NULL THEN tweets.updated_at
      ELSE tweets.created_at
    END DESC;
  
  `;


  const [rows] = await connection.query(followingSql);

  res.status(200).json({
    success: true,
    message: rows
  })
}
exports.delete_post =  async (req, res) => {
  const postId = req.params.id;
  const userId = req.user[0][0].id;

  const [post] = await connection.query('SELECT user_id FROM tweets WHERE id = ?', [postId]);

    await connection.query('DELETE FROM tweet_likes WHERE tweet_id = ?', [postId]);

    await connection.query('DELETE FROM medias WHERE tweet_id = ?', [postId]);

    await connection.query('DELETE FROM bookmarks WHERE tweet_id = ?', [postId]);

    const [comments] = await connection.query('SELECT id FROM tweet_comments WHERE tweet_id = ?', [postId]);

    for(let comment of comments){
      await connection.query('DELETE FROM reply_comments WHERE comment_id = ?', [comment.id]);
    }

    await connection.query('DELETE FROM tweet_comments WHERE tweet_id = ?', [postId]);

    const [result] = await connection.query('DELETE FROM tweets WHERE id = ?', [postId]);

      res.json({
        success: true,
        message: 'Post and associated media, likes, bookmarks, and comments deleted successfully',
      });
    }
exports.get_notification = async (req, res) => {
  const [notificationCount] = await connection.query(`select count(*) as notificationCount from notifications where user_id = ? and  is_read = 0 and related_user_id != ? ;`, [req.user[0][0].id, req.user[0][0].id]);
  res.status(200).json({
    success: true,
    notificationCount
  });
}

exports.post_notification = async (req, res) => {
  let { is_read } = req.body;
  const [count] = await connection.query(`update notifications set is_read = ? where user_id = ?`, [is_read, req.user[0][0].id]);
  res.status(200).json({
    success: true,
    count: count[0],
  });
}

exports.post_comment = async (req, res) => {
  let { tweetId, comment } = req.body;

  if (comment.length > 255) {
    res.json({
      success: false,
      message: 'Comment is too long',
    });
    return;
  }

  let user_id = req.user[0][0].id
  let sql = `
        INSERT INTO tweet_comments (user_id, tweet_id, content)
        VALUES (?, ?, ?)
    `;

  let [result] = await connection.query(sql, [user_id, tweetId, comment]);
  let [comment_mention] = await connection.query(`SELECT * FROM tweet_comments WHERE tweet_id = ? order by created_at desc`, [tweetId])
  const mentionedUsernames = extractMentionedUsernames(comment_mention[0].content);
  const mentionedUsers = await getUsersByUsernames(mentionedUsernames);
  if (mentionedUsers.length >= 1) {
    let [tweet_user_id] = await connection.query(`SELECT user_id FROM tweets WHERE id = ?`, [tweetId])
    await connection.query(`INSERT INTO notifications (user_id, tweet_id, type, related_user_id)
    VALUES (?, ?, 'Mention', ?);`, [mentionedUsers[0].id, tweetId, user_id]);
  }
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
  let commentSql = `SELECT tc.id, tc.user_id, tc.tweet_id, tc.content, tc.created_at, tc.updated_at, tc.deleted_at, u.username, u.name,  u.profile_img_url , t.id as tweet_id,
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
ORDER BY tc.created_at DESC;
  `;

  let [result] = await connection.query(commentSql, [tweetId]);

  let tweetSql = `
SELECT users.username,
users.id as user_id, 
users.name, 
users.profile_img_url, 
tweets.content,
tweets.id as tweet_id,
(SELECT COUNT(*) FROM tweet_likes WHERE tweet_likes.tweet_id = tweets.id AND tweet_likes.status = 1) as likeCount,
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
medias.media_url,
bookmarks.status as isBookmarked,
tweet_likes.status as isLiked
FROM users
JOIN tweets ON users.id = tweets.user_id
LEFT JOIN medias ON tweets.id = medias.tweet_id
LEFT JOIN tweet_comments ON tweet_comments.user_id = tweets.id 
LEFT JOIN bookmarks ON bookmarks.tweet_id = tweets.id AND bookmarks.user_id = ${req.user[0][0].id}
LEFT JOIN tweet_likes ON tweet_likes.tweet_id = tweets.id AND tweet_likes.user_id = ${req.user[0][0].id}
WHERE tweets.id = ?;
;
`;
  let [tweet] = await connection.query(tweetSql, [tweetId]);

  res.render('../views/pages/comments', {
    tweetId: tweetId,
    user: req.user[0][0],
    user_id: req.user[0][0].id,
    message: '',
    tweet: tweet[0],
    comments: result.map(comment => {
      if (comment && comment.profile_img_url) {
        return comment;
      } else {
        return { ...comment, profile_img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOFx557XPIXXmnhk7joe2Pq2uQhb1iCJ688RgQZzH5ZA&s' };
      }
    })
  });
}
exports.delete_comment = async (req, res) => {
  let { commentId } = req.body;
  let userId = req.user[0][0].id;

  let sql = `SELECT user_id FROM tweet_comments WHERE id = ?`;
  let [rows] = await connection.query(sql, [commentId]);

  if (rows.length > 0 && rows[0].user_id === userId) {
   
    sql = `DELETE FROM reply_comments WHERE comment_id = ?`;
    await connection.query(sql, [commentId]);

    sql = `DELETE FROM tweet_comments WHERE id = ?`;
    let [result] = await connection.query(sql, [commentId]);

    res.json({
      success: result.affectedRows > 0,
      userId:userId,
    });
  } else {
    res.json({
      success: false,
      message: 'You are not authorized to delete this comment',
    });
  }
};

exports.edit_comment = async (req, res) => {
  let { commentId, newContent } = req.body;
  let userId = req.user[0][0].id;

  let sql = `UPDATE tweet_comments SET content = ? WHERE id = ? AND user_id = ?`;
  let [result] = await connection.query(sql, [newContent, commentId, userId]);

  res.json({
    success: result.affectedRows > 0,
  });
};

exports.post_reply = async (req, res) => {
  let content = req.body.content;

  let comment_id = req.body.comment_id;
  let user_id = req.user[0][0].id
  let sql = `
        INSERT INTO reply_comments (user_id, comment_id, content)
        VALUES (?, ?, ?)
    `;

  let [result] = await connection.query(sql, [user_id, comment_id, content]);
  res.json({
    success: result.affectedRows > 0,
  });
}
 
exports.get_reply = async (req, res) => {

  let comment_id = req.body.comment_id;
  let sql = `SELECT rc.*, u.username, u.name, u.profile_img_url, t.id as tweet_id,
  CASE
  WHEN TIMESTAMPDIFF(SECOND, rc.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, rc.created_at, NOW()+1), ' seconds ago')
  WHEN TIMESTAMPDIFF(MINUTE, rc.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, rc.created_at, NOW()), ' minutes ago')
  WHEN TIMESTAMPDIFF(HOUR, rc.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, rc.created_at, NOW()), ' hours ago')
  ELSE CONCAT(DATE_FORMAT(rc.created_at, '%d'), ' ', DATE_FORMAT(rc.created_at, '%M'))
END as time 
from reply_comments rc join users u on rc.user_id = u.id
join tweet_comments t on rc.comment_id = t.id
WHERE rc.comment_id = ?
ORDER BY rc.created_at DESC  ;
  `;

  let [replies] = await connection.query(sql, [comment_id]);
  res.json({ replies: replies });

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


exports.post_reply = async (req, res) => {
  let content = req.body.content;
  let comment_id = req.body.comment_id;

  if (content.length > 255) {
    res.json({
      success: false,
      message: 'Comment is too long',
    });
    return;
  }

  let user_id = req.user[0][0].id
  let sql = `
        INSERT INTO reply_comments (user_id, comment_id, content)
        VALUES (?, ?, ?)
    `;

  let [result] = await connection.query(sql, [user_id, comment_id, content]);
  res.json({
    success: result.affectedRows > 0,
    comment: {
      id: result.insertId,
      comment_id: comment_id,
      content: content,
    },
  });
}
exports.delete_reply = async (req, res) => {
  let { replyId } = req.body;
  let userId = req.user[0][0].id;

  let sql = `SELECT user_id FROM reply_comments WHERE id = ?`;
  let [rows] = await connection.query(sql, [replyId]);

  if (rows.length > 0 && rows[0].user_id === userId) {
    sql = `DELETE FROM reply_comments WHERE id = ?`;
    let [result] = await connection.query(sql, [replyId]);

    res.json({
      success: result.affectedRows > 0,
      userId:userId,
    });
  } else {
    res.json({
      success: false,
      message: 'You are not authorized to delete this reply',
    });
  }
};

exports.edit_reply = async (req, res) => {
  let { replyId, newContent } = req.body;
  let userId = req.user[0][0].id;

  let sql = `UPDATE reply_comments SET content = ? WHERE id = ? AND user_id = ?`;
  let [result] = await connection.query(sql, [newContent, replyId, userId]);

  res.json({
    success: result.affectedRows > 0,
  });
};
