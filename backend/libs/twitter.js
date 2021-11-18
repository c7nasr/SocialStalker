const { default: axios } = require("axios");
const Twitter = require("../models/twitter");

exports.fetch_username = async (link) => {
  try {
    const URL_PARSER = new URL(link);
    if (URL_PARSER.hostname !== "twitter.com")
      return {
        error: true,
        message: "This is not twitter link",
        e: "Bad Request",
        username: null,
      };
    let username = URL_PARSER.pathname;
    return {
      error: false,
      message: null,
      e: null,
      username: username.replace("/", ""),
    };
  } catch (error) {
      console.log(error);
    return {
      error: true,
      message: "This is not twitter link",
      e: error,
      username: null,
    };
  }
};

exports.get_username_info = async (profile, x_token, cookies) => {
  try {
    const {username} = await this.fetch_username(profile);
  const url = `https://twitter.com/i/api/graphql/hc-pka9A7gyS3xODIafnrQ/UserByScreenName?variables=%7B%22screen_name%22%3A%22${username}%22%2C%22withHighlightedLabel%22%3Atrue%7D`;
    let config = this.twitter_config(url, x_token, cookies);

    const {
      data: { data: userObject },
    } = await axios(config);

    const {user} = userObject

    return { user,username };
  } catch (error) {
      console.error(error);
      return null
  }
};


exports.TwitterStatusUpdate = async (current,status,operation) => {

    await Twitter.findOneAndUpdate({operation},{current,status})
  };
  
  


exports.FilterLinks = (data) => {
    let pre_urls = JSON.stringify(data).match(
      /https:\/\/\S+?\.(?:jpg|jpeg|gif|png)/gm
    );
  
    const urls = pre_urls.filter(function (e) {
      return e.startsWith("https://pbs.twimg.com");
    });
    const Uniqueify = new Set(urls);
    const unique_links = [...Uniqueify];
    return {direct_links:unique_links};
  };
exports.twitter_config = (url, x_token, cookies) => {
  return {
    method: "get",
    url: url,
    headers: {
      "x-csrf-token": x_token,
      authorization:
        "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
      "content-type": "application/json",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
      cookie: cookies,
    },
  };
};
