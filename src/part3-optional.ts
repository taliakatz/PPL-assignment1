/* Question 1 */

export type Optional<T> = Some<T> | None<T>

interface None<T>{
    tag: "None";
}

interface Some<T>{
    tag: "Some";
    value: T
}


export const makeSome: <T>(x : T) => Optional<T> = 
                        <T>(x : T) : Optional<T> => ({tag: "Some", value: x});

export const makeNone: <T>() => Optional<T> =
                        <T>() : Optional<T> =>({tag: "None"});


export const isSome: <T>(x : Optional<T>)=> x is Some<T> =
                        <T>(x : Optional<T>): x is Some<T> => {
                            return x.tag === "Some";
                        }

export const isNone: <T>(x : Optional<T>) => x is None<T>= 
                        <T>(x : Optional<T>): x is None<T> => {
                            return x.tag === "None";
                        }


/* Question 2 */
export const bind: <T, U>(opt: Optional<T>, f: (x: T) => Optional<U>) => Optional<U> = 
                        <T, U>(opt: Optional<T>, f: (x: T) => Optional<U>): Optional<U> =>{ 
                            if (isSome(opt)){
                                return f(opt.value);
                            }
                            return makeNone();
                        }