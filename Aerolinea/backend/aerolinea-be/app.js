import switchDB from "./services/mongo.switch.js";
import getDBModel from "./services/mongo.getmodel.js";
import tenantSchema from "./models/tenantSchema.js";
import employeeSchema from "./models/employeeSchema.js";

// Indicates which Schemas are used by whom
const CompanySchemas = new Map([['employee', employeeSchema]]);
const TenantSchemas = new Map([['tenant', tenantSchema]]);

const initTennants = async () => {
    const tenantDB = await switchDB('AppTenants', TenantSchemas);
    const tenant = await getDBModel(tenantDB, 'tenant');
    await tenant.deleteMany({});
    const tenantA = await tenant.create({
        name: 'Steve',
        email: 'Steve@example.com',
        password: 'secret',
        companyName: 'Apple',
    });
    const tenantB = await tenant.create({
        name: 'Bill',
        email: 'Bill@example.com',
        password: 'secret',
        companyName: 'Microsoft',
    });
    const tenantC = await tenant.create({
        name: 'Jeff',
        email: 'Jeff@example.com',
        password: 'secret',
        companyName: 'Amazon',
    });
};

const initEmployees = async () => {
    const customers = await getAllTenants();
    const createEmployees = customers.map(async (tenant) => {
        const companyDB = await switchDB(tenant.companyName, CompanySchemas);
        const employeeModel = await getDBModel(companyDB, 'employee');
        await employeeModel.deleteMany({});
        return employeeModel.create({
            employeeId: Math.floor(Math.random() * 10000).toString(),
            name: 'John',
            companyName: tenant.companyName,
        });
    });
    const results = await Promise.all(createEmployees);
};

const getAllTenants = async () => {
    const tenantDB = await switchDB('AppTenants', TenantSchemas);
    const tenantModel = await getDBModel(tenantDB, 'tenant');
    const tenants = await tenantModel.find({});
    return tenants;
};

// list of employees for each company database
const listAllEmployees = async () => {
    const customers = await getAllTenants();
    const mapCustomers = customers.map(async (tenant) => {
        const companyDB = await switchDB(tenant.companyName, CompanySchemas);
        const employeeModel = await getDBModel(companyDB, 'employee');
        return employeeModel.find({});
    });
    const results = await Promise.all(mapCustomers);
    return results;
};

;(async function main() {
    /*
    await initTennants();
    await initEmployees();
    const tenants = await getAllTenants();
    const employees = await listAllEmployees();
    console.log(tenants);
    console.log(employees);
    */
})();
