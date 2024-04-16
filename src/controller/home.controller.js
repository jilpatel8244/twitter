const { log } = require("winston");
const connection = require("../../config/connection");

exports.getHome = async (req, res) => {
  let sql = `

  SELECT users.username, 
  users.name, 
  COALESCE(users.profile_img_url, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOFx557XPIXXmnhk7joe2Pq2uQhb1iCJ688RgQZzH5ZA&s') as profile_img_url, 
  tweets.content,
  tweets.id as tweet_id, 
  CASE
  WHEN TIMESTAMPDIFF(SECOND, tweets.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, tweets.created_at, NOW()), ' seconds ago')
  WHEN TIMESTAMPDIFF(MINUTE, tweets.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, tweets.created_at, NOW()), ' minutes ago')
  WHEN TIMESTAMPDIFF(MINUTE, tweets.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, tweets.created_at, NOW()), ' minutes ago')
  WHEN TIMESTAMPDIFF(HOUR, tweets.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, tweets.created_at, NOW()), ' hours ago')
  ELSE CONCAT(DATE_FORMAT(tweets.created_at, '%d'), ' ', DATE_FORMAT(tweets.created_at, '%M'))
END as time,
  COALESCE(medias.media_url, 'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg') as media_url
FROM users
JOIN tweets ON users.id = tweets.user_id
LEFT JOIN medias ON tweets.id = medias.tweet_id = 1
WHERE users.is_active = 1 AND tweets.is_posted = 1
ORDER BY tweets.created_at DESC;
`;

  const [rows] = await connection.execute(sql);

  res.render('../views/pages/home', { tweets: rows });
} 


exports.likeUnlikeHandler = async (req, res) => {
  try {
      let {tweetId} = req.body.tweet_id;
      console.log(req.body);
      let userId = req.user[0][0].id;

      let [result] = await connection.query('select * from tweet_likes where tweet_id = ? and user_id = ?', [tweetId, userId]);

      if (!result.length) {
          // make new entry
          await connection.query('insert into tweet_likes (tweet_id, user_id, status) values (?, ?, ?)', [tweetId, userId, 1]);

          return  res.status(200).json({
              success: true,
              likeStatus: 1
          })
      } else {
          // update status
          await connection.query('update tweet_likes set status = ? where tweet_id = ? and user_id = ?', [(parseInt(result[0].status)) ? 0 : 1, tweetId, userId]);

          return res.status(200).json({
              success: true,
              likeStatus: (parseInt(result[0].status)) ? 0 : 1
          })
      }
  } catch (error) {
      logger.error(error);
      return res.status(500).json({
          success: false,
          message: error.message
      })
  }
}


exports.bookmarkUnbookmarkHandler = async (req, res) => {
  try {
      let {tweetId} = req.body;
      let userId = req.user[0][0].id;
      
      let [result] = await connection.query('select * from bookmarks where tweet_id = ? and user_id = ?', [tweetId, userId]);

      if (!result.length) {
          // make new entry
          await connection.query('insert into bookmarks (tweet_id, user_id, status) values (?, ?, ?)', [tweetId, userId, 1]);

          return  res.status(200).json({
              success: true,
              bookmarkStatus: 1
          })
      } else {
          // update status
          await connection.query('update bookmarks set status = ? where tweet_id = ? and user_id = ?', [(parseInt(result[0].status)) ? 0 : 1, tweetId, userId]);

          return res.status(200).json({
              success: true,
              bookmarkStatus: (parseInt(result[0].status)) ? 0 : 1
          })
      }
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          success: false,
          message: error.message
      })
  }
}