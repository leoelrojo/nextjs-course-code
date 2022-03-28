import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-utils';

// import fs from 'fs';
// import path from 'path';

// export function buildCommentsPath() {
//   return path.join(process.cwd(), 'data', 'comments.json');
// }

// export function extractComments(filePath) {
//   const fileData = fs.readFileSync(filePath);
//   const data = JSON.parse(fileData);

//   return data;
// }

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, comment } = req.body;

    const regexCheck =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      !name ||
      name.trim() === '' ||
      !regexCheck.test(email.toString().toLowerCase()) ||
      !comment ||
      comment.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      client.close();
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      comment,
    };

    let result;

    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Success!', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' });
      client.close();
    }

    // const filePath = buildCommentsPath();
    // const data = extractComments(filePath);
    // data.push(newComment);
    // fs.writeFileSync(filePath, JSON.stringify(data));
  }

  if (req.method === 'GET') {
    // const filePath = buildCommentsPath();
    // const commentsData = extractComments(filePath);

    let selectedComments;

    try {
      selectedComments = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: selectedComments });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' });
      return;
    }
  }

  client.close();
}

export default handler;
