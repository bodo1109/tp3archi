const { v4: uuidv4 } = require('uuid');

// In-memory storage for artists (replace with database in production)
const artists = new Map();

exports.getArtists = (req, res) => {
  const artistList = Array.from(artists.values());
  res.json(artistList);
};

exports.getArtist = (req, res) => {
  const { id } = req.params;
  const artist = artists.get(id);
  
  if (!artist) {
    return res.status(404).json({ message: 'Artist not found' });
  }
  
  res.json(artist);
};

exports.createArtist = (req, res) => {
  const {
    name,
    stageName,
    imageUrl,
    albumCount,
    label,
    publisher,
    careerStart,
    socialMedia
  } = req.body;

  // Validation
  if (!name || !stageName || !imageUrl) {
    return res.status(400).json({ message: 'Name, stage name, and image URL are required' });
  }

  const newArtist = {
    id: uuidv4(),
    name,
    stageName,
    imageUrl,
    albumCount: albumCount || 0,
    label: label || '',
    publisher: publisher || '',
    careerStart: careerStart || new Date().toISOString(),
    socialMedia: socialMedia || []
  };

  artists.set(newArtist.id, newArtist);
  res.status(201).json(newArtist);
};

exports.updateArtist = (req, res) => {
  const { id } = req.params;
  const artist = artists.get(id);

  if (!artist) {
    return res.status(404).json({ message: 'Artist not found' });
  }

  const updatedArtist = {
    ...artist,
    ...req.body,
    id // Ensure ID cannot be changed
  };

  artists.set(id, updatedArtist);
  res.json(updatedArtist);
};

exports.deleteArtist = (req, res) => {
  const { id } = req.params;
  
  if (!artists.has(id)) {
    return res.status(404).json({ message: 'Artist not found' });
  }

  artists.delete(id);
  res.status(204).send();
};