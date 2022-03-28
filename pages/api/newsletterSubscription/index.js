import { connectDatabase, insertDocument } from '../../../helpers/db-utils';

// import fs from 'fs';
// import path from 'path';

// export function buildEmailSubscriptionPath() {
//   return path.join(process.cwd(), 'data', 'subscribedEmails.json');
// }

// export function extractSubscribedEmails(filePath) {
//   const fileData = fs.readFileSync(filePath);
//   const data = JSON.parse(fileData);

//   return data;
// }

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const regexCheck =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      res.status(422).json({ message: 'Please provide email address' });
      return;
    } else if (!regexCheck.test(email.toString().toLowerCase())) {
      res.status(422).json({ message: 'Wrong email format' });
      return;
    }

    const registeringEmail = {
      email,
    };

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', registeringEmail);
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    // const filePath = buildEmailSubscriptionPath();
    // const data = extractSubscribedEmails(filePath);
    // data.push(registeringEmail);
    // fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Success!', email: registeringEmail });
  } else {
    res.status(200).json({ message: 'Nothing to show' });
  }
}

export default handler;
