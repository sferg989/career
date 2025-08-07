// Welcome!

// For this coding challenge, we will be modifying an existing system to fulfill new requirements.

// We have a system for tracking annual Girl Scout cookie orders. Orders can be added, updated, or canceled.

// An order has a cookie count and a scoutId, and both properties can be updated.

// Our system currently has:

// An orders db, represented as an array
// 3 service methods that manipulate the array of orders
// addOrder
// updateOrder
// deleteOrderById
// You are allowed to modify any of the existing data structures, data shapes, and functions. You are also allowed to create any new data structures, shapes, and functions.
/**
* CHALLENGE
*
* Return the number of cookies of a specific order on
* a particular date.
*
* Return null if order does not exist at the time,
* or has been removed by this date.
*
* For example, given the following test data:
*
* const testOrder = addOrder({ scoutId: scoutA, cookies: 30 }, new Date("2025-01-10"));
* const orderId = testOrder.id;
* updateOrder({ id: orderId, cookies: 20 }, new Date("2025-01-14"));
* deleteOrderById(orderId, new Date("2025-01-20"));
* 
* We would expect the following outputs from the method:
* 
* Expected output: 30
* getNumCookiesOfOrderOnDate(orderId, new Date("2025-01-10")); 
* 
* Expected output: 30
* getNumCookiesOfOrderOnDate(orderId, new Date("2025-01-12"));
* 
* Expected output: 20
* getNumCookiesOfOrderOnDate(orderId, new Date("2025-01-14"));
* 
* Expected output: null
* getNumCookiesOfOrderOnDate(orderId, new Date("2025-01-21"));
* 
* You can assume 00:00:00 time for all Dates, and use
* .getTime() to easily compare Dates
*
* @param orderId {number}
* @param date {Date} - js Date object
*/
function getNumCookiesOfOrderOnDate(orderId: number, date: Date): number | null {
  // the first step is likely to add a new data structure to track history

  return 0;
}

type OrderAddModel = {
  scoutId: string;
  cookies: number;
}

type Order = OrderAddModel & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// the "live" db of orders, kept as a global array and populated with test data
const orders: Order[] = [
  // example
  // {
  //   id: 100, (primary key, will not change)
  //   scoutId: 'A',
  //   cookies: 2,
  //   createdAt: new Date("2025-01-01T00:00Z"),
  //   updatedAt: new Date("2025-01-01T00:00Z"),
  // },
];

// represents the next id for added orders
let nextOrderId = 1;


function addOrder(order: OrderAddModel, eventDate = new Date()) {
  if (!order.scoutId) {
      throw new Error("Scout missing");
  }

  const orderToAdd = {
      ...order,
      id: nextOrderId,
      createdAt: eventDate,
      updatedAt: eventDate,
  };

  orders.push(orderToAdd);

  nextOrderId++;

  return orderToAdd;
}

// can update # cookies and/or assigned scout
// payload will only include an id and the target values to update
function updateOrder(updatePayload: Partial<Order>, eventDate = new Date()) {
  if (!updatePayload.id) {
      throw new Error("Payload needs id to update");
  }

  const indexToUpdate = orders.findIndex((order) => order.id === updatePayload.id);

  if (indexToUpdate === -1) {
      throw new Error("Order to update not found!");
  }

  // patch the existing order with partial update
  orders[indexToUpdate] = {
      ...orders[indexToUpdate],
      ...updatePayload,
      updatedAt: eventDate,
  };

  return orders[indexToUpdate];
}

function deleteOrderById(id: number, _eventDate = new Date()) {
  const indexToDelete = orders.findIndex((occ) => occ.id === id);

  if (indexToDelete === -1) {
      throw new Error("Order to delete not found!");
  }

  // remove from the list of active orders
  orders.splice(indexToDelete, 1);
}



/**
* CHALLENGE 2
*
* Returns the # of total cookies assigned to a specific scout on a
* specific date.
*
* Aka "Scout A had 15 cookies assigned on 5/5/25"
*
* Assume time is 00:00:00 for all Dates.
*
* Notes:
*
* If an order's scout changes from scout A to scout B on 1/31/25,
* it should count towards B's total on 1/31/25, not A's.
*
* If an order is deleted, its cookie count should count until
* the date of deletion. After deletion, the order does not contribute
* to the total.
*
* @param scoutId {string}
* @param date {Date} - js Date object
*/
function getNumCookiesForScoutOnDate(scoutId: string, date: Date): number {
  return 0;
}



/**
*
* DO NOT EDIT ANY CODE BELOW THIS LINE
*
*/

/**
* Log of order activity. Do not edit this.
*
* Each "Run" will re-run this log on a fresh orders db.
*
* For simplicity, you can assume all events occur on
* unique dates (at most one event per day) and that the
* events are in chronological order.
*/
const scoutA = 'A', scoutB = 'B', scoutC = 'C';
let orderId1: number, orderId2: number, orderId3: number;
(function runActivity() {
  const order1 = addOrder({ scoutId: scoutA, cookies: 30 }, new Date("2025-01-10T00:00Z"));
  updateOrder({ id: order1.id, cookies: 20 }, new Date("2025-01-14T00:00Z"));
  const order2 = addOrder({ scoutId: scoutB, cookies: 40 }, new Date("2025-01-15T00:00Z"));
  updateOrder({ id: order2.id, cookies: 50 }, new Date("2025-01-17T00:00Z"));
  updateOrder({ id: order2.id, scoutId: scoutC }, new Date("2025-01-19T00:00Z"));
  deleteOrderById(order1.id, new Date("2025-01-20T00:00Z"));
  const order3 = addOrder({ scoutId: scoutA, cookies: 20 }, new Date("2025-01-22T00:00Z"));
  updateOrder({ id: order2.id, cookies: 40, scoutId: scoutA }, new Date("2025-01-23T00:00Z"));
  updateOrder({ id: order2.id, cookies: 30 }, new Date("2025-01-24T00:00Z"));
  updateOrder({ id: order3.id, cookies: 10 }, new Date("2025-01-25T00:00Z"));
  updateOrder({ id: order3.id, scoutId: scoutC, cookies: 30 }, new Date("2025-01-29T00:00Z"));
  updateOrder({ id: order3.id, scoutId: scoutA }, new Date("2025-01-30T00:00Z"));

  //  can ignore, storing ids for use in question validation
  orderId1 = order1.id;
  orderId2 = order2.id;
  orderId3 = order3.id;
})();


// validation section, ideally hide
function validateCookieCounts(): void {
  console.log("Cookie count checks");

  let testNum = 1;
  const validate = (id: number, dateString: string, expected: number | null): void => {
      const value = getNumCookiesOfOrderOnDate(id, new Date(`${dateString}T00:00:00Z`));

      if (testNum < 99) {
          console.log(
              `${testNum}) # cookies of order ${id} as of ${dateString}: ${value} || expected: ${expected} ${
                  value === expected ? "pass" : "fail"
              }`
          );
      } else {
          console.log(
              `${testNum}) Hidden test: ${value === expected ? "pass" : "fail"}`
          );
      }
      testNum++;
  };

  validate(orderId1, "2025-01-10", 30);
  validate(orderId1, "2025-01-12", 30);
  validate(orderId1, "2025-01-14", 20);
  validate(orderId1, "2025-01-09", null);
  validate(orderId2, "2025-01-15", 40);
  validate(orderId2, "2025-01-19", 50);
  validate(orderId1, "2025-01-20", null);
  validate(orderId1, "2025-01-21", null);
  validate(orderId2, "2025-01-23", 40);
  validate(orderId3, "2025-01-29", 30);
  validate(500, "2025-01-15", null);

  console.log("\n");
}
validateCookieCounts();



function validateScoutCookieValues(): void {
  console.log("Scout cookie total checks");

  let testNum = 1;
  const validate = (id: string, dateString: string, expected: number): void => {
      const value = getNumCookiesForScoutOnDate(
          id,
          new Date(`${dateString}T00:00:00Z`)
      );

      if (testNum < 999) {
          console.log(
              `${testNum}) Cookies for scout ${id} as of ${dateString}: ${value} || expected: ${expected} ${
                  value === expected ? "pass" : "fail"
              }`
          );
      } else {
          console.log(
              `${testNum}) Hidden test: ${value === expected ? "pass" : "fail"}`
          );
      }
      testNum++;
  };

  validate(scoutA, "2025-01-10", 30);
  validate(scoutA, "2025-01-14", 20);
  validate(scoutA, "2025-01-15", 20);
  validate(scoutA, "2025-01-20", 0);
  validate(scoutA, "2025-01-21", 0);
  validate(scoutA, "2025-01-22", 20);
  validate(scoutA, "2025-01-23", 60);
  validate(scoutA, "2025-01-24", 50);
  validate(scoutA, "2025-01-25", 40);
  validate(scoutA, "2025-01-29", 30);
  validate(scoutC, "2025-01-29", 30);
  validate(scoutA, "2025-01-30", 60);
  validate(scoutC, "2025-01-30", 0);
}
// validateScoutCookieValues();