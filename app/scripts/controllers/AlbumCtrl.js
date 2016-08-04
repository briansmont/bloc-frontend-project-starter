(function() {
    function AlbumCtrl(Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum();
        this.songs = [];
        for (var i = 0; i < this.albumData.songs.length; i++) {
            this.songs.push(this.albumData.songs[i]);
        }
        this.songPlayer = SongPlayer;
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();