import { models, model, Model, Schema } from 'mongoose';

export interface IInstitute {
    institute: string;
    groups: string[];
}

type InstituteModelType = Model<IInstitute>;

const instituteSchema = new Schema<IInstitute, InstituteModelType>({
    institute: String,
    groups: [String]
});

const Institute = models.Institute || model<IInstitute, InstituteModelType>('Institute', instituteSchema);

export default Institute;
