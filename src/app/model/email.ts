export class Email {
    subject: string;
    toEmailAddr: string = null;
    message: string = null;
    priority: any;

    constructor(obj?: Email) {
        this.subject = obj && obj.subject || null;
        this.toEmailAddr = obj && obj.toEmailAddr || null;
        this.message = obj && obj.message || null;
        this.priority = obj && obj.priority || false;
    }
}
