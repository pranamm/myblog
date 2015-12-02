/* 
 * @Author: pranam
 * @Date:   2014-11-05 23:15:59
 * @Last Modified by:   pranam
 * @Last Modified time: 2014-11-13 00:37:49
 */

var bcrypt = require('bcryptjs'),
    Q = require('q'),
    SETTINGS = require('../../settings');

module.exports = {
    registerUser: function(user) {
        var deferred = Q.defer();
        var passwordHash = bcrypt.hashSync(user.password, 8);
        user.password = passwordHash;

        SETTINGS.DB.collection('users').insert(user, function(err, users) {
            if (err) {
                if (err.code == 11000) {
                    deferred.reject(new Error("User already exists"));
                } else {
                    deferred.reject(new Error("Error registering user"));
                }

            } else {
                deferred.resolve(users[0]);
            }
        });

        return deferred.promise;
    },
    getProfile: function() {
        var deferred = Q.defer();

        SETTINGS.DB.collection('users').findOne({
            isAdmin: true
        }, function(err, user) {
            if (err) {
                deferred.reject(new Error("Profile not found"));
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }
}
