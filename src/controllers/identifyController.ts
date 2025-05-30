import { RequestHandler } from 'express';
import { identifyContact } from '../services/identifyService';

export const identifyHandler: RequestHandler = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const result = await identifyContact(email, phoneNumber);
    res.status(200).json({ contact: result });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
