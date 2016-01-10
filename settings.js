/* 
 * @Author: pranam
 * @Date:   2014-10-30 22:50:14
 * @Last Modified by:   pranam
 * @Last Modified time: 2016-01-09 22:41:23
 */

module.exports = {
    POST_MAX_SIZE: 40, //MB
    UPLOAD_MAX_FILE_SIZE: 40, //MB
    PROJECT_DIR: process.env.OPENSHIFT_REPO_DIR || __dirname,
    DB: null,
    POST_PAGESIZE: 5,
    RESPONSE: {
        data: null,
        message: "",
        errCode: 0
    }
};
