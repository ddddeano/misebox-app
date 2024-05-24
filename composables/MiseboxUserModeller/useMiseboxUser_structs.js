// useMiseboxUserManager_Structs.js

export class UserRole {
  constructor(role) {
    this.role = role; // Assuming role is passed as an object with necessary properties
  }

  static fromData(data) {
    const roleDoc = data.role; // Simulate finding role by document string
    if (!roleDoc) return null;
    return new UserRole({ doc: roleDoc });
  }

  toFirestore() {
    return { role: this.role.doc };
  }
}

export class FullName {
  constructor(first = '', middle = '', last = '') {
    this.first = first;
    this.middle = middle;
    this.last = last;
  }

  static fromDictionary(data) {
    return new FullName(data.first || '', data.middle || '', data.last || '');
  }

  toFirestore() {
    return { first: this.first, middle: this.middle, last: this.last };
  }

  get formattedCard() {
    return [this.first, this.middle, this.last].filter(Boolean).join(' ');
  }

  get isIncomplete() {
    return !this.first || !this.last;
  }

  get formatted() {
    return this.formattedCard;
  }

  get firstAndLast() {
    return [this.first, this.last].filter(Boolean).join(' ');
  }
}

export class Subscription {
  constructor(type = 'basic', startDate = new Date(), endDate = new Date()) {
    this.type = type;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  static fromDictionary(data) {
    if (!data.type || !data.start_date || !data.end_date) return null;
    return new Subscription(data.type, new Date(data.start_date), new Date(data.end_date));
  }

  toFirestore() {
    return {
      type: this.type,
      start_date: this.startDate,
      end_date: this.endDate
    };
  }
}
