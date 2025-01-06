const mockArtists = require('../data/mockData');

exports.getMockArtists = () => mockArtists;

exports.getMockArtist = (id) => {
  return mockArtists.find(artist => artist.id === id) || null;
};

exports.updateArtistRating = (id, rating) => {
  const artist = mockArtists.find(artist => artist.id === id);
  if (artist) {
    artist.rating = rating;
  }
  return artist;
};