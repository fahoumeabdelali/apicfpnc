class MainError extends Error{

    constructor(errorMessage, errorType=''){
        super()
       
        this.name = this.constructor.name
        this.message = errorMessage
        this.statusCode = errorType

        switch(this.constructor.name){
            case 'AuthenticationError':
                // errorType == 0 ? this.statusCode = 400 : (errorType == 1 ? this.statusCode = 404 : this.statusCode = 409)
                this.statusCode = errorType
                break
            case 'UserError':
                errorType == 0 ? this.statusCode = 404 : this.statusCode = 409
                break
            case 'CustomerError':
                errorType == 0 ? this.statusCode = 404 : this.statusCode = 409
                break
            case 'CondidatError':
                errorType == 0 ? this.statusCode = 404 : this.statusCode = 409
                break
            case 'RequestError':
                this.statusCode = 400
                break
            default:
                console.log('No handler for that')
        }

    }
}

class AuthenticationError extends MainError{}
class UserError extends MainError{}
class CategoryError extends MainError{}
class CustomerError extends MainError{}
class CondidatError extends MainError{}
class EmployeeTerritoriesError extends MainError{}
class OrderError extends MainError{}
class OrderDetailsError extends MainError{}
class RequestError extends MainError{}

module.exports = { 
    MainError, 
    AuthenticationError, 
    UserError, 
    CategoryError, 
    CustomerError,
    CondidatError,
    EmployeeTerritoriesError,
    OrderError,
    OrderDetailsError,
    RequestError
}
