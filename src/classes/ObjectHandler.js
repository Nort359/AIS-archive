/**
 * Created by Nort359@gmail.com on 24.05.2017.
 */
export default class ObjectHandler {
    static getArrayFromObject(object) {
        let array = [];
        for(let property in object) {
            if (object.hasOwnProperty(property)) {
                array.push(object[property]);
            }
        }

        return array;
    }
}
