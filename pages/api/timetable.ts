import type { NextApiHandler } from 'next';
import Timetable, { ITimetable } from 'lib/models/timetable.model';
import parser from 'lib/utils';
import connect from 'lib/connect';

const timetableHandler: NextApiHandler = async (req, res) => {
    const group = req.query.group as string;
    let timetable: ITimetable | null = {
        group,
        lessons: []
    };

    if (req.method !== 'GET') {
        return res.status(400).json({ message: 'No valid method!' });
    }

    if (!group) {
        return res.status(404).json({ message: 'Timetable is not defined!' });
    }

    try {
        timetable.lessons = await parser.getTimetable(group);

    } catch (err) {
        console.error(err);
    }
    
    try {
        await connect();
        
        if (timetable.lessons) {
            let dbTimetable;
            const isInDb = !!(await Timetable.findOne({ group }));
            if (isInDb) {
                dbTimetable = await Timetable.findOneAndReplace({ group }, timetable);
            } else {
                dbTimetable = new Timetable(timetable);
            }
            
            dbTimetable.save();
        }
        
        timetable = await Timetable.findOne({ group });

        return res.status(200).json(timetable);
    } catch (err) {
        return res.status(400).json(err);
    }
};

export default timetableHandler;
