/* Question 3 */

import { reduce } from "ramda";

export type Result<T> = Ok<T> | Failure<T>;

interface Ok<T>{
    tag: "Ok";
    value: T
}

interface Failure<T>{
    tag: "Failure";
    message: string
}

export const makeOk: <T>(val: T) => Ok<T> = 
                        <T>(val: T): Ok<T> => ({tag: "Ok", value : val});
export const makeFailure: <T>(msg: string) => Failure<T> = 
                            <T>(msg: string): Failure<T> => ({tag: "Failure", message : msg});

export const isOk: <T>(res: Result<T>) => res is Ok<T> = 
                        <T>(res: Result<T>): res is Ok<T> => res.tag === "Ok";

export const isFailure: <T>(res: Result<T>) => res is Failure<T> = 
                        <T>(res: Result<T>): res is Failure<T> => res.tag === "Failure";

/* Question 4 */
export const bind: <T, U>(res: Result<T>, f: (x: T) => Result<U>) => Result<U> = 
                    <T, U>(res: Result<T>, f: (x: T) => Result<U>): Result<U> =>{
                        if (isOk(res)){
                            return f(res.value);
                        }
                        return makeFailure(res.message);
                    }

/* Question 5 */
interface User {
    name: string;
    email: string;
    handle: string;
}

const validateName = (user: User): Result<User> =>
    user.name.length === 0 ? makeFailure("Name cannot be empty") :
    user.name === "Bananas" ? makeFailure("Bananas is not a name") :
    makeOk(user);

const validateEmail = (user: User): Result<User> =>
    user.email.length === 0 ? makeFailure("Email cannot be empty") :
    user.email.endsWith("bananas.com") ? makeFailure("Domain bananas.com is not allowed") :
    makeOk(user);

const validateHandle = (user: User): Result<User> =>
    user.handle.length === 0 ? makeFailure("Handle cannot be empty") :
    user.handle.startsWith("@") ? makeFailure("This isn't Twitter") :
    makeOk(user);

export const naiveValidateUser: (user: User) => Result<User> = 
    (user: User): Result<User> => {
        if(isOk(validateName(user))){
            if(isOk(validateEmail(user))){
                return validateHandle(user);
            }
            return validateEmail(user);
        }
        return validateName(user);
    }

export const monadicValidateUser: (user: User) => Result<User> =
    (user: User): Result<User> => {
        return reduce(bind, validateName(user), [validateEmail, validateHandle]);
    }   