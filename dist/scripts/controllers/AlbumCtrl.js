(function() {
    function AlbumCtrl() {
        this.currentAlbum = albumPicasso;
        this.songs = [];
        for (var i = 0; i < this.currentAlbum.songs.length; i++) {
            this.songs.push(this.currentAlbum.songs[i]);
        }
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();