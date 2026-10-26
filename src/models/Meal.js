import Plate from "./Plate.js";

// A plate that also comes with a drink and fries or salad.

export default class Meal extends Plate {
    constructor(details){
        super(details)
    }
    getIncludes() {
        return [...super.getIncludes(), 'A drink of your choice', 'Fries or salad']
    }
}    
