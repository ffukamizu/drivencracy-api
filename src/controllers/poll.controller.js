import { ObjectId } from 'mongodb';
import db from '../database/database.connection.js';
import dayjs from 'dayjs';

export async function postPoll(req, res) {
    const { title, expireAt } = req.body;

    let newExpireAt;

    if (!expireAt) {
        newExpireAt = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm');
    }

    try {
        const poll = await db.collection('poll').insertOne({
            _id: new ObjectId(),
            title: title,
            expireAt: expireAt ?? newExpireAt,
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

export async function getChoicesList(req, res) {
    const { id } = req.params;

    try {
        const choices = await db.collection('choice').find({ pollId: id }).toArray();

        res.send(choices);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getResults(req, res) {
    const { id } = req.params;

    try {
        const poll = await db.collection('poll').findOne({ _id: id });

        if (!poll) return res.status(404);

        const votes = await db.collection('vote').find({ pollId: id }).toArray();

        const choiceGroup = votes.reduce((groups, item) => {
            const { choiceId } = item;

            if (!groups[choiceId]) {
                groups[choiceId] = [];
            }

            groups[choiceId].push(item);

            return groups;
        }, {});

        let largestOccurrences = 0;
        let largestChoiceId = null;

        for (const choiceId in choiceGroup) {
            const occurrences = choiceGroup[choiceId].length;
            if (occurrences > largestOccurrences) {
                largestOccurrences = occurrences;
                largestChoiceId = choiceId;
            }
        }

        const choice = await db.collection('choice').findOne({ _id: largestChoiceId });

        poll.result = {
            result: {
                title: choice.title,
                votes: largestOccurrences,
            }
        }

        res.send(poll);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
