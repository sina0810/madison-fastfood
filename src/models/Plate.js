import MenuItem from './MenuItem.js'

// A rice or salad dish, e.g. "Chicken over Rice" (without a drink or side).
export default class Plate extends MenuItem {
    constructor(details) {
        super(details)
    }
}