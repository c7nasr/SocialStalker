const Queue = require("bull");
const { randomUUID } = require("crypto");
const {
  get_download_links_for_public_photos,
  profile_photos_direct_link,
} = require("../facebook");
const Socket = require("./Socket");
const { RedisCloud } = require("./Redis");
const { Recorder } = require("./Recorder");

class BackgroundProcess {
  constructor(ProcessName) {
    this.ProcessName = ProcessName;

    this.Redis = new RedisCloud();

    this.opts = {
      jobId: randomUUID().toString(),
    };
    this.queue = null;
  }
  defineNewQueue() {
    try {
      const queue = new Queue(
        this.ProcessName,
        this.Redis.RedisCloudInitialization()
      );
      queue.add(null, this.opts);
      this.queue = queue;

      return this.queue
    } catch (error) {
      console.error(error);
    }
  }
  delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  async queryJob(job_id) {
    const job_data = await this.queue.getJob(job_id);

    return job_data;
  }

  facebookProfilePhotosJob({ link, xs, c_user, req, job_id }) {
    const queue = new Queue(
      this.ProcessName,
      this.Redis.RedisCloudInitialization()
    );
    queue.add(null, { jobId: job_id });
    queue.process(async function (job, done) {
      Socket.sendMessage("JOB_STARTED", { xs, id: job_id });
      const { photosArray } = await get_download_links_for_public_photos(
        link,
        xs,
        c_user,
        job_id
      );
      Socket.sendMessage("PHASE_IV", {
        xs,
        count: photosArray.length,
        id: job_id,
      });

      const { direct_links, download_link } = await profile_photos_direct_link(
        photosArray,
        c_user,
        xs,
        link,
        job_id
      );

      const recorder = new Recorder("facebook:record");
      recorder.facebookProfilePhotosRecorder({
        link,
        c_user,
        xs,
        req,
        direct: direct_links,
        links: download_link,
      });
      done(null);
    });
  }
}
module.exports.BackgroundProcess = BackgroundProcess;
