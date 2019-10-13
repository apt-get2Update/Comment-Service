const FormData = require("form-data");

export default class FormDataBuilder {
    static build(data: any) {
        const formData = new FormData();
        Object.keys(data).map(key => formData.append(key, data[key]));
        return formData;
    }
}