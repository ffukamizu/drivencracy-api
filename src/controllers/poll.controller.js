import { ObjectId } from 'mongodb';
import db from '../database/database.connection.js';
import dayjs from 'dayjs';

export async function postPoll(req, res) {
    const { title, expireAt } = req.body;

    let newExpireAt

    if (!expireAt) {newExpireAt = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm')};

    try {
        const poll = await db.collection('poll').insertOne({
            _id: new ObjectId(),
            title: title,
            expireAt: expireAt ?? newExpireAt
        });

        res.status(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getPoll(req, res) {
    try {
        const poll = await db.collection('poll').find().toArray();

        res.send(poll);
    } catch (err) {
        res.status(500).send(err.message);
    }
}