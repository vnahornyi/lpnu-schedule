import { connection } from 'mongoose';
import type { NextApiHandler } from 'next';
import Institute from 'lib/models/institute.model';
import parser from 'lib/utils';
import connect from 'lib/connect';

const collectionName = 'institutes';

const institutesHandler: NextApiHandler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(400).json({ message: 'No valid method!' });
    }
    
    let institutes: Array<{ name: string }> = [];
    
    try {
        institutes = (await parser.getInstitutes()).map(name => ({ name }));
    } catch (err) {
        console.error(err);
    }
    
    try {
        await connect();
        
        if (institutes) {
            await connection.db.dropCollection(collectionName);
            
            for await (const institute of institutes) {
                const groups = await parser.getGroups(institute.name);
                const doc = {
                    institute: institute.name,
                    groups
                };

                const dbInstitute = new Institute(doc);
                await dbInstitute.save();
            }
        }
        
        institutes = await Institute.find({});

        return res.status(200).json(institutes);
    } catch (err) {
        return res.status(400).json(err);
    }
};

export default institutesHandler;
