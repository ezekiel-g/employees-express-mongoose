import dotenv from 'dotenv';
import { connectToDatabase, disconnectFromDatabase } from './db.js';
import Department from '../models/Department.js';
import Employee from '../models/Employee.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectToDatabase();

    const departmentData = [
      {
        name: 'Sales',
        code: 'SLS01',
        location: 'New York',
        isActive: true,
      },
      {
        name: 'Marketing',
        code: 'MKT01',
        location: 'New York',
        isActive: true,
      },
      {
        name: 'Engineering',
        code: 'ENG01',
        location: 'London',
        isActive: true,
      },
      {
        name: 'HR',
        code: 'HR01',
        location: 'San Francisco',
        isActive: true,
      },
    ];

    const departments = [];

    for (let i = 0; i < departmentData.length; i++) {
      const existingDepartment = await Department.findOne({
        code: departmentData[i].code,
      });

      if (!existingDepartment) {
        const newDepartment = await Department.create(departmentData[i]);

        departments.push(newDepartment);
        console.log(`Department with code '${newDepartment.code}' added`);
      } else {
        console.log(
          `Department with code '${existingDepartment.code}' already exists`,
        );
      }
    }

    if (departments.length !== departmentData.length) {
      console.error(
        'Exiting... (number of departments ' +
        'created differs from expected number)',
      );
      return;
    }

    const employeeData = [
      {
        firstName: 'John',
        lastName: 'Doe',
        title: 'Sales Manager',
        departmentId: departments[0]._id,
        email: 'john.doe@example.com',
        countryCode: '1',
        phoneNumber: '5551234567',
        isActive: true,
        hireDate: '2021-03-15',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        title: 'Sales Representative',
        departmentId: departments[0]._id,
        email: 'jane.smith@example.com',
        countryCode: '1',
        phoneNumber: '5552345678',
        isActive: true,
        hireDate: '2020-07-25',
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        title: 'Sales Associate',
        departmentId: departments[0]._id,
        email: 'alice.johnson@example.com',
        countryCode: '1',
        phoneNumber: '5553456789',
        isActive: true,
        hireDate: '2019-11-02',
      },
      {
        firstName: 'Bob',
        lastName: 'Brown',
        title: 'Sales Representative',
        departmentId: departments[0]._id,
        email: 'bob.brown@example.com',
        countryCode: '1',
        phoneNumber: '5554567890',
        isActive: true,
        hireDate: '2022-01-12',
      },
      {
        firstName: 'Charlie',
        lastName: 'Davis',
        title: 'Sales Associate',
        departmentId: departments[0]._id,
        email: 'charlie.davis@example.com',
        countryCode: '1',
        phoneNumber: '5555678901',
        isActive: true,
        hireDate: '2021-06-10',
      },
      {
        firstName: 'David',
        lastName: 'Schmidt',
        title: 'Sales Coordinator',
        departmentId: departments[0]._id,
        email: 'david.schmidt@example.com',
        countryCode: '49',
        phoneNumber: '5556789012',
        isActive: true,
        hireDate: '2020-02-28',
      },
      {
        firstName: 'William',
        lastName: 'Scott',
        title: 'Marketing Manager',
        departmentId: departments[1]._id,
        email: 'william.scott@example.com',
        countryCode: '1',
        phoneNumber: '5551236547',
        isActive: true,
        hireDate: '2021-05-05',
      },
      {
        firstName: 'Olivia',
        lastName: 'Koch',
        title: 'Marketing Specialist',
        departmentId: departments[1]._id,
        email: 'olivia.koch@example.com',
        countryCode: '49',
        phoneNumber: '5552347658',
        isActive: true,
        hireDate: '2020-08-20',
      },
      {
        firstName: 'James',
        lastName: 'Baker',
        title: 'Marketing Coordinator',
        departmentId: departments[1]._id,
        email: 'james.baker@example.com',
        countryCode: '49',
        phoneNumber: '5553458769',
        isActive: true,
        hireDate: '2022-06-12',
      },
      {
        firstName: 'Charlotte',
        lastName: 'Gonzalez',
        title: 'Senior Marketing Strategist',
        departmentId: departments[1]._id,
        email: 'charlotte.gonzalez@example.com',
        countryCode: '34',
        phoneNumber: '5554569870',
        isActive: true,
        hireDate: '2019-04-08',
      },
      {
        firstName: 'Emma',
        lastName: 'Martinez',
        title: 'Marketing Specialist',
        departmentId: departments[1]._id,
        email: 'emma.martinez@example.com',
        countryCode: '1',
        phoneNumber: '5555670981',
        isActive: true,
        hireDate: '2021-11-30',
      },
      {
        firstName: 'Noah',
        lastName: 'Taylor',
        title: 'Marketing Analyst',
        departmentId: departments[1]._id,
        email: 'noah.taylor@example.com',
        countryCode: '1',
        phoneNumber: '5556781092',
        isActive: true,
        hireDate: '2020-07-16',
      },
      {
        firstName: 'Mia',
        lastName: 'Davis',
        title: 'Marketing Assistant',
        departmentId: departments[1]._id,
        email: 'mia.davis@example.com',
        countryCode: '49',
        phoneNumber: '5557892103',
        isActive: true,
        hireDate: '2019-09-01',
      },
      {
        firstName: 'Lucas',
        lastName: 'Clark',
        title: 'Junior Marketing Coordinator',
        departmentId: departments[1]._id,
        email: 'lucas.clark@example.com',
        countryCode: '1',
        phoneNumber: '5558903214',
        isActive: true,
        hireDate: '2021-10-05',
      },
      {
        firstName: 'Harper',
        lastName: 'Allen',
        title: 'Digital Marketing Specialist',
        departmentId: departments[1]._id,
        email: 'harper.allen@example.com',
        countryCode: '34',
        phoneNumber: '5559014325',
        isActive: true,
        hireDate: '2022-01-18',
      },
      {
        firstName: 'Emma',
        lastName: 'Williams',
        title: 'Software Engineer',
        departmentId: departments[2]._id,
        email: 'emma.williams@example.com',
        countryCode: '1',
        phoneNumber: '5551231234',
        isActive: true,
        hireDate: '2021-03-10',
      },
      {
        firstName: 'Oliver',
        lastName: 'Miller',
        title: 'Senior Software Engineer',
        departmentId: departments[2]._id,
        email: 'oliver.miller@example.com',
        countryCode: '1',
        phoneNumber: '5552342345',
        isActive: true,
        hireDate: '2020-06-15',
      },
      {
        firstName: 'Liam',
        lastName: 'Wilson',
        title: 'Engineering Lead',
        departmentId: departments[2]._id,
        email: 'liam.wilson@example.com',
        countryCode: '1',
        phoneNumber: '5553453456',
        isActive: true,
        hireDate: '2019-12-01',
      },
      {
        firstName: 'Sophia',
        lastName: 'Nguyen',
        title: 'Junior Software Engineer',
        departmentId: departments[2]._id,
        email: 'sophia.nguyen@example.com',
        countryCode: '61',
        phoneNumber: '5554564567',
        isActive: true,
        hireDate: '2022-02-10',
      },
      {
        firstName: 'Mason',
        lastName: 'Santos',
        title: 'Software Engineer',
        departmentId: departments[2]._id,
        email: 'mason.santos@example.com',
        countryCode: '1',
        phoneNumber: '5555675678',
        isActive: true,
        hireDate: '2021-07-15',
      },
      {
        firstName: 'Isabella',
        lastName: 'Klein',
        title: 'Frontend Developer',
        departmentId: departments[2]._id,
        email: 'isabella.klein@example.com',
        countryCode: '49',
        phoneNumber: '5556786789',
        isActive: true,
        hireDate: '2020-09-20',
      },
      {
        firstName: 'Elijah',
        lastName: 'Schneider',
        title: 'Backend Developer',
        departmentId: departments[2]._id,
        email: 'elijah.schneider@example.com',
        countryCode: '49',
        phoneNumber: '5557897890',
        isActive: true,
        hireDate: '2021-11-05',
      },
      {
        firstName: 'Ava',
        lastName: 'Jackson',
        title: 'Software Engineer',
        departmentId: departments[2]._id,
        email: 'ava.jackson@example.com',
        countryCode: '1',
        phoneNumber: '5558908901',
        isActive: true,
        hireDate: '2019-03-25',
      },
      {
        firstName: 'James',
        lastName: 'Garcia',
        title: 'DevOps Engineer',
        departmentId: departments[2]._id,
        email: 'james.garcia@example.com',
        countryCode: '1',
        phoneNumber: '5559019012',
        isActive: true,
        hireDate: '2022-01-15',
      },
      {
        firstName: 'Ethan',
        lastName: 'Santos',
        title: 'QA Engineer',
        departmentId: departments[2]._id,
        email: 'ethan.santos@example.com',
        countryCode: '55',
        phoneNumber: '5555678765',
        isActive: true,
        hireDate: '2021-10-01',
      },
      {
        firstName: 'Lucas',
        lastName: 'Harris',
        title: 'HR Manager',
        departmentId: departments[3]._id,
        email: 'lucas.harris@example.com',
        countryCode: '1',
        phoneNumber: '5551234321',
        isActive: true,
        hireDate: '2021-02-01',
      },
      {
        firstName: 'Mia',
        lastName: 'Lopez',
        title: 'HR Specialist',
        departmentId: departments[3]._id,
        email: 'mia.lopez@example.com',
        countryCode: '1',
        phoneNumber: '5552345432',
        isActive: true,
        hireDate: '2020-04-05',
      },
      {
        firstName: 'Benjamin',
        lastName: 'Rodriguez',
        title: 'HR Coordinator',
        departmentId: departments[3]._id,
        email: 'benjamin.rodriguez@example.com',
        countryCode: '1',
        phoneNumber: '5553456543',
        isActive: true,
        hireDate: '2022-03-15',
      },
      {
        firstName: 'Harper',
        lastName: 'Weber',
        title: 'Senior HR Manager',
        departmentId: departments[3]._id,
        email: 'harper.weber@example.com',
        countryCode: '49',
        phoneNumber: '5554567654',
        isActive: true,
        hireDate: '2019-09-25',
      },
      {
        firstName: 'Zoe',
        lastName: 'Martin',
        title: 'HR Assistant',
        departmentId: departments[3]._id,
        email: 'zoe.martin@example.com',
        countryCode: '1',
        phoneNumber: '5556789876',
        isActive: true,
        hireDate: '2020-11-18',
      },
    ];

    const employees = [];

    for (let i = 0; i < employeeData.length; i++) {
      const existingEmployee = await Employee.findOne({
        email: employeeData[i].email,
      });

      if (!existingEmployee) {
        const newEmployee = await Employee.create(employeeData[i]);

        employees.push(newEmployee);
        console.log(
          `Employee with email '${newEmployee.email}' added`,
        );
      } else {
        console.log(
          `Employee with email '${existingEmployee.email}' already exists`,
        );
      }
    }

    console.log(
      `${departments.length} total departments added to MongoDB (4 expected)`,
    );
    console.log(
      `${employees.length} total employees added to MongoDB (30 expected)`,
    );
  } catch (error) {
    console.error('Error seeding database:', error.message);
    if (error.stack) console.error(error.stack);
  } finally {
    disconnectFromDatabase();
  }
};

seedDatabase();
