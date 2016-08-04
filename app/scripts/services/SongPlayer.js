(function() {
    /**
    * @function SongPlayer
    * @desc code to set song, play song, and pause song. includes private attributes & private functions
    * @param {Fixtures} to store the album data.
    * @returns {object} SongPlayer
    */
    function SongPlayer(Fixtures) {
        //establish songplayer object within the service
        var SongPlayer = {};
        
        //store albumData in the private attribute
        var currentAlbum = Fixtures.getAlbum();
        
        /*
        * @function getSongIndex
        * @desc returns the current index of the song in the songs array
        * @returns {number} index
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        }
        
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */        
        //private attributes
        SongPlayer.currentSong = null;
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
            
            SongPlayer.currentSong = song;
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
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                    
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        /**
         * @function SongPlayer.previous
         * @desc plays the previous song in the songs array, calls setSong() & playSong()
         * @param {Object} song
         */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        
        
        return SongPlayer;
    }
    
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();