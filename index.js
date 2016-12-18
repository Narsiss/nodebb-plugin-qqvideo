/**
 * Created by Narsiss on 16-12-16.
 * Author Narsiss (vvwyot@126.com)
 */


(function(module) {
    "use strict";
    // responsive format found at http://avexdesigns.com/responsive-youtube-embed/
    var QQVideo = {},
        embed = '<div class="video-container"><iframe class="qqvideo-plugin"  src="https://v.qq.com/iframe/player.html?vid=$1&tiny=0&auto=0" allowfullscreen></iframe></div>';
    var regularUrl = /<a href="(?:https?:\/\/)?imgcache.qq.com\/tencentvideo_v1\/playerv3\/TPout.swf\b\?\b.*\bvid=([a-z0-9A-Z]+)(.*)[^<]*?>.+<\/a>/g;
    var embedUrl = /<a href="(?:https?:\/\/)?v.qq.com\/iframe\/player\.html\b\?\b.*\bvid=([a-z0-9A-Z]+)(.*)[^<]*?>.+<\/a>/g;

    QQVideo.parse = function(data, callback) {
        if (!data || !data.postData || !data.postData.content) {
            return callback(null, data);
        }
        if (data.postData.content.match(embedUrl)) {
            data.postData.content = data.postData.content.replace(embedUrl, embed);
        }
        if (data.postData.content.match(regularUrl)) {
            data.postData.content = data.postData.content.replace(regularUrl, embed);
        }

        callback(null, data);
    };

    module.exports = QQVideo;
}(module));
