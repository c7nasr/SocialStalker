const { BackgroundProcess } = require("../libs/classes/BackgroundProcess");
const { Recorder } = require("../libs/classes/Recorder");
const Twitter = require("../models/twitter");
const {
  fetch_username,
  get_username_info,
  FilterLinks,
  twitter_config,
} = require("../libs/twitter");
const { randomBytes } = require("crypto");
const { makeArchive } = require("../libs/helpers/task");
const { default: axios } = require("axios");
exports.TwitterMediaDownloader = async (req, res) => {
  // async controller code here

  const { cookies, link, x_token } = req.body;

  const { user, username } = await get_username_info(link, x_token, cookies);

  const user_id = user.rest_id;

  const JobId = randomBytes(16).toString("hex");

  const TwitterDownloaderJob = new BackgroundProcess("twitter:media");
  const newTwitterTask = await Twitter.create({ operation: JobId });

  TwitterDownloaderJob.opts.jobId = JobId;
  TwitterDownloaderJob.opts.task = newTwitterTask._id;

  const q = TwitterDownloaderJob.defineNewQueue();

  q.process(async function (job, done) {

    try {
        const url = `https://twitter.com/i/api/2/timeline/media/${user_id}.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&send_error_codes=true&simple_quoted_tweet=true&count=2000`;
        let config = twitter_config(url, x_token, cookies);
        const { data } = await axios(config);
        const { direct_links } = FilterLinks(data);
    
        const download_link = await makeArchive(
          direct_links,
          username,
          "Twitter Media Downloader",
          job.id
        );
    
        const TwitterRecorder = new Recorder("twitter:record");
    
        TwitterRecorder.TwitterMediaRecorder({
          username,
          user,
          download_link,
          req,
          taskId: job.opts.task,
        });
    
        done(null, download_link);
    } catch (error) {
        console.log(error);
        done(error);

    }
    


  });

  return res.json({ operation: JobId, username });
};

exports.TwitterInquire = async (req, res) => {

  try {
    const { id } = req.body;

    const task = await Twitter.findOne({ operation: id });
    return res.json({ operation: id, status:task.status, media:task.media, active:task.active ,current:task.current});
  } catch (error) {
      console.log(error);
    return  res.status(200).send('not ok :(')
      
  }

 

};
