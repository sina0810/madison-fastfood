// One dish or drink on the menu, e.g. "Fries" or "Coca-Cola".
// This is the base class: later, Plate and Meal will build on top of it.

export default class MenuItem {
  // Private fields: only code inside this class can read or change them.
  #price
  #includes

  constructor({ name, description = '', price, includes = [] }) {
    // Refuse to create a broken item (no name, or a missing/zero price).
    if (!name) {
      throw new Error('A menu item needs a name.')
    }
    if (typeof price !== 'number' || price <= 0) {
      throw new Error(`"${name}" needs a price above 0.`)
    }

    this.name = name
    this.description = description
    this.#price = price
    this.#includes = includes
  }

  // Read-only: other code can see the price, but cannot change it.
  get price() {
    return this.#price
  }

  // The price as customers see it, e.g. 13.99 -> "$13.99".
  formattedPrice() {
    return `$${this.#price.toFixed(2)}`
  }

  // What comes with this item. Returns a copy, so nobody can edit the original list.
  getIncludes() {
    return [...this.#includes]
  }
}
