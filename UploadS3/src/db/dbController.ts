import { ClientConfig, Client, QueryResult } from 'pg';

function getConfig(): ClientConfig {
    return {
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_NAME,
        password: process.env.POSTGRES_PASSWORD,
        port: Number(process.env.POSTGRES_PORT),
    };
}

const getEmailTemplate = (templateId: number) => {
    const client = new Client(getConfig());
    return client.connect().then(() => {
        const q = `
            SELECT
                id,
                asunto,
                plantilla
            FROM 
                "Plantilla"
            WHERE
                id = $1
        `;

        return client.query(q, [
            templateId,
        ]).then((res: QueryResult) => {
            return res.rows;
        }).catch((error: any) => {
            return error;
        }).finally(() => {
            client.end();
        });
    }).catch((error: any) => {
        return error;
    });
};



export const DB = {
    getEmailTemplate,
};