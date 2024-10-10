import { ExampleType } from '@src/models/Example';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';


// **** Functions **** //

/**
 * Get one example.
 */
async function getOne(email: string): Promise<ExampleType | null> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all users.
 */
async function getAll(): Promise<ExampleType[]> {
  const db = await orm.openDb();
  return db.users;
}

/**
 * Add one user.
 */
async function add(example: ExampleType): Promise<void> {
  const db = await orm.openDb();
  example.id = getRandomInt();
  db.examples.push(example);
  return orm.saveDb(db);
}

/**
 * Update a user.
 */
async function update(example: ExampleType): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.examples[i].id === example.id) {
      const dbExample = db.examples[i];
      db.examples[i] = {
        ...dbExample,
        name: example.name,
        id: example.id,
      };
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one user.
 */
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.examples.length; i++) {
    if (db.examples[i].id === id) {
      db.examples.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}


// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
