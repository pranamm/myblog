/* 
 * @Author: pranam
 * @Date:   2014-11-05 23:15:59
 * @Last Modified by:   pranam
 * @Last Modified time: 2015-12-31 00:34:33
 */

var mongodb = require('mongodb'),
    bcrypt = require('bcryptjs'),
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
            role: 'admin'
        }, function(err, user) {
            if (err) {
                deferred.reject(new Error("Profile not found"));
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    },
    updateProfile: function(userId, newProfileInfo) {
        var deferred = Q.defer();
        /*if (newUserInfo.password) {
            var passwordHash = bcrypt.hashSync(newUserInfo.password, 8);
            newUserInfo.password = passwordHash;
        }*/
        delete newProfileInfo._id;
        SETTINGS.DB.collection('users').findAndModify({
            _id: new mongodb.ObjectID(userId)
        }, [], {
            $set: newProfileInfo
        }, {
            'new': true
        }, function(err, user) {
            if (err) {
                deferred.reject(new Error("Error updating user."));
            }

            deferred.resolve(user);
        });

        return deferred.promise;
    },
    updatePassword: function(userId, profilePass) {
        var deferred = Q.defer();
        var passwordHash = bcrypt.hashSync(profilePass.oldPassword, 8);
        var newPasswordHash = bcrypt.hashSync(profilePass.newPassword, 8);
        var profilePassword = {
            password: newPasswordHash
        };

        SETTINGS.DB.collection('users').findOne({
            _id: new mongodb.ObjectID(userId)
        }, function(err, user) {
            if (err) {
                deferred.reject(new Error("User not found."));
            } else {
                if (bcrypt.compareSync(profilePass.oldPassword, user.password)) {
                    SETTINGS.DB.collection('users').findAndModify({
                        _id: new mongodb.ObjectID(userId)
                    }, [], {
                        $set: profilePassword
                    }, {
                        'new': true
                    }, function(err, user) {
                        if (err) {
                            deferred.reject(new Error("Error updating password."));
                        }

                        deferred.resolve("Password Updated Successfully");
                    });
                } else {
                    deferred.reject(new Error("Incorrect Old password provided."));
                }
            }
        })

        return deferred.promise;
    }

}
