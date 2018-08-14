'use strict';

const Service = require('egg').Service;

class JobTitlesService extends Service {
  async getJobTitle(id) {
    const jobTitle = await this.app.model.JobTitles.findById(id);
    return jobTitle;
  }
}

module.exports = JobTitlesService;
