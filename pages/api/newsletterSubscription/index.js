import fs from 'fs';
import path from 'path';

export function buildEmailSubscriptionPath() {
  return path.join(process.cwd(), 'data', 'subscribedEmails.json');
}

export function extractSubscribedEmails(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
}

function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    console.log(String(email));
    const regexCheck =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!(regexCheck.test(email.toString().toLowerCase()))) {
      res.status(200).json({ message: 'Wrong email format' })
    } else {
      const registeringEmail = {
        email: email,
      };

      const filePath = buildEmailSubscriptionPath();
      const data = extractSubscribedEmails(filePath);
      data.push(registeringEmail);
      fs.writeFileSync(filePath, JSON.stringify(data));
      res.status(201).json({ message: 'Success!', email: registeringEmail });
    }
  } else {
    res.status(200).json({ message: 'Nothing to show' });
  }
}

export default handler;
