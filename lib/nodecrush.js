#! /usr/bin/env node

var request     = require('request'),
    fs          = require('fs');

module.exports = ( function ( request, fs ) {
  var BASE      = "https://mediacru.sh/api/",
      VERSION   = 1;

  /**
   * Describe request options
   */
  var options = {
    url: '',
    json: true,
    headers: {
      'X-CORS-Status': 1,
      'User-Agent': 'NodeCrushAPI/'+VERSION
    }
  };

  /**
   * Describe error messages
   */
  var error = {
    NF:         "File Not Found",
    HASHWRONG:  "Hash Wrong",
    PA:         "Process Aborted",
    NA:         "Not Allowed",
    AU:         "Already Uploaded",
    RL:         "Rate Limit Excedeed",
    EN:         "File Extension Not Acceptable",
    PN:         "Parameters Not Recognised",
    AL:         "Album too large",
    WR:         "One Of The Items Is Not A File"
  };

  return {
    /**
     * Check if one hash exists
     * @param   {String}    hash  Hash of file
     * @param   {function}  cb    function(err, body)
     */
    exists: function ( hash, cb ) {
      options.url     = BASE+hash+'/exists';

      request.get( options, function ( err, resp, body ) {
        if ( !err && resp.statusCode === 200 ) {
          cb ( null, body.exists );
        } else if ( resp.statusCode === 404 ) {
          cb ( error.NF, null );
        }
      });
    },
    /**
     * Get info about one hash
     * @param {String}    hash  Hash of file
     * @param {function}  cb    function(err, body)
     */
    info: function ( hash, cb ) {
      options.url     = BASE+hash;

      request.get( options, function ( err, resp, body ) {
        if ( !err && resp.statusCode === 200 && !body.error) {
          cb ( null, body );
        } else if ( resp.statusCode === 404 || body.error ) {
          cb ( error.NF, null);
        }
      });
    },
    /**
     * Get info about many hash
     * @param {Array}     hashs   Array of hash
     * @param {function}  cb      function(err, body)
     */
    infoList: function ( hashs, cb ) {
      var i;
      options.url     = BASE+'info?list=';

      if ( hashs.length > 0 ) {
        //Concat hash using comma
        //These istructions more fast than join (http://jsperf.com/joinversusplus)
        for ( i = 0; i < hashs.length; i++ ) {
          options.url += hashs[i];
          if ( i < (hashs.length-1) ) {
            options.url += ',';
          }
        }
        request.get( options, function ( err, resp, body ) {
          if ( !err && resp.statusCode === 200 && !body.error ) {
            cb ( null, body );
          } else if ( resp.statusCode === 404 || body.error === 404 ) {
            cb ( error.NF, null );
          }
        });
      } else {
        cb ( error.HASHWRONG, null );
      }
    },

    /**
     * Get a status of file
     * @param {String}    hash    Hash of file
     * @param {function}  cb      function(err, body)
     */
    status: function ( hash, cb ) {
      options.url     = BASE + hash + '/status';

      request.get( options, function ( err, resp, body ) {
        if ( !err && resp.statusCode === 200 && !body.error ) {
          cb ( null, body.status );
        } else if ( resp.statusCode === 404 || body.error === 404 ) {
          cb ( error.NF, null);
        } else if ( resp.statusCode === 415 ) {
          cb ( error.PA, null );
        }
      });
    },

    /**
     * Get status about many hash
     * @param {Array}     hashs   Array of hash
     * @param {function}  cb      function(err, body)
     */
    statusList: function ( hashs , cb ) {
      var i;
      options.url     = BASE+'status?list=';

      if ( hashs.length > 0 ) {
        //Concat hash using comma
        //These istructions more fast than join (http://jsperf.com/joinversusplus)
        for ( i = 0; i < hashs.length; i++ ) {
          options.url += hashs[i];
          if ( i < (hashs.length-1) ) {
            options.url += ',';
          }
        }
        request.get( options, function ( err, resp, body ) {
          if ( !err && resp.statusCode === 200 && !body.error ) {
            cb ( null, body );
          } else if ( resp.statusCode === 404 || body.error === 404 ) {
            cb ( error.NF, null );
          }
        });
      } else {
        cb ( error.HASHWRONG, null );
      }
    },

    /**
     * Get flags of file
     * @param {String}    hash    Hash of file
     * @param {function}  cb      function(err, body)
     */
    flags: function ( hash, cb ) {
      options.url     = BASE + hash + '/flags';

      request.get( options, function ( err, resp, body ) {
        if ( !err && resp.statusCode === 200 && !body.error ) {
          cb ( null, body.flags);
        } else if ( resp.statusCode === 404 || body.error === 404 ) {
          cb ( error.NF, null );
        }
      });
    },

    /**
     * Delete a file
     * @param {String}    hash  hash of file
     * @param {function}  cb    function(err, body)
     */
    delete: function ( hash, cb ) {
      options.url     = BASE + hash;

      request.del( options, function ( err, resp, body ) {
        if ( !err && resp.statusCode === 200 && !body.error ) {
          cb ( null, body.status );
        } else if ( resp.statusCode === 404 || body.error === 404 ) {
          cb ( error.NF, null );
        } else if ( resp.statusCode === 401 || body.error === 401 ) {
          cb ( error.NA, null );
        } else {
          cb ( body, null );
        }
      });
    },

    /**
     * Upload a file
     * @param {String}    file    Path of file
     * @param {function}  cb      function (err, body)
     */
    upload: function ( file, cb ) {
      options.url       = BASE + 'upload/file';

      if(fs.existsSync(file)) {
        var req = request.post( options, function ( err, resp, body ) {
          if( !err && resp.statusCode === 200 && !body.error ) {
            cb ( null, body.hash );
          } else if ( resp.statusCode === 409 || body.error === 409 ) {
            cb ( error.AU, body.hash );
          } else if ( resp.statusCode === 220 || body.error === 420 ) {
            cb ( error.RL, body.hash );
          } else if ( resp.statusCode === 415 || body.error === 415 ) {
            cb ( error.EN, null );
          }
        });
        //Append file stream
        req.form().append("file", fs.createReadStream(file));
      } else {
        cb ( error.NF, null );
      }
    },

    /**
     * Upload a file from an url
     * @param {String}    url   remote file
     * @param {function}  cb    function(err, body)
     */
    uploadUrl: function ( url, cb ) {
      options.url     = BASE + 'upload/url';

      request.post( options, function ( err, resp, body ) {
        if ( !err && resp.statusCode === 200 && !body.error ) {
          cb ( null, body.hash );
        } else if ( resp.statusCode === 409 || body.error === 409 ) {
          cb ( error.AU, body.hash );
        } else if ( resp.statusCode === 220 || body.error === 420 ) {
          cb ( error.RL, body.hash );
        } else if ( resp.statusCode === 415 || body.error === 415 ) {
          cb ( error.EN, null );
        }
      }).form({url: url});
    },

    /**
     * Set flags about one hash
     * @param {String}    hash    hash of file
     * @param {Object}    flags   flags object { autoplay, loop, mute }
     * @param {function}  cb      function(err, body)
     */
    setFlags: function ( hash, flags, cb ) {
      options.url     = BASE + hash + '/flags';

      request.post( options, function ( err, resp, body ) {
        if ( !err && resp.statusCode === 200 && !body.error ) {
          cb ( null, body.flags );
        } else if ( resp.statusCode === 401 || body.error === 401 ) {
          cb ( error.NA, null );
        } else if ( resp.statusCode === 404 || body.error === 404 ) {
          cb ( error.NF, null );
        } else if ( resp.statusCode === 415 || body.error === 415 ) {
          cb ( error.PN, null );
        }
      }).form(flags);
    },

    /**
     * Create an album
     * @param {Array}     hashs   array of hash
     * @param {function}  cb      function(err, body)
     */
    createAlbum: function ( hashs, cb ) {
      var i,
          list        = '';
      options.url     = BASE+'album/create';

      if ( hashs.length > 0 ) {
        //Concat hash using comma
        //These istructions more fast than join (http://jsperf.com/joinversusplus)
        for ( i = 0; i < hashs.length; i++ ) {
          list += hashs[i];
          if ( i < (hashs.length-1) ) {
            list += ',';
          }
        }
        request.post( options, function ( err, resp, body ) {
          if ( !err && resp.statusCode === 200 && !body.error ) {
            cb ( null, body.hash );
          } else if ( resp.statusCode === 404 || body.error === 404 ) {
            cb ( error.NF, null );
          } else if ( resp.statusCode === 413 || body.error === 413 ) {
            cb ( error.AL, null );
          } else if ( resp.statusCode === 415 || body.error === 415 ) {
            cb ( error.WR, null );
          }
        }).form({"list": list});
      } else {
        cb ( error.HASHWRONG, null );
      }
    }
  };
} ( request, fs ) );
