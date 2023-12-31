import { ObjectId } from 'mongodb';
import db from '../database/database.connection.js';
import dayjs from 'dayjs';

export async function postChoice(req, res) {
    const { title, pollId } = req.body;

    try {
        const poll = await db.collection('poll').findOne({ _id: pollId });
        if (!poll) return res.status(404).send('Poll not found');

        const expireAtTimestamp = dayjs(poll.expireAt, 'YYYY-MM-DD HH:mm').unix();
        const currentTimestamp = dayjs().unix();

        if (expireAtTimestamp < currentTimestamp) return res.status(403);

        const titleExists = await db.collection('poll').findOne({ title: title });
        if (titleExists) return res.status(409).send('Choice already exists');

        await db.collection('choice').insertOne({
            _id: new ObjectId(),
            title: title,
            pollId: pollId,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function postVote(req, res) {
    const { id } = req.params;

    try {
        const choice = await db.collection('choice').findOne({ _id: new ObjectId(id) }); //might be incorrect id (use title)
        if (!choice) return res.status(404).send('Choice not found');

        const poll = await db.collection('poll').findOne({ _id: choice.pollId });
        
        const expireAtTimestamp = dayjs(poll.expireAt, 'YYYY-MM-DD HH:mm').unix();
        const currentTimestamp = dayjs().unix();

        if (expireAtTimestamp < currentTimestamp) return res.status(403).send('Poll expired');

        const vote = await db.collection('vote').insertOne({
            pollId: poll._id,
            choiceId: id,
            date: dayjs().format('YYYY-MM-DD HH:mm'),
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}
