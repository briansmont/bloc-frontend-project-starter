(function() {
    function AlbumCtrl(Fixtures) {
        this.albumData = Fixtures.getAlbum();
        this.songs = [];
        for (var i = 0; i < this.currentAlbum.songs.length; i++) {
            this.songs.push(this.currentAlbum.songs[i]);
        }
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();