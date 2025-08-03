import { EmployeeStatus } from '@/constants/TableConstants';

/**
 * @typedef {Object} Employee
 * @property {string} id
 * @property {string} name
 * @property {string} position
 * @property {string} office
 * @property {number} age
 * @property {{type: string, code: string}} vehicle
 * @property {string} status  // should be one of the values from EmployeeStatus
 * @property {string} level
 * @property {string} doj
 */

/**
 * Helper to create an employee object.
 * @param {Employee} data
 * @returns {Employee}
 */
export function createEmployee(data) {
  return {
    id: data.id,
    name: data.name,
    position: data.position,
    office: data.office,
    age: data.age,
    vehicle: data.vehicle,
    status: data.status,
    level: data.level,
    doj: data.doj,
  };
}
