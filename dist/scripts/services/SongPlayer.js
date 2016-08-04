(function() {
    function SongPlayer() {
        //establish songplayer object within the service
        var SongPlayer = {};

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */        
        //private attributes
        var currentSong = null;
        var currentBuzzObject = null;
        
        //refactored so setSong() can be used elsewhere
        //function is private
        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentBuzzObject.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
        };
        
        
        //SongPlayer.Play & .Pause are PUBLIC METHODS, since the user has access to them.
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                currentBuzzObject.play();
                song.playing = true;
                    
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        
        return SongPlayer;
    }
    
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();