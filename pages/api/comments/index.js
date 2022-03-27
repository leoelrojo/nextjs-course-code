import fs from 'fs';
import path from 'path';

export function buildCommentsPath() {
  return path.join(process.cwd(), 'data', 'comments.json');
}

export function extractComments(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
}

function handler(req, res) {
  if (req.method === 'POST') {
    const eventId = req.body.eventId;
    const email = req.body.email;
    const name = req.body.name;
    const comment = req.body.comment;

    const newComment = {
      id: new Date().toISOString(),
      eventId: eventId,
      email: email,
      name: name,
      comment: comment,
    };

    const filePath = buildCommentsPath();
    const data = extractComments(filePath);
    data.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Success!', comment: newComment });
  } else {
    res.status(200).json({ message: 'Failed!' });
  }
}

export default handler;
