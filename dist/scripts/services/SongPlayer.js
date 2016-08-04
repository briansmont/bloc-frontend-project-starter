(function() {
    /**
    * @function SongPlayer
    * @desc code to set song, play song, and pause song. includes private attributes & private functions
    * @param none, private functions will though.
    * @returns {object} SongPlayer
    */
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
        /**
         * @function playSong
         * @desc Plays current song & sets playing variable to true
         * @param {Object} song
         */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;  
        };
        
        
        //SongPlayer.Play & .Pause are PUBLIC METHODS, since the user has access to them.
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
                    
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
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