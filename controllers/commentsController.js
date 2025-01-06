const { v4: uuidv4 } = require('uuid');

// In-memory storage for comments (replace with database in production)
const comments = new Map();

exports.getComments = (req, res) => {
  const { id: artistId } = req.params;
  const artistComments = comments.get(artistId) || [];
  res.json(artistComments);
};

exports.addComment = (req, res) => {
  const { id: artistId } = req.params;
  const { content } = req.body;
  
  if (!content?.trim()) {
    return res.status(400).json({ message: 'Comment content is required' });
  }

  const newComment = {
    id: uuidv4(),
    artistId,
    userId: req.user?.id || 'anonymous',
    userName: req.user?.name || 'Anonymous User',
    content: content.trim(),
    createdAt: new Date().toISOString()
  };

  const artistComments = comments.get(artistId) || [];
  artistComments.push(newComment);
  comments.set(artistId, artistComments);

  res.status(201).json(newComment);
};