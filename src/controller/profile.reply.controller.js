const { log } = require('winston');
const connection = require('../../config/connection');

exports.getReplies = async (req, res) => {
  try {

    // let id = req.user[0][0].id;

    // const replyerDataQuery = `SELECT  u.name as name,u.profile_img_url as profile_img_url, u.username as username, tc.content as content, tc.created_at as time, tc.tweet_id as tweet_id, m.media_url as media_url ,tl.status as isLiked, b.status as isBookmarked FROM users as u LEFT JOIN tweet_comments as tc ON u.id = tc.user_id LEFT JOIN tweets as t ON t.user_id = u.id LEFT JOIN medias as m ON tc.tweet_id = m.tweet_id LEFT JOIN tweet_likes as tl ON tl.tweet_id = t.id LEFT JOIN bookmarks as b ON b.tweet_id = t.id WHERE u.id=? `;
    // const [replyerData] = await connection.query(replyerDataQuery, [id]);
    // let tweetId = [];
    // for (let i = 0; i < replyerData.length; i++) {
    //   tweetId.push(replyerData[i].tweet_id); 
    // }
    

    // const repliesPostDataQuery = `SELECT u.name as name, u.username as username, u.profile_img_url as profile_img_url, t.created_at as time, t.content as content,  m.media_url as media_url, t.id as tweet_id, b.status as isBookmarked, tl.status as isLiked FROM users as u LEFT JOIN tweets as t ON u.id = t.user_id LEFT JOIN medias as m ON t.id = m.tweet_id LEFT JOIN bookmarks as b ON b.tweet_id = t.id LEFT JOIN tweet_likes as tl ON tl.tweet_id = t.id WHERE t.id =?`;
    // let repliesPostData = [];
    // for (let i = 0; i < tweetId.length; i++) {
    //   let [[data]] = await connection.query(repliesPostDataQuery, [tweetId[i]]);
    //   repliesPostData.push(data);
    // }

    // let repliesData = [repliesPostData, ...replyerData];    
    
    // return res.status(200).json({
    //   success: true,
    //   message: repliesData
    // });

    let id = req.user[0][0].id;

    const replyerDataQuery = `SELECT  u.name as replyerName,u.profile_img_url as replyerProfileImage, u.username as replyerUsername,tc.content as replyerMessage, tc.created_at as retweetDate, tc.tweet_id as tweetId, m.media_url as replyerMedia FROM users as u INNER JOIN tweet_comments as tc ON u.id = tc.user_id LEFT JOIN medias as m ON tc.tweet_id = m.tweet_id WHERE u.id=?`;
    const [replyerData] = await connection.query(replyerDataQuery, [id]);
    let tweetId = [];
    for (let i = 0; i < replyerData.length; i++) {
      tweetId.push(replyerData[i].tweetId);
    }

    let likeCountReplyerDataQuery = `SELECT tweet_id, COALESCE(sum(status), 0) as likeCount FROM tweet_likes group by tweet_id`;

    let [likeCountReplyerData] = await connection.query(likeCountReplyerDataQuery, [id]);
    

    replyerData.forEach((resultElement, index) => {
      likeCountReplyerData.forEach((likeCountElement, index) => {
        if (resultElement.tweetId == likeCountElement.tweet_id) {
          resultElement['likeCount'] = likeCountElement.likeCount;
        }
      })
    });
    
    // console.log("\n this is replyer data: \n",replyerData);

    const repliesPostDataQuery = `SELECT u.name, u.username, u.profile_img_url as profileImage, t.created_at, t.content,  m.media_url as media, t.id as id, b.status as isBookmarked, tl.status as isLiked FROM users as u LEFT JOIN tweets as t ON u.id = t.user_id LEFT JOIN medias as m ON t.id = m.tweet_id LEFT JOIN bookmarks as b ON b.user_id = u.id and b.user_id = ? LEFT JOIN tweet_likes as tl ON tl.user_id = u.id and tl.user_id = ? WHERE t.id = ?`;
    let repliesPostData = [];
    for (let i = 0; i < tweetId.length; i++) {
      let [[data]] = await connection.query(repliesPostDataQuery, [id, id, tweetId[i]]);
      repliesPostData.push(data);
    }

    repliesPostData.forEach((resultElement, index) => {
      likeCountReplyerData.forEach((likeCountElement, index) => {
        if (resultElement.id == likeCountElement.tweet_id) {
          resultElement['likeCount'] = likeCountElement.likeCount;
        }
      })
    });

    // console.log("\n Hello This is the replies Post Data :",repliesPostData);   

    let repliesData = [repliesPostData, replyerData];
    console.log("\n\n\n\n\n\n\n\n replies data \n\n\n\n",repliesData);
    return res.json({ repliesData });

  } catch (error) {
    console.log(error);
  }
}