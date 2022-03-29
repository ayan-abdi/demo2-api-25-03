// Dans ce fichier on aura ttes les reponse d'une collection exple: getAll ou d'un objet exple: getOne

class SuccesObjectResponse {

    constructor(result, status = 200) {
        this.result = result;
        this.status = status;
    }
};

class SuccesArrayResponse {

    constructor(results, count, status = 200) {
        this.results = results; 
        this.count = count; 
        this.status = status; 
    }
}

module.exports = {
    SuccesObjectResponse,
    SuccesArrayResponse
};