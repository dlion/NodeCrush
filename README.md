# NodeCrush

An wrapper written in Node.js for the [MediaCrush](https://github.com/MediaCrush/MediaCrush) API

## Install
```sh
$ npm install nodecrush
```

## NPM
[![NPM](https://nodei.co/npm/nodecrush.png?downloads=true&stars=true)](https://nodei.co/npm/nodecrush)
[![NPM](https://nodei.co/npm-dl/nodecrush.png)](https://nodei.co/npm/nodecrush/)


# Usage and Examples

### Require
```js
var NodeCrush = require('nodecrush');
```

### File Retrieving

**Exposes** https://github.com/MediaCrush/MediaCrush/blob/master/docs/api.md#apihash

```js
NodeCrush.info("CPvuR5lRhmS0", function(err, res) {
    if(!err) {
        var compr = res.compression, //Get comprssion
            orig  = res.original, //Get Original file
            hash  = res.hash, //Get Hash
            type  = res.type; //Get type
    } else {
        throw new Error(err);
    }
});
```
You can use infoList to add unlimited hash
```js
NodeCrush.infoList(["CPvuR5lRhmS0","tVWMM_ziA3nm",...], function(err, res){ ... });
```

### File Status

**Exposes** https://github.com/MediaCrush/MediaCrush/blob/master/docs/api.md#apihashstatus

```js
NodeCrush.status("CPvuR5lRhmS0", function(err, res) {
    if(!err) {
        var status = res; //Get Status
    } else {
        throw new Error(err);
    }
});
```
You can use statusList to add unlimited hash
```js
NodeCrush.statusList(["CPvuR5lRhmS0","tVWMM_ziA3nm",...], function(err, res){ ... });
```
### Checking if a file exists

**Exposes** https://github.com/MediaCrush/MediaCrush/blob/master/docs/api.md#apihashexists

```js
NodeCrush.exists("CPvuR5lRhmS0", function(err, res) {
    if(!err) {
        var response = res; //True or False
    } else {
        throw new Error(err);
    }
});
```

### File Uploading via files

**Exposes** https://github.com/MediaCrush/MediaCrush/blob/master/docs/api.md#apiuploadfile

```js
NodeCrush.upload('/home/dlion/img.jpg', function(err, newhash) {
    if(!err) {
        var newHash = newhash; // New Hash;
    } else {
        throw new Error(err);
    }
});
```
### File Uploading via URL

**Exposes** https://github.com/MediaCrush/MediaCrush/blob/master/docs/api.md#apiuploadurl

```js
NodeCrush.uploadUrl('http://i.imgur.com/8jipPMV.jpg', function(err, newhash) {
    if(!err) {
        var newHash = newhash; // New Hash;
    } else {
        throw new Error(err);
    }
});
```
### File Deleting

**Exposes** https://github.com/MediaCrush/MediaCrush/blob/master/docs/api.md#apihashdelete

```js
NodeCrush.delete("CPvuR5lRhmS0", function(err, res) {
    if(!err) {
        var response = res; //success
    } else {
        throw new Error(err);
    }
});
```

### Get Flags

**Exposes** https://github.com/MediaCrush/MediaCrush/blob/master/docs/api.md#get-apihashflags

```js
NodeCrush.flags("CPvuR5lRhmS0", function(err, res) {
    if(!err) {
        var autoplay = res.autoplay,//autplay - true/false
            loop     = res.loop, //loop - true/false
            mute     = res.mute; //mute - true/false
    } else {
        throw new Error(err);
    }
});
```

### Set Flags

**Exposes** https://github.com/MediaCrush/MediaCrush/blob/master/docs/api.md#post-apihashflags

```js
var flags = { autoplay: true, loop: false, mute: true };
NodeCrush.setflags("CPvuR5lRhmS0", flags, function(err, res) {
    if(!err) {
        var autoplay = res.autoplay,//autplay - true
            loop     = res.loop, //loop - false
            mute     = res.mute; //mute - true
    } else {
        throw new Error(err);
    }
});
```

### Create an Album

**Exposes** https://github.com/MediaCrush/MediaCrush/blob/master/docs/api.md#albums

```js
NodeCrush.createAlbum(["CPvuR5lRhmS0","tVWMM_ziA3nm",...], function(err, hash) {
    if(!err) {
        var newHash = hash; // New album Hash;
    } else {
        throw new Error(err);
    }
});
```
## License
The MIT License (MIT)

Copyright (c) 2014 Domenico Luciani <domenicoleoneluciani@gmail.com> (http://dlion.it)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
