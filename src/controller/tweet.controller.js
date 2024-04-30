const logger = require("../../logger/logger");
const conn = require('../../config/connection.js')
const cookieParser = require("cookie-parser");
const { use } = require("passport");


module.exports.tweetCreate = (req, res) => {
  res.render('partials/post.ejs')
}

module.exports.insertTweet = async (req, res) => {
  if (req.fileValidationError != undefined) {
    return res.status(422).json({ 'error': req.fileValidationError });
  }
  let { content } = req.body;
  let { status } = req.query;
  let userId = req.user[0][0].id;
  if (req.files == [] && content.trim() == "") {
    return res.status(422).json({ 'error': "You didn't tweet content and Image(s)!" })
  }
  else {
    try {
      if (status == 'tweet') {
        let data = [userId, content || "", '0', '1'];
        var lastInsertedId = await insertContent(data, res);
        let hashTags = extractHashtag(content);
        if (hashTags) {
          try {
            hashTags.forEach(async (hashTag) => {
              let sql = "insert into hashtag_lists(hashtag_name) values (?)";
              let [lastHashTag] = await conn.query(sql, hashTag);
              let sql1 = "insert into hashtag_tweet(hashtag_id,tweet_id,status) values(?,?,?)";
              await conn.query(sql1, [lastHashTag.insertId, lastInsertedId, 1]);
            })
          }
          catch (error) {
            return res.status(422).json({ 'error': "hash-tag error" + err });
          }
        }
        let notification = await insertNotification([userId, lastInsertedId, 'Tweet', userId]);
        let mentionedUsers = extractMentionedUsernames(content);
        var usersDetails = await getUsersByUsernames(mentionedUsers);
        if (usersDetails) {
          usersDetails.forEach(async (mention) => {
            notification = await insertNotification([mention.id, lastInsertedId, 'Mention', userId]);
          })
        }
        if (notification.error) {
          return res.status(422).json({ 'error': notification.error })
        }
        if (req.files[0] != null) {
          let { filename, mimetype } = req.files[0];
          await insertTweetImage([lastInsertedId, filename, mimetype], res)
        }
        return res.status(200).json({ 'msg': 'Inserted' })
      }
      if (status == 'draft') {
        let data = [userId, content || "", '1', '0'];
        let lastInsertedId = await insertContent(data)
        if (req.files[0] != null) {
          let { filename, mimetype } = req.files[0];
          await insertTweetImage([lastInsertedId, filename, mimetype], res)
        }
        return res.status(200).json({ 'msg': 'Drafted' })
      }
    }
    catch (err) {
      console.log(err)
      return res.status(422).json({ 'error': "somethin went wrong" + err })
    }
  }
}
const insertNotification = async (data) => {
  try {
    let sql = 'insert into notifications (user_id,tweet_id,type,related_user_id) values (?,?,?,?);';
    await conn.query(sql, data);
    return { 'msg': 'Add notification' };
  }
  catch (err) {
    return { "error": err }
  }
}

const insertContent = async (data, res) => {
  try {
    let sqlConent = 'insert into tweets(user_id,content,is_drafted,is_posted) values (?,?,?,?);';
    let [result] = await conn.query(sqlConent, data)
    return result.insertId;
  }
  catch (err) {
    console.log(err)
    return res.status(422).json({ 'error': "somethin went wrong" + err })
  }

}

const insertTweetImage = async (data, res) => {
  try {
    let imageSql = 'insert into medias (tweet_id,media_url,media_type) values (?,?,?);';
    await conn.query(imageSql, data);
  }
  catch (err) {
    console.log(err)
    return res.status(422).json({ 'error': "somethin went wrong" + err })
  }
}

exports.showDrafts = async (req, res) => {
  try {
    let sql = 'select * from medias right join tweets on tweets.id = medias.tweet_id where tweets.deleted_at IS NULL and tweets.is_drafted=1 and tweets.is_ristricted = 0  and tweets.user_id= ? order by tweets.created_at desc';
    let result = await conn.execute(sql, [req.user[0][0].id])
    return res.status(200).json({ 'draftTweet': result[0] })
  } catch (err) {
    console.log(err)
    return res.status(422).json({ 'error': "somethin went wrong" + err })
  }
}

exports.tweetUpdate = async (req, res) => {
  if (req.fileValidationError != undefined) {
    return res.status(422).json({ 'error': req.fileValidationError });
  }
  let { tweetId, content, action, isImg } = req.body;
  let userId = req.user[0][0].id;
  if (req.file == [] && content.trim() == "") {
    return res.status(422).json({ 'error': "You didn't tweet content and Image(s)!" })
  }
  else {
    try {
      if (action == 'tweet') {
        let data = [content || "", '0', '1', tweetId, userId];
        let sql = 'update tweets set content= ? ,is_drafted= ? , is_posted = ? where id = ? and user_id=?';
        await conn.query(sql, data);
        let hashTags = extractHashtag(content);
        if (hashTags) {
          try {
            hashTags.forEach(async (hashTag) => {
              let [lastHashTag] = await conn.query(sql, hashTag);
              let sql1 = "insert into hashtag_tweet(hashtag_id,tweet_id,status) values(?,?,?)";
              await conn.query(sql1, [lastHashTag.insertId, tweetId, 1]);
            })
          }
          catch (error) {
            return res.status(422).json({ 'error': "hash-tag error" + err });
          }
        }
        let notification = await insertNotification([userId, tweetId, 'Tweet', userId]);
        let mentionedUsers = extractMentionedUsernames(content);
        var usersDetails = await getUsersByUsernames(mentionedUsers);
        if (usersDetails) {
          usersDetails.forEach(async (mention) => {
            notification = await insertNotification([mention.id, tweetId, 'Mention', userId]);
          })
        }
        if (notification.error) {
          return res.status(422).json({ 'error': notification.error })
        }
        if (req.file != undefined) {
          let { filename, mimetype } = req.file;
          await updateTweetImage([filename, mimetype, tweetId], res)
        }
        if (isImg == "null") {
          await updateTweetImage([null, null, tweetId]);
        }
        return res.status(200).json({ 'msg': 'Updated' })
      }
      else if (action == 'draft') {
        let data = [content || "", '1', '0', tweetId, userId];
        let sql = 'update tweets set content= ? ,is_drafted= ? , is_posted = ? where id = ? and user_id=?';
        await conn.query(sql, data)
        if (req.file != null) {
          let { filename, mimetype } = req.file;
          await updateTweetImage([filename, mimetype, tweetId], res)
        }

        if (isImg == "null") {
          await updateTweetImage([null, null, tweetId]);
        }
        return res.status(200).json({ 'msg': 'Re-Drafted' })
      }
    }
    catch (err) {
      console.log(err)
      return res.status(422).json({ 'error': "something went wrong" + err })
    }
  }
}

const updateTweetImage = async (data, res) => {
  try {
    let sql = "select count(*) as isTweetExist from medias where tweet_id = ?"
    let [isTweetExist] = await conn.query(sql, data[2]);
    if (isTweetExist[0].isTweetExist == 0) {
      return await insertTweetImage([data[2], data[0], data[1]], res)
    }
  } catch (error) {
    return res.status(422).json({ 'error': "tweet image error" + err })
  }
  try {
    console.log(data,'----check')
    let sql = "update medias set media_url = ? , media_type = ? where tweet_id= ?";
    await conn.query(sql, data);
  }
  catch (err) {
    return res.status(422).json({ 'error': "Draft error-" + err })
  }
}
exports.displayImage = async (req, res) => {
  let { id } = req.query;
  try {
    let sql = "select * from medias where tweet_id=?";
    let result = await conn.query(sql, id);
    let contentSql = "select * from tweets where id=?";
    let [draftContent] = await conn.query(contentSql, id);
    let getUserQuery="select * from users where id=?";
    let [user]= await conn.query(getUserQuery,draftContent[0].user_id);
    console.log(user[0]);
    return res.status(200).json({ 'image': result[0][0], 'draftContent': draftContent[0].content ,user:user[0]})
  }
  catch (err) {
    return res.status(422).json({ 'error': "Image-" + err })
  }
}

exports.deleteDraft = async (req, res) => {
  let { deleteDraft } = req.body;
  if (!deleteDraft.length) {
    return res.status(422).json({ 'error': "nothing sending..." })
  }
  let sql1 = "update tweets set deleted_at= current_timestamp() where id in (" + deleteDraft + ")";
  let sql2 = "update medias set deleted_at= current_timestamp() where case when tweet_id in (" + deleteDraft + ") then  tweet_id in (" + deleteDraft + ")  end";
  try {
    await conn.query(sql2)
    await conn.query(sql1, deleteDraft)
    res.status(200).json({ msg: 'Deleted' })
  }
  catch (err) {
    return res.status(422).json({ 'error': "delete-" + err })
  }
}
function extractMentionedUsernames(tweetContent) {
  const regex = /@(\w+)/g;
  if (tweetContent != undefined) {
    const matches = tweetContent.match(regex);
    if (matches) {
      return matches.map((match) => match.substring(1));
    }
  }
  return [];
}

async function getUsersByUsernames(usernames) {
  if (usernames.length === 0) {
    return [];
  }
  const [users] = await conn.query(
    "SELECT id, username FROM users WHERE username IN (?)",
    [usernames]
  );
  return users;
}

const extractHashtag = (content) => {
  let regx = /#(\w+)/g;
  if (content != undefined) {
    let hashTags = content.match(regx);
    if (hashTags) {
      return hashTags.map((hashTag) => hashTag.substring(1))
    }
  }
  return [];
}

exports.getProfileImage = async (req, res) => {
  let userId = req.user[0][0].id;
  try {
    let sql = `select profile_img_url as profileImg from users where id=?`;
    let [profile] = await conn.query(sql, userId);
    return res.status(200).json({ 'profileImg': profile[0].profileImg })
  }
  catch (error) {
    return res.status(422).json({ 'error': 'ProfileImage-error' + error });
  }
}