// pages/api/feedback.ts

import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, { // Using environment variable for security
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { feedback, email } = req.body;

    if (!feedback || !email) {
      return res.status(400).json({ message: 'Feedback and email are required' });
    }

    try {
      await client.connect();
      const db = client.db('feedbackDb');
      const collection = db.collection('feedbacks');

      await collection.insertOne({
        feedback,
        email,
        timestamp: new Date().toISOString(),
      });

      return res.status(200).json({ message: 'Feedback saved successfully' });
    } catch (error) {
      console.error('Error saving feedback:', error);
      return res.status(500).json({ message: 'Error saving feedback' });
    } finally {
      await client.close();
    }
  } else if (req.method === 'GET') {
    try {
      await client.connect();
      const db = client.db('feedbackDb');
      const collection = db.collection('feedbacks');
      const feedbacks = await collection.find().toArray();

      return res.status(200).json(feedbacks);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      return res.status(500).json({ message: 'Error fetching feedbacks' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
