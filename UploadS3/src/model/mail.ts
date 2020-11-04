export interface EmailParams {
    templateId: number;
    mailTo: string;
    attachment: boolean;
    templateParams?: object;
}

export interface ENV {
    smtp_host: string | undefined;
    smtp_port: string | undefined;
    mail_from: string | undefined;
    user: string | undefined;
    pass: string | undefined;
}

export interface Attachment {
    name: string;
    content: string;
    cid: string;
}

export interface TemplateData {
    templateId: number;
    templateEndpoint: string;
    subject: string;
}
