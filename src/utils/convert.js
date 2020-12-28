export class Convert {
    /**
     * Convert an object to url parameter as string.
     * not support nested level of object.
     * @param object
     * @return {string}
     */
    static objectToParams(object) {
        let params = "";
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                if (params !== "") {
                    params += "&";
                }
                let value;
                if (typeof object[key] === 'object') {
                    value = object[key].join('|')
                } else {
                    value = object[key]
                }
                params += key + "=" + value;
            }
        }
        if (params) {
            params = `?` + params;
        }
        return params;
    }
}