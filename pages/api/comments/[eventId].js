import { buildCommentsPath, extractComments } from './index';

function handler(req, res) {
  if (req.method === 'GET') {
    const eventId = req.query.eventId;
    const filePath = buildCommentsPath();
    const commentsData = extractComments(filePath);
    const selectedComments = commentsData.find(
      (commentData) => commentData.eventId === eventId
    );

    res.status(201).json({ comments: selectedComments });
  } else {
    res.status(200).json({ message: 'Failed!' });
  }
}

export default handler;
