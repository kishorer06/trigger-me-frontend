export class Employee {
    empId: string;
    empFName: string = null;
    empLName: string = null;
    phoneNumber: string = null;
    email: string = null;
    status: string = null;
    statusStartDate: any;
    statusEndDate: any;
    projectStartDate: any;
    projectEndDate: any;
    empStartDate: any;
    empEndDate: any;
    isEmpEVerifyStatus: boolean = false;


    constructor(obj?: Employee) {
        this.empId = obj && obj.empId || null;
        this.empFName = obj && obj.empFName || null;
        this.empLName = obj && obj.empLName || null;
        this.phoneNumber = obj && obj.phoneNumber || null;
        this.email = obj && obj.email || null;
        this.status = obj && obj.status || null;
        this.statusStartDate = obj && obj.statusStartDate || null;
        this.statusEndDate = obj && obj.statusEndDate || null;
        this.projectStartDate = obj && obj.projectStartDate || null;
        this.projectEndDate = obj && obj.projectEndDate || null;
        this.empStartDate = obj && obj.empStartDate || null;
        this.empEndDate = obj && obj.empEndDate || null;
        this.isEmpEVerifyStatus = obj && obj.isEmpEVerifyStatus || false;
    }
}
