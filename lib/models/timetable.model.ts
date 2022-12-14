import { models, model, Model, Schema } from 'mongoose';
import { ILesson } from 'types';

export interface ITimetable {
    group: string;
    lessons: ILesson[];
}

type TimetableModelType = Model<ITimetable>;

const timetableSchema = new Schema<ITimetable, TimetableModelType>({
    group: String,
    lessons: [{
        type: Map,
        of: String
    }]
});

const Timetable = models.Timetable || model<ITimetable, TimetableModelType>('Timetable', timetableSchema);

export default Timetable;
