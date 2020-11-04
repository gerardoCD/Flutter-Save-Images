// This file describes
// the apis implemented in this service
// so they can be automatically configured by
// the api gateway
import packageJson from '../package.json';

export function descriptor(req: any, res: any) {
    res.json({
        service: packageJson.name,
        version: packageJson.version,
        apis: [
            {
                name: "Email service",
                endpoint: '/sendEmail',
                method: 'POST',
                isPublic: true,
            },
        ],
    });
}
