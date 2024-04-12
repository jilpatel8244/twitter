const connection = require("../../config/connection");

exports.getHome = async (req, res) => {
  let sql = `

  SELECT users.username, 
  users.name, 
  COALESCE(users.profile_img_url, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOFx557XPIXXmnhk7joe2Pq2uQhb1iCJ688RgQZzH5ZA&s') as profile_img_url, 
  tweets.content, 
  CASE
  WHEN TIMESTAMPDIFF(MINUTE, tweets.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, tweets.created_at, NOW()), ' minutes ago')
  WHEN TIMESTAMPDIFF(HOUR, tweets.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, tweets.created_at, NOW()), ' hours ago')
  ELSE CONCAT(DATE_FORMAT(tweets.created_at, '%d'), ' ', DATE_FORMAT(tweets.created_at, '%M'))
END as time,
  COALESCE(medias.media_url, 'https://i.pinimg.com/originals/5d/3f/be/5d3fbe21b18240a69950e78f569e41f8.gif') as media_url
FROM users
JOIN tweets ON users.id = tweets.user_id
LEFT JOIN medias ON tweets.id = medias.tweet_id
WHERE users.is_active = 1 AND tweets.is_posted
ORDER BY tweets.created_at DESC;
`;

  const [rows, fields] = await connection.execute(sql);
  console.log(rows);
  res.render('../views/pages/home', { tweets: rows });
} 
